# API Documentation

## Overview

This document describes the RESTful API endpoints for the Digital Design Composition platform.

## Base URL

- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

## Authentication

Currently using stub authentication with demo user ID. Authentication will be added in a future update.

## Common Response Format

All API responses follow this structure:

```json
{
  "success": boolean,
  "data": any,
  "error": string (optional),
  "message": string (optional)
}
```

## Content Endpoints

### Courses

#### Get All Courses

```
GET /api/courses
```

Response:

```json
{
  "success": true,
  "data": [...]
}
```

#### Get Course by ID

```
GET /api/courses/:id
```

Parameters:

- `id` (path): Course ID

Response:

```json
{
  "success": true,
  "data": {
    "id": "course-01",
    "title": "观·元素解构",
    "description": "...",
    ...
  }
}
```

### Knowledge Cards

#### Get All Knowledge Cards

```
GET /api/knowledge
```

Query Parameters:

- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 20, max: 100)
- `category` (optional): Filter by category
- `difficulty` (optional): Filter by difficulty (base|advance|stretch)
- `tags` (optional): Comma-separated tags
- `search` (optional): Search in title and description

Response:

```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 5,
    "page": 1,
    "pageSize": 20,
    "totalPages": 1
  }
}
```

#### Get Knowledge Card by ID

```
GET /api/knowledge/:id
```

### Cases

#### Get All Cases

```
GET /api/cases
```

Supports same query parameters as Knowledge Cards.

#### Get Case by ID

```
GET /api/cases/:id
```

### Prompts

#### Get All Prompts

```
GET /api/prompts
```

Supports pagination and filtering like Knowledge Cards.

#### Get Prompt by ID

```
GET /api/prompts/:id
```

#### Get Prompt Recommendations

```
GET /api/prompts/recommendations
```

Query Parameters:

- `courseSection` (optional): Filter by course section (e.g., "course-01-theory")
- `courseId` (optional): Filter by course ID
- `difficulty` (optional): Filter by difficulty
- `limit` (optional): Max results (default: 10, max: 50)

Response:

```json
{
  "success": true,
  "data": {
    "prompts": [...],
    "reason": "Recommendations based on course section: course-01-theory",
    "relatedCourseSection": "course-01-theory"
  }
}
```

### Workflows

#### Get All Workflows

```
GET /api/workflows
```

Supports pagination and filtering.

#### Get Workflow by ID

```
GET /api/workflows/:id
```

### Resources

#### Get All Resources

```
GET /api/resources
```

Additional Query Parameters:

- `type` (optional): Filter by type (tool|article|video|book|website|course)
- `isPremium` (optional): Filter by premium status (true|false)

#### Get Resource by ID

```
GET /api/resources/:id
```

### Assignments

#### Get All Assignments

```
GET /api/assignments
```

#### Get Assignment by ID

```
GET /api/assignments/:id
```

#### Get Assignment Submissions

```
GET /api/assignments/:id/submissions
```

#### Submit Assignment

```
POST /api/assignments/:id/submit
```

Content-Type: `multipart/form-data`

Form Fields:

- `userId` (optional): User ID (defaults to "demo-user")
- `status`: "draft" or "submitted"
- `fields`: JSON string of field values
- `files`: File uploads (up to 10 files, 10MB each)

Example:

```javascript
const formData = new FormData();
formData.append("userId", "user-123");
formData.append("status", "submitted");
formData.append(
  "fields",
  JSON.stringify([{ requirementId: "req-01", value: "My answer" }])
);
formData.append("files", file1);
formData.append("files", file2);
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "submission-id",
    "assignmentId": "assignment-01",
    "userId": "user-123",
    "status": "submitted",
    "fields": [...],
    "files": [...],
    "createdAt": "...",
    "updatedAt": "..."
  },
  "message": "Assignment submitted successfully"
}
```

#### Get Submission by ID

```
GET /api/assignments/submissions/:submissionId
```

#### Update Submission (for grading)

```
PATCH /api/assignments/submissions/:submissionId
```

Body:

```json
{
  "status": "graded",
  "score": 95,
  "feedback": "Excellent work!"
}
```

## User State Endpoints

### User Progress

#### Get User Progress

```
GET /api/users/:userId/progress
```

Returns all course progress for a user.

#### Update User Progress

```
POST /api/users/:userId/progress
```

Body:

```json
{
  "courseId": "course-01",
  "completedSections": ["section-01", "section-02"],
  "currentSection": "section-03",
  "progressPercentage": 50
}
```

### User Favorites

#### Get User Favorites

```
GET /api/users/:userId/favorites
```

#### Add Favorite

```
POST /api/users/:userId/favorites
```

Body:

```json
{
  "itemId": "course-01",
  "itemType": "course"
}
```

Valid `itemType` values: `course`, `knowledge`, `case`, `prompt`, `workflow`, `resource`

#### Remove Favorite

```
DELETE /api/users/:userId/favorites/:itemType/:itemId
```

### User History

#### Get User History

```
GET /api/users/:userId/history
```

Query Parameters:

- `limit` (optional): Max number of items to return

#### Add History Item

```
POST /api/users/:userId/history
```

Body:

```json
{
  "itemId": "course-01",
  "itemType": "course",
  "action": "view",
  "metadata": {}
}
```

Valid `action` values: `view`, `complete`, `favorite`, `submit`

### User Submissions

#### Get User Submissions

```
GET /api/users/:userId/submissions
```

Returns all assignment submissions for a user.

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "error": "Validation error message"
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 429 Too Many Requests

```json
{
  "success": false,
  "error": "Too many requests, please try again later"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "error": "Internal server error"
}
```

## Rate Limiting

- General API endpoints: 100 requests per 15 minutes per IP
- Assignment submissions: 10 submissions per hour per IP

## File Upload Specifications

### Allowed File Types

- Images: JPEG, PNG, GIF, WebP
- Documents: PDF, DOC, DOCX
- Videos: MP4, QuickTime

### Size Limits

- Maximum file size: 10MB per file
- Maximum files per submission: 10

## Storage

User data is persisted in JSON files on disk:

- `server/storage/user-progress.json`
- `server/storage/user-favorites.json`
- `server/storage/user-history.json`
- `server/storage/assignment-submissions.json`

Uploaded files are stored in:

- `server/uploads/`

## Development

### Running Tests

```bash
npm test
```

### Starting the Server

```bash
npm run dev:server
```

The server will start on port 5000 by default.

## Future Enhancements

- [ ] JWT-based authentication
- [ ] WebSocket support for real-time updates
- [ ] Database migration (from JSON to PostgreSQL/MongoDB)
- [ ] CDN integration for file uploads
- [ ] Advanced analytics endpoints
- [ ] Bulk operations support
- [ ] GraphQL API option
