const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const toggleLike = async (req, res) => {
  try {
    const { articleId } = req.body;
    const userId = req.user.id;

    const existingLike = await prisma.like.findFirst({
      where: {
        articleId,
        userId
      }
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
      res.json({ message: 'Article unliked successfully' });
    } else {
      await prisma.like.create({
        data: {
          articleId,
          userId
        }
      });
      res.json({ message: 'Article liked successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserLikes = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user.id;
    const skip = (page - 1) * limit;

    const [likes, total] = await Promise.all([
      prisma.like.findMany({
        where: { userId },
        skip,
        take: Number(limit),
        include: {
          article: {
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
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.like.count({
        where: { userId }
      })
    ]);

    res.json({
      likes,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  toggleLike,
  getUserLikes
};