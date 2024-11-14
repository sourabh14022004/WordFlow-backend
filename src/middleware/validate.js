const { z } = require('zod');

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params
    });
    next();
  } catch (error) {
    res.status(400).json({
      error: 'Validation Error',
      details: error.errors
    });
  }
};

const schemas = {
  register: z.object({
    body: z.object({
      username: z.string().min(3).max(30),
      email: z.string().email(),
      password: z.string().min(8)
    })
  }),

  article: z.object({
    body: z.object({
      title: z.string().min(5).max(100),
      content: z.string().min(10),
      tags: z.array(z.string()).optional()
    })
  }),

  comment: z.object({
    body: z.object({
      content: z.string().min(1).max(1000),
      articleId: z.string().uuid()
    })
  }),

  profile: z.object({
    body: z.object({
      username: z.string().min(3).max(30).optional(),
      bio: z.string().max(500).optional(),
      currentPassword: z.string().optional(),
      newPassword: z.string().min(8).optional()
    })
  })
};

module.exports = {
  validate,
  schemas
};