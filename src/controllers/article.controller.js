const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createArticle = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const authorId = req.user.id;

    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId,
        tags: {
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profilePicture: true
          }
        },
        tags: true
      }
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, search } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      published: false,
      ...(tag && {
        tags: {
          some: {
            name: tag
          }
        }
      }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    console.log("Filtering criteria:", where); // Debugging log

    const articles = await prisma.article.findMany({
      where,
      skip,
      take: Number(limit),
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profilePicture: true
          }
        },
        tags: true,
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const total = await prisma.article.count({ where });

    res.json({
      articles,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error("Error in getAllArticles:", error); // Log the error for better debugging
    res.status(500).json({ error: error.message });
  }
};


const getArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await prisma.article.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1
        }
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profilePicture: true
          }
        },
        tags: true,
        comments: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                profilePicture: true
              }
            }
          }
        },
        _count: {
          select: {
            likes: true
          }
        }
      }
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;

    const article = await prisma.article.findUnique({
      where: { id },
      include: { tags: true }
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (article.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title,
        content,
        tags: {
          set: [],
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profilePicture: true
          }
        },
        tags: true
      }
    });

    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await prisma.article.findUnique({
      where: { id }
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (article.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await prisma.article.delete({
      where: { id }
    });

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticle,
  updateArticle,
  deleteArticle
};