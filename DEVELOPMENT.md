# Development Guide

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd digital-design-composition

# Install dependencies
npm install --legacy-peer-deps

# Copy environment file
cp .env.example .env
```

### Development

```bash
# Run both client and server in parallel
npm run dev

# Or run them separately:
npm run dev:client  # Vite dev server on port 3000
npm run dev:server  # Express server on port 5000
```

The client will be available at `http://localhost:3000` and the server API at `http://localhost:5000/api`.

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run check

# Format code
npm run format
```

### Building

```bash
# Build both client and server
npm run build

# Start production server
npm start
```

## Project Structure

```
digital-design-composition/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities and API client
│   │   └── hooks/        # Custom React hooks
│   └── index.html
├── server/                # Express backend
│   ├── routes/           # API routes
│   ├── storage/          # JSON file storage
│   ├── middleware/       # Express middleware
│   ├── utils/            # Utility functions
│   ├── uploads/          # User uploaded files
│   └── __tests__/        # Integration tests
├── shared/                # Shared code between client/server
│   ├── types.ts          # TypeScript types
│   ├── schemas.ts        # Zod validation schemas
│   └── data/             # Static data
└── dist/                  # Build output
```

## Key Technologies

### Frontend

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - Component library
- **Wouter** - Routing
- **React Query** - Data fetching

### Backend

- **Express** - Web server
- **TypeScript** - Type safety
- **Zod** - Schema validation
- **Multer** - File uploads
- **Express Rate Limit** - Rate limiting

### Testing

- **Vitest** - Test runner
- **Supertest** - HTTP assertions

## API Development

### Adding a New Endpoint

1. **Define Types** in `shared/types.ts`:

```typescript
export interface MyNewType {
  id: string;
  name: string;
}
```

2. **Add Data** in `shared/data/mynew.ts`:

```typescript
import type { MyNewType } from "@shared/types";

export const myNewData: MyNewType[] = [{ id: "1", name: "Example" }];
```

3. **Create Router** in `server/routes/mynew.ts`:

```typescript
import { Router } from "express";
import { myNewData } from "@shared/data/mynew";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ success: true, data: myNewData });
});

export default router;
```

4. **Register Router** in `server/index.ts`:

```typescript
import myNewRouter from "./routes/mynew";
app.use("/api/mynew", myNewRouter);
```

5. **Add Tests** in `server/__tests__/api.test.ts`:

```typescript
describe("MyNew API", () => {
  it("should get all items", async () => {
    const response = await request(app).get("/api/mynew");
    expect(response.status).toBe(200);
  });
});
```

6. **Add Client API** in `client/src/lib/api.ts`:

```typescript
export const myNewAPI = {
  getAll: () => fetchAPI<MyNewType[]>("/mynew"),
};
```

## Storage Layer

The server uses JSON files for data persistence. The storage layer provides:

- Async read/write operations
- Write queue to prevent race conditions
- Auto-initialization of storage files

### Adding New Storage

1. **Update Types** in `shared/types.ts`
2. **Add Storage File** path in `server/storage/index.ts`
3. **Create CRUD Operations**:

```typescript
export async function getMyData(): Promise<MyData[]> {
  return readData<MyData>(FILES.mydata);
}

export async function saveMyData(data: MyData): Promise<MyData> {
  const all = await getMyData();
  all.push(data);
  await writeData(FILES.mydata, all);
  return data;
}
```

## Common Tasks

### Adding a New Content Type

Follow the pattern of existing content types (courses, knowledge, cases):

1. Add type definitions
2. Create sample data
3. Create router with filtering/pagination
4. Add tests
5. Add client API methods

### Adding User State Feature

Follow the pattern in `server/routes/users.ts`:

1. Define storage schema
2. Add storage operations
3. Create endpoints (GET/POST/DELETE)
4. Add validation with Zod
5. Add tests

### Adding File Upload Support

Use the multer setup in `server/routes/assignments.ts`:

1. Configure multer storage
2. Add file type validation
3. Handle multipart/form-data
4. Store file metadata
5. Add cleanup logic

## Debugging

### Client Debugging

- Use React DevTools browser extension
- Check browser console for errors
- Use network tab to inspect API calls

### Server Debugging

- Check terminal output for request logs
- Errors are logged to console
- Use `console.log()` or debugger breakpoints

### Storage Debugging

- Storage files are in `server/storage/`
- View/edit JSON files directly
- Delete files to reset state

## Code Style

- Use TypeScript strict mode
- Follow existing patterns and conventions
- Use meaningful variable names
- Add JSDoc comments for complex functions
- Keep functions small and focused
- Avoid unnecessary comments

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "Add my feature"

# Push changes
git push origin feature/my-feature

# Create pull request
```

## Environment Variables

### Client (VITE\_\*)

- `VITE_API_URL` - API base URL (default: http://localhost:5000/api)

### Server

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development|production)
- `DEMO_USER_ID` - Demo user ID for stub auth

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm run dev:server
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Type Errors

```bash
# Run type check to see all errors
npm run check

# Check specific file
npx tsc --noEmit path/to/file.ts
```

### Test Failures

```bash
# Run specific test file
npm test server/__tests__/api.test.ts

# Run tests in watch mode for debugging
npm run test:watch
```

## Performance Tips

### Development

- Use `npm run dev:client` for frontend-only work
- Use `npm run dev:server` for backend-only work
- Clear browser cache if seeing stale data

### Production

- Build optimization is handled by Vite and esbuild
- Serve static files with nginx in production
- Use CDN for uploaded files
- Add caching headers

## Additional Resources

- [Server API Documentation](./server/API.md)
- [Server Implementation Guide](./server/README.md)
- [Vite Documentation](https://vitejs.dev/)
- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)

## Getting Help

- Check existing issues on GitHub
- Review test files for usage examples
- Read API documentation
- Inspect network requests in browser DevTools
