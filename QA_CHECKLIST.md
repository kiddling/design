# QA Checklist

This document contains testing checklists for quality assurance before production deployment.

## Pre-Deployment Checklist

### Build & CI
- [ ] All CI tests pass (GitHub Actions)
- [ ] Type checking passes (`pnpm check`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Code formatting is consistent (`pnpm format:check`)
- [ ] Test suite passes (`pnpm test`)
- [ ] Code coverage ≥80% for statements/lines/functions
- [ ] Production build succeeds (`pnpm build`)
- [ ] Bundle size is acceptable (check with bundle analyzer)
- [ ] No console errors or warnings in production build

### Performance
- [ ] Lighthouse Performance score ≥90 (desktop)
- [ ] Lighthouse Performance score ≥90 (mobile)
- [ ] Core Web Vitals within thresholds:
  - [ ] LCP (Largest Contentful Paint) < 2.5s
  - [ ] FID (First Input Delay) < 100ms or INP < 200ms
  - [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Time to First Byte (TTFB) < 600ms
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Bundle sizes reviewed and optimized
- [ ] Images are properly optimized (WebP, correct dimensions)
- [ ] Lazy loading implemented for images and routes
- [ ] No unnecessary re-renders (React DevTools Profiler)

### Accessibility
- [ ] Lighthouse Accessibility score = 100
- [ ] axe DevTools reports 0 critical issues
- [ ] Skip link works (Tab → Enter)
- [ ] All interactive elements reachable via keyboard
- [ ] Focus indicators visible on all focusable elements
- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] All images have meaningful alt text
- [ ] Form inputs have associated labels
- [ ] ARIA attributes used correctly
- [ ] Color contrast meets WCAG AA (4.5:1 normal, 3:1 large text)
- [ ] Screen reader testing (NVDA/JAWS/VoiceOver) passes
- [ ] Keyboard navigation works for all components
- [ ] No keyboard traps

### Responsive Design
- [ ] Mobile (320px-768px) layout works
- [ ] Tablet (768px-1024px) layout works
- [ ] Desktop (1024px+) layout works
- [ ] Text remains readable at 200% zoom
- [ ] No horizontal scrolling on mobile
- [ ] Touch targets are ≥44×44 CSS pixels
- [ ] Navigation is usable on all screen sizes

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS 15+)
- [ ] Chrome Mobile (Android)

### Functional Testing

#### Navigation
- [ ] All navigation links work
- [ ] Active page indicator shows correctly
- [ ] Browser back/forward buttons work
- [ ] Deep linking works (direct URL access)
- [ ] 404 page displays for unknown routes

#### Course Pages
- [ ] Course outline loads correctly
- [ ] Course detail pages display all content
- [ ] Week badges display correctly
- [ ] Images load with lazy loading
- [ ] Course navigation (prev/next) works
- [ ] Hover/focus prefetching works

#### Knowledge Cards
- [ ] Cards display in grid layout
- [ ] Filtering works (if implemented)
- [ ] Card interactions work
- [ ] Content is readable

#### Case Library
- [ ] Cases load and display
- [ ] Filtering by discipline works
- [ ] Difficulty badges display
- [ ] Thumbnails load correctly
- [ ] Modal/detail view works (if implemented)

#### Prompt Studio
- [ ] Prompt editor is editable
- [ ] Template selection works
- [ ] Copy functionality works
- [ ] Generated prompts display correctly

#### Assignments
- [ ] Form validates required fields
- [ ] Submission works (success/error handling)
- [ ] Error messages are clear and accessible
- [ ] Success confirmation displays

### Error Handling
- [ ] Network errors display user-friendly messages
- [ ] Error boundaries catch and display React errors
- [ ] 404 page for unknown routes
- [ ] 500 page for server errors
- [ ] Retry mechanisms work for failed requests
- [ ] Loading states display during async operations
- [ ] No unhandled promise rejections in console

### Security
- [ ] No sensitive data in client-side code
- [ ] Environment variables are properly configured
- [ ] HTTPS enforced in production
- [ ] No XSS vulnerabilities
- [ ] Content Security Policy headers configured
- [ ] No exposed API keys in frontend

### Analytics & Monitoring
- [ ] Web Vitals logging works
- [ ] Page view tracking works
- [ ] Error tracking configured (if using service)
- [ ] Analytics endpoints respond correctly

### Content & Copy
- [ ] No placeholder or lorem ipsum text
- [ ] All content is proofread
- [ ] Images have proper attribution (if needed)
- [ ] No broken links
- [ ] Copyright/license information is correct

## Manual Smoke Test Steps

### 1. Homepage
1. Navigate to `/`
2. Verify hero content displays
3. Click navigation links
4. Test keyboard navigation

### 2. Course Flow
1. Navigate to `/courses`
2. Verify course list loads
3. Hover over a course (check prefetch in DevTools Network tab)
4. Click a course
5. Verify detail page loads
6. Check images load with `loading="lazy"`
7. Navigate to another course using prev/next

### 3. Knowledge Cards
1. Navigate to `/knowledge`
2. Verify cards display
3. Test filtering/search
4. Test card interactions

### 4. Case Library
1. Navigate to `/cases`
2. Verify case grid displays
3. Test filters (discipline, difficulty)
4. Click a case to view details

### 5. Prompt Studio
1. Navigate to `/prompts`
2. Select a template
3. Edit prompt text
4. Copy to clipboard
5. Verify copy confirmation

### 6. Assignments
1. Navigate to `/assignments`
2. Fill out assignment form
3. Submit with invalid data → verify errors
4. Submit with valid data → verify success

### 7. Accessibility
1. Tab through entire site
2. Use Enter/Space to activate elements
3. Test with screen reader (basic flow)
4. Verify skip link works

### 8. Responsive
1. Test at 375px (mobile)
2. Test at 768px (tablet)
3. Test at 1280px (desktop)
4. Test at 200% browser zoom

## Automated Testing

### Unit Tests
```bash
pnpm test
```

Should cover:
- Component rendering
- User interactions
- Data fetching hooks
- Utility functions

### Integration Tests
```bash
pnpm test tests/
```

Should cover:
- API endpoints
- Multi-component flows
- Form submissions

### Coverage
```bash
pnpm test:coverage
```

Target coverage:
- Statements: ≥80%
- Branches: ≥75%
- Functions: ≥80%
- Lines: ≥80%

### E2E Tests (Future)
```bash
# Not yet implemented
npx playwright test
```

Would cover:
- Critical user journeys
- Cross-browser compatibility
- Mobile viewport testing

## Deployment Verification

### Post-Deployment
- [ ] Production site is accessible
- [ ] All pages load correctly
- [ ] No console errors
- [ ] Analytics are being tracked
- [ ] Monitoring dashboards show healthy metrics
- [ ] Database connections work (when implemented)
- [ ] API endpoints respond correctly
- [ ] CDN assets load properly
- [ ] SSL certificate is valid
- [ ] DNS records are correct

### Rollback Plan
- [ ] Rollback procedure is documented
- [ ] Previous version is tagged in git
- [ ] Database migrations are reversible (when applicable)
- [ ] CDN cache can be purged if needed

## Known Issues

(Document any known issues that are not blocking but should be tracked)

---

**Last Updated**: 2024-11  
**Version**: 1.0.0
