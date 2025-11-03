# Accessibility Guidelines

This document outlines the accessibility standards and best practices followed in the Digital Design Composition project.

## Standards

We aim for **WCAG 2.1 Level AA** compliance across all pages and components.

## Key Features

### 1. Semantic HTML
- Use appropriate HTML5 landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`
- Use headings (`<h1>` to `<h6>`) in logical order without skipping levels
- Use lists (`<ul>`, `<ol>`) for grouped content
- Use buttons for actions, links for navigation

### 2. ARIA Roles and Labels
- `role="banner"` on site header
- `role="contentinfo"` on footer
- `role="navigation"` on navigation menus
- `role="main"` on main content area
- `role="status"` for loading states
- `role="alert"` for error messages
- `aria-label` or `aria-labelledby` for complex components
- `aria-current="page"` for active navigation items
- `aria-live` regions for dynamic content updates

### 3. Keyboard Navigation
- All interactive elements are keyboard accessible
- Logical tab order follows visual layout
- Focus indicators are clearly visible (3px solid outline)
- Skip link to main content at page top
- Escape key closes modals/dialogs
- Arrow keys navigate within components (where appropriate)

### 4. Focus Management
- Custom focus indicators using `outline: 3px solid #38bdf8`
- Focus is trapped within modal dialogs
- Focus returns to trigger element when modal closes
- Skip link is keyboard-accessible but visually hidden until focused

### 5. Screen Reader Support
- Meaningful alt text for all images
- `.sr-only` class for visually hidden but screen-reader-accessible text
- Proper labeling of form controls
- Status messages announced via `aria-live`
- Loading states announced

### 6. Color and Contrast
- Text contrast ratio ≥4.5:1 for normal text
- Text contrast ratio ≥3:1 for large text (18pt+ or 14pt+ bold)
- Do not rely on color alone to convey information
- Focus indicators have ≥3:1 contrast with background

### 7. Responsive and Flexible
- Text can be resized up to 200% without loss of content or functionality
- Touch targets are at least 44×44 CSS pixels
- Layouts adapt to different screen sizes and orientations

## Automated Testing

### Development (Automatic)

The app runs `@axe-core/react` in development mode, logging accessibility violations to the console:

```bash
pnpm dev
# Open browser DevTools Console to see axe reports
```

### Manual Audits

#### Lighthouse

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun
```

Target scores:
- **Accessibility**: 100
- **Performance**: ≥90
- **Best Practices**: ≥90

#### axe DevTools Extension

Install the [axe DevTools browser extension](https://www.deque.com/axe/devtools/) and run manual scans on each page.

## Manual Testing Checklist

### Keyboard Navigation
- [ ] Tab through all interactive elements in logical order
- [ ] Skip link works (Tab, then Enter)
- [ ] All buttons/links are reachable via keyboard
- [ ] Focus indicators are visible on all elements
- [ ] Modals trap focus and can be dismissed with Escape
- [ ] Dropdowns/menus can be navigated with arrows and closed with Escape

### Screen Reader
- [ ] Test with NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS), TalkBack (Android)
- [ ] Headings announce correctly and create logical outline
- [ ] Landmarks are announced
- [ ] Links have descriptive text
- [ ] Buttons describe their action
- [ ] Form labels are associated with inputs
- [ ] Error messages are announced
- [ ] Loading states are announced

### Visual
- [ ] Text remains readable at 200% zoom
- [ ] Layouts do not break at different screen sizes
- [ ] Focus indicators have sufficient contrast
- [ ] Text has sufficient contrast with background

## Common Patterns

### Skip Link

```tsx
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

### Skeleton Loaders

```tsx
<Skeleton role="status" aria-live="polite" aria-label="Loading content">
  <span className="sr-only">Loading...</span>
</Skeleton>
```

### Navigation Links

```tsx
<Link
  href="/path"
  aria-current={isActive ? "page" : undefined}
>
  Label
</Link>
```

### Loading States

```tsx
<Suspense fallback={<CardSkeleton />}>
  <AsyncComponent />
</Suspense>
```

### Form Labels

```tsx
<label htmlFor="email">
  Email address
  <input id="email" type="email" aria-required="true" />
</label>
```

### Error Alerts

```tsx
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [React Accessibility Docs](https://react.dev/learn/accessibility)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)

## Reporting Issues

If you discover an accessibility issue:

1. Open a GitHub issue with the "accessibility" label
2. Describe the issue (what's broken, which screen reader/browser, steps to reproduce)
3. Provide screenshots or screen recordings if helpful
4. Suggest a fix if you know one

We prioritize accessibility issues and aim to fix them within one sprint.

---

**Last Updated**: 2024-11
