import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

const navigationItems = [
  { href: "/assignments", label: "作业管理" },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/assignments" className="text-lg font-semibold tracking-tight text-white">
            数字设计构成 · 学习工作台
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-white",
                  location.startsWith(item.href) && "text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col gap-6 px-6 py-8">
        {children}
      </main>
    </div>
  );
}
