# Server Implementation

## Overview

This is the Express backend server for the Digital Design Composition platform. It provides RESTful APIs for content delivery and user state management.

## Architecture

```
server/
├── index.ts                 # Main server entry point
├── routes/                  # API route handlers
│   ├── courses.ts          # Course endpoints
│   ├── knowledge.ts        # Knowledge card endpoints
│   ├── cases.ts            # Case study endpoints
│   ├── prompts.ts          # AI prompt endpoints
│   ├── workflows.ts        # Workflow endpoints
│   ├── resources.ts        # Resource endpoints
│   ├── assignments.ts      # Assignment & submission endpoints
│   └── users.ts            # User state endpoints
├── storage/                # JSON file-based persistence layer
│   ├── index.ts            # Storage operations
│   ├── user-progress.json  # User progress data
│   ├── user-favorites.json # User favorites data
│   ├── user-history.json   # User history data
│   └── assignment-submissions.json # Submission data
├── middleware/             # Express middleware
│   ├── errorHandler.ts    # Error handling
│   ├── logger.ts          # Request logging
│   └── rateLimiter.ts     # Rate limiting
├── utils/                  # Utility functions
│   └── fileUtils.ts       # File handling utilities
├── uploads/                # User uploaded files
└── __tests__/             # Integration tests
    └── api.test.ts        # API endpoint tests
```

## Features

### Content APIs

- **Courses**: Course metadata and content
- **Knowledge Cards**: Design principles and concepts
- **Cases**: Case studies and examples
- **Prompts**: AI prompt templates with variables
- **Workflows**: Step-by-step process guides
- **Resources**: External resources and tools
- **Assignments**: Assignment requirements and rubrics

### User State Management

- **Progress Tracking**: Track course progress per user
- **Favorites**: Save favorite items
- **History**: Track user activity
- **Submissions**: Handle assignment submissions with file uploads

### Data Features

- Pagination support for all list endpoints
- Filtering by category, difficulty, tags
- Full-text search
- Context-aware recommendations
- Relationship metadata (related courses, knowledge, cases)

### Technical Features

- JSON file-based persistence with async write queues
- File upload support with multer (10MB limit, 10 files max)
- Rate limiting (100 requests/15min for API, 10 submissions/hour)
- CORS support for Vite dev server
- Request logging
- Error handling and validation
- Type-safe with TypeScript and Zod schemas

## Storage Layer

The storage layer uses JSON files for simplicity and portability. It includes:

- **Async Write Queues**: Prevents race conditions on concurrent writes
- **Auto-initialization**: Creates storage files if they don't exist
- **Type-safe Operations**: All operations are typed with shared interfaces

### Storage Files

1. `user-progress.json`: User course progress
2. `user-favorites.json`: User favorite items
3. `user-history.json`: User activity history
4. `assignment-submissions.json`: Assignment submissions and metadata

### File Uploads

Uploaded files are stored in `server/uploads/` with:

- Unique filenames using nanoid
- Metadata stored in submissions
- 10MB per file limit
- Supported types: images, PDFs, documents, videos

## API Endpoints

See [API.md](./API.md) for complete API documentation.

### Quick Reference

#### Content

- `GET /api/courses`
- `GET /api/knowledge`
- `GET /api/cases`
- `GET /api/prompts`
- `GET /api/prompts/recommendations`
- `GET /api/workflows`
- `GET /api/resources`
- `GET /api/assignments`

#### User State

- `GET/POST /api/users/:userId/progress`
- `GET/POST/DELETE /api/users/:userId/favorites`
- `GET/POST /api/users/:userId/history`
- `GET /api/users/:userId/submissions`

#### Submissions

- `POST /api/assignments/:id/submit`
- `GET /api/assignments/submissions/:id`
- `PATCH /api/assignments/submissions/:id`

## Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install --legacy-peer-deps

# Set environment variables
cp .env.example .env

# Run in development mode
npm run dev:server

# Or run both client and server
npm run dev
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run check
```

### Building

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Configuration

### Environment Variables

```bash
PORT=5000                    # Server port
NODE_ENV=development         # Environment (development|production)
DEMO_USER_ID=demo-user      # Demo user for stub auth
```

### Rate Limiting

Configured in `server/middleware/rateLimiter.ts`:

- API endpoints: 100 requests per 15 minutes
- Submission endpoints: 10 submissions per hour

### File Upload Limits

Configured in `server/routes/assignments.ts`:

- Max file size: 10MB
- Max files per submission: 10
- Allowed types: images, PDFs, documents, videos

## Testing

Tests are written with Vitest and Supertest. They cover:

- Health check endpoint
- All content API endpoints
- Pagination and filtering
- User state management
- Assignment submissions
- Error handling
- Validation

Run tests with:

```bash
npm test
```

## Middleware

### Request Logger

Logs all requests with method, path, status, and duration.

### Error Handler

- Catches all unhandled errors
- Returns standardized error responses
- Hides error details in production

### Rate Limiter

- Protects against abuse
- Returns 429 status when limit exceeded
- Configurable per route

## Authentication

Currently uses stub authentication with a demo user ID. In production:

1. Implement JWT-based authentication
2. Add authentication middleware
3. Extract user ID from token
4. Add permission checks

## Future Enhancements

### Phase 1: Enhanced Storage

- [ ] Migrate to PostgreSQL or MongoDB
- [ ] Add database migrations
- [ ] Implement connection pooling
- [ ] Add caching with Redis

### Phase 2: File Management

- [ ] Integrate with S3 or CDN
- [ ] Add image processing (thumbnails, optimization)
- [ ] Implement virus scanning
- [ ] Add file cleanup jobs

### Phase 3: Features

- [ ] Real-time updates with WebSocket
- [ ] Advanced search with Elasticsearch
- [ ] Batch operations
- [ ] Export/import functionality
- [ ] Admin dashboard APIs

### Phase 4: Infrastructure

- [ ] Docker containerization
- [ ] Kubernetes deployment
- [ ] Monitoring and alerting
- [ ] Performance optimization
- [ ] Load balancing

## Troubleshooting

### Storage Issues

If storage files become corrupted:

```bash
# Delete storage files (will reset user data)
rm server/storage/*.json

# Restart server to reinitialize
npm run dev:server
```

### File Upload Issues

Common issues:

- File too large: Increase limit in `assignments.ts`
- File type not allowed: Add MIME type to `fileFilter`
- Permission errors: Check `server/uploads/` permissions

### Rate Limiting Issues

If rate limit is too restrictive:

- Adjust limits in `server/middleware/rateLimiter.ts`
- Whitelist specific IPs
- Implement user-based rate limiting

## Performance

Current implementation is suitable for:

- Small to medium user base (< 1000 users)
- Moderate traffic (< 10k requests/day)
- Development and prototyping

For production at scale, consider:

- Database migration
- Caching layer
- CDN for static files
- Horizontal scaling

## Security

Current security measures:

- Input validation with Zod
- File type validation
- Size limits
- Rate limiting
- CORS configuration

Additional security for production:

- HTTPS/TLS
- JWT authentication
- CSRF protection
- SQL injection prevention (when using DB)
- XSS protection
- Helmet.js middleware

## Monitoring

Add monitoring in production:

- Request logging to file or service
- Error tracking (Sentry, Rollbar)
- Performance monitoring (New Relic, DataDog)
- Health check endpoint
- Uptime monitoring

## License

MIT
