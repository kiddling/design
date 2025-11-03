# Vercel Serverless API Routes

This directory contains Vercel serverless functions that provide API endpoints for the Digital Design Composition application.

## Endpoints

### Health Check
- **GET** `/api/health` - System health check and available endpoints

### Courses
- **GET** `/api/courses` - Get all courses
- **GET** `/api/courses?id={courseId}` - Get course by ID

### Knowledge Cards
- **GET** `/api/knowledge` - Get knowledge cards (paginated)
  - Query params: `id`, `category`, `difficulty`, `tags`, `search`, `page`, `pageSize`

### Case Studies
- **GET** `/api/cases` - Get case studies (paginated)
  - Query params: `id`, `category` (discipline), `difficulty`, `tags`, `search`, `page`, `pageSize`

### Prompts
- **GET** `/api/prompts` - Get AI prompt templates (paginated)
  - Query params: `id`, `category`, `difficulty`, `tags`, `search`, `courseSection`, `courseId`, `page`, `pageSize`

### Workflows
- **GET** `/api/workflows` - Get learning workflows (paginated)
  - Query params: `id`, `page`, `pageSize`

### Resources
- **GET** `/api/resources` - Get learning resources (paginated)
  - Query params: `id`, `difficulty`, `type`, `isPremium`, `tags`, `search`, `page`, `pageSize`, `books`
- **GET** `/api/resources?books=true` - Get books specifically

### Assignments
- **GET** `/api/assignments` - Get assignments
  - Query params: `id`, `lessonId`

## Response Format

All endpoints return JSON responses in the following format:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": {
    "items": [ /* array of items */ ],
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "totalPages": 10
  }
}
```

## Local Development

These serverless functions use the Vercel Node.js runtime and can be tested locally using Vercel CLI:

```bash
vercel dev
```

## Deployment

The API routes are automatically deployed to Vercel when pushed to the repository. The `vercel.json` configuration ensures they use the `@vercel/node@3` runtime.

## Data Sources

All data is imported from the `shared/data/` directory:
- Courses: `shared/data/courses.ts`
- Knowledge Cards: `shared/data/knowledge-cards.ts`
- Case Studies: `shared/data/case-studies.ts`
- Prompts: `shared/data/prompts.ts`
- Workflows: `shared/data/workflows.ts`
- Resources: `shared/data/resources.ts`
- Assignments: `shared/data/assignments.ts`

## CORS

All API routes are configured with CORS headers in `vercel.json` to allow cross-origin requests.
