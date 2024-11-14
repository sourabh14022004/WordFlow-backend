# Word Flow API

A powerful backend API for a blogging platform with features like user authentication, article management, comments, and likes.

## Features

- 🔐 Simple Email Authentication
- 📝 Article Management
- 💬 Comments System
- ❤️ Like/Unlike Articles
- 📧 Email Verification
- 🔑 Password Reset
- 👤 User Profiles
- 🏷️ Article Tags

## Tech Stack

- Node.js & Express
- Prisma ORM
- PostgreSQL
- Email Authentication
- Nodemailer
- Zod Validation

## API Endpoints

### Authentication
```
POST /api/v1/auth/register         - Register new user
POST /api/v1/auth/login           - Login user
GET  /api/v1/auth/verify/:token   - Verify email
POST /api/v1/auth/request-reset   - Request password reset
POST /api/v1/auth/reset-password  - Reset password
```

### Users
```
GET  /api/v1/users/profile        - Get user profile
PUT  /api/v1/users/profile        - Update user profile
GET  /api/v1/users/:userId/articles - Get user's articles
```

### Articles
```
POST   /api/v1/articles          - Create article
GET    /api/v1/articles          - Get all articles
GET    /api/v1/articles/:id      - Get single article
PUT    /api/v1/articles/:id      - Update article
DELETE /api/v1/articles/:id      - Delete article
```

### Comments
```
POST   /api/v1/comments          - Create comment
GET    /api/v1/comments/article/:articleId - Get article comments
PUT    /api/v1/comments/:id      - Update comment
DELETE /api/v1/comments/:id      - Delete comment
```

### Likes
```
POST /api/v1/likes/toggle        - Toggle like on article
GET  /api/v1/likes/user          - Get user's liked articles
```

## Authentication

The API uses simple email-based authentication. Include the user's email in the `X-User-Email` header for authenticated requests:

```
X-User-Email: user@example.com
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/wordflow"
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=587
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-specific-password"
   CLIENT_URL="http://localhost:3000"
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error