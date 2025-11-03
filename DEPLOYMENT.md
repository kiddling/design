# Deployment Guide

## Overview

This document provides instructions for deploying the Digital Design Composition platform to Vercel and other hosting providers.

## Vercel Deployment

### Prerequisites

- Vercel account
- GitHub/GitLab repository connected to Vercel
- pnpm package manager

### Configuration

The project is configured for Vercel deployment via `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [...],
  "buildCommand": "pnpm install && pnpm build",
  "framework": "vite",
  "outputDirectory": "dist/client"
}
```

### SPA Routing

The `rewrites` configuration ensures that:

1. All API routes (`/api/*`) are preserved for backend endpoints
2. All other routes are rewritten to `/index.html` to enable client-side routing with Wouter
3. This prevents 404 errors when directly accessing routes like `/courses/pa-01`, `/knowledge`, etc.

### Build Process

The build command executes:

1. `pnpm install` - Installs dependencies
2. `pnpm build` - Runs `vite build` (client) and `esbuild` (server)
   - Client output: `dist/client/`
   - Server output: `dist/index.js`

### Deployment Steps

#### Option 1: Auto Deploy (Recommended)

1. Connect your repository to Vercel
2. Vercel will automatically detect the configuration from `vercel.json`
3. Push to your main/master branch to trigger deployment
4. Vercel will run the build and deploy automatically

#### Option 2: Manual Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

If your application requires environment variables, add them in Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add required variables (e.g., API keys, database URLs)

### Verification Checklist

After deployment, verify the following URLs work correctly:

#### Core Pages

- [ ] **Home**: `https://your-domain.vercel.app/`
- [ ] **Workflow**: `https://your-domain.vercel.app/workflow`
- [ ] **Knowledge**: `https://your-domain.vercel.app/knowledge`
- [ ] **Cases**: `https://your-domain.vercel.app/cases`
- [ ] **AI Tools**: `https://your-domain.vercel.app/ai-tools`
- [ ] **Resources**: `https://your-domain.vercel.app/resources`
- [ ] **Assignments**: `https://your-domain.vercel.app/assignments`

#### Course Pages

- [ ] **Course PA-01**: `https://your-domain.vercel.app/courses/pa-01`
- [ ] **Course PA-02**: `https://your-domain.vercel.app/courses/pa-02`
- [ ] **Course PA-03**: `https://your-domain.vercel.app/courses/pa-03`

#### Route Refresh Test

- [ ] Navigate to any route and **refresh the page** - should not show 404
- [ ] Share a deep link (e.g., `/courses/pa-01`) - should load correctly

#### Assets & Styling

- [ ] CSS loads correctly (Tailwind styles applied)
- [ ] Custom fonts load (Inter, Noto Sans SC)
- [ ] Theme toggle works (dark/light mode)
- [ ] Images and icons display properly

#### Performance

- [ ] Check build logs for successful completion
- [ ] Verify bundle size is reasonable (check Vercel analytics)
- [ ] Test loading speed on various devices/networks

### Common Issues & Solutions

#### Issue: Blank Page After Deployment

**Symptoms**: Build succeeds but the website shows a blank page.

**Solution**:
- Check browser console for errors
- Verify `vercel.json` has proper `rewrites` configuration
- Ensure `outputDirectory` is set to `dist/client`
- Check that `index.html` contains the root div: `<div id="root"></div>`

#### Issue: 404 on Route Refresh

**Symptoms**: Routes work when navigating within the app, but show 404 when refreshing or accessing directly.

**Solution**:
- Verify `rewrites` in `vercel.json` includes the catch-all rule: `{ "source": "/(.*)", "destination": "/index.html" }`
- Ensure API routes are preserved before the catch-all rule

#### Issue: Assets Not Loading

**Symptoms**: CSS/JS files fail to load, resulting in unstyled content.

**Solution**:
- Check `base` path in `vite.config.ts` is set to `"/"`
- Verify asset paths in built `index.html` are correct (should be `/assets/...`)
- Check browser console for 404 errors on asset files

#### Issue: Build Fails

**Symptoms**: Vercel build fails with errors.

**Solution**:
- Check build logs in Vercel dashboard
- Ensure `pnpm-lock.yaml` is committed
- Verify all dependencies are properly declared in `package.json`
- Check TypeScript errors with `npm run check`

#### Issue: API Calls Fail

**Symptoms**: Frontend loads but API calls return errors.

**Solution**:
- Verify API routes are properly configured in backend
- Check CORS settings if backend is on a different domain
- Ensure environment variables are set in Vercel dashboard
- Check API proxy configuration in `vite.config.ts` for development

### Caching Strategy

The deployment uses the following cache headers:

- **HTML files** (`/`): `public, max-age=0, must-revalidate` - Always fetch latest
- **Assets** (`/assets/*`): `public, max-age=31536000, immutable` - Cache for 1 year (immutable)

This ensures users always get the latest HTML while assets are cached efficiently.

### Build Output Structure

```
dist/
├── client/              # Frontend SPA (deployed to Vercel)
│   ├── index.html       # Entry point
│   ├── assets/          # Bundled JS/CSS with hashed names
│   │   ├── index-[hash].js
│   │   └── index-[hash].css
│   └── ...
└── index.js             # Backend server (for self-hosted deployments)
```

### Alternative Hosting Providers

#### Netlify

Create `netlify.toml`:

```toml
[build]
  command = "pnpm install && pnpm build"
  publish = "dist/client"

[[redirects]]
  from = "/api/*"
  to = "/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Self-Hosted (Node.js)

The project includes an Express server for self-hosted deployments:

```bash
# Build
pnpm build

# Start production server
NODE_ENV=production node dist/index.js
```

The Express server at `server/index.ts` already handles SPA routing:

```javascript
app.use(express.static(join(__dirname, "../dist/client")));
app.get("*", (_req, res) => {
  res.sendFile(join(__dirname, "../dist/client/index.html"));
});
```

### Monitoring & Analytics

After deployment, consider enabling:

- Vercel Analytics for performance monitoring
- Error tracking (e.g., Sentry)
- User analytics (respect privacy regulations)

### Rollback Procedure

If issues occur after deployment:

1. Go to Vercel dashboard > Deployments
2. Find the last working deployment
3. Click "..." menu > "Promote to Production"
4. The previous version will be restored immediately

### Continuous Deployment

The project is configured for automatic deployments:

- **Production**: Pushes to `main`/`master` branch
- **Preview**: Pull requests create preview deployments
- **Development**: Feature branches can be deployed for testing

### Security Considerations

- Ensure sensitive environment variables are not committed to git
- Use Vercel's environment variable encryption
- Regularly update dependencies for security patches
- Enable HTTPS (automatic with Vercel)

## Support

For deployment issues:

1. Check Vercel build logs
2. Review browser console errors
3. Test locally with `pnpm build && pnpm preview`
4. Refer to this checklist systematically

## Related Documentation

- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development setup
- [README.md](./README.md) - Project overview
- [server/API.md](./server/API.md) - API documentation
