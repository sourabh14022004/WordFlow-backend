# API Testing Guide

This document provides examples for testing all API endpoints using cURL commands.

## Prerequisites
- Server running at `http://localhost:3000`
- User email (obtained after login)

## Authentication Tests

### Register User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Request Password Reset
```bash
curl -X POST http://localhost:3000/api/v1/auth/request-reset \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

## Article Tests

### Create Article
```bash
curl -X POST http://localhost:3000/api/v1/articles \
  -H "Content-Type: application/json" \
  -H "X-User-Email: test@example.com" \
  -d '{
    "title": "Test Article",
    "content": "This is a test article content",
    "tags": ["test", "api"]
  }'
```

### Get All Articles
```bash
curl http://localhost:3000/api/v1/articles?page=1&limit=10
```

### Get Single Article
```bash
curl http://localhost:3000/api/v1/articles/ARTICLE_ID
```

### Update Article
```bash
curl -X PUT http://localhost:3000/api/v1/articles/ARTICLE_ID \
  -H "Content-Type: application/json" \
  -H "X-User-Email: test@example.com" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content",
    "tags": ["updated", "test"]
  }'
```

### Delete Article
```bash
curl -X DELETE http://localhost:3000/api/v1/articles/ARTICLE_ID \
  -H "X-User-Email: test@example.com"
```

## Comment Tests

### Create Comment
```bash
curl -X POST http://localhost:3000/api/v1/comments \
  -H "Content-Type: application/json" \
  -H "X-User-Email: test@example.com" \
  -d '{
    "articleId": "ARTICLE_ID",
    "content": "This is a test comment"
  }'
```

### Get Article Comments
```bash
curl http://localhost:3000/api/v1/comments/article/ARTICLE_ID?page=1&limit=10
```

### Update Comment
```bash
curl -X PUT http://localhost:3000/api/v1/comments/COMMENT_ID \
  -H "Content-Type: application/json" \
  -H "X-User-Email: test@example.com" \
  -d '{
    "content": "Updated comment content"
  }'
```

### Delete Comment
```bash
curl -X DELETE http://localhost:3000/api/v1/comments/COMMENT_ID \
  -H "X-User-Email: test@example.com"
```

## Like Tests

### Toggle Like
```bash
curl -X POST http://localhost:3000/api/v1/likes/toggle \
  -H "Content-Type: application/json" \
  -H "X-User-Email: test@example.com" \
  -d '{
    "articleId": "ARTICLE_ID"
  }'
```

### Get User Likes
```bash
curl http://localhost:3000/api/v1/likes/user \
  -H "X-User-Email: test@example.com"
```

## User Profile Tests

### Get Profile
```bash
curl http://localhost:3000/api/v1/users/profile \
  -H "X-User-Email: test@example.com"
```

### Update Profile
```bash
curl -X PUT http://localhost:3000/api/v1/users/profile \
  -H "Content-Type: application/json" \
  -H "X-User-Email: test@example.com" \
  -d '{
    "username": "newusername",
    "bio": "Updated bio",
    "currentPassword": "oldpassword",
    "newPassword": "newpassword"
  }'
```

### Get User Articles
```bash
curl http://localhost:3000/api/v1/users/USER_ID/articles?page=1&limit=10
```

## Expected Responses

All successful responses will return:
- 200 OK for successful operations
- 201 Created for successful resource creation

Error responses will include:
```json
{
  "error": "Error message",
  "details": "Additional error details (if any)"
}
```