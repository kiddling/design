import { Link, useRoute } from "wouter";
import { type ReactNode } from "react";

interface NavItemProps {
  href: string;
  children: ReactNode;
  onFocus?: () => void;
  onMouseEnter?: () => void;
}

function NavItem({ href, children, onFocus, onMouseEnter }: NavItemProps) {
  const [isActive] = useRoute(href);

  return (
    <Link
      href={href}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      aria-current={isActive ? "page" : undefined}
      className="nav-item"
    >
      {children}
    </Link>
  );
}

export function Navigation() {
  return (
    <nav aria-label="Primary">
      <NavItem href="/">Home</NavItem>
      <NavItem href="/courses">Curriculum</NavItem>
      <NavItem href="/knowledge">Knowledge Cards</NavItem>
      <NavItem href="/cases">Case Library</NavItem>
      <NavItem href="/prompts">Prompt Studio</NavItem>
      <NavItem href="/assignments">Assignments</NavItem>
    </nav>
  );
}
