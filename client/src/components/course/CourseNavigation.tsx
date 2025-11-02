import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CourseSection } from "@shared/types/course";

interface CourseNavigationProps {
  sections: CourseSection[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function CourseNavigation({
  sections,
  activeSection,
  onNavigate,
}: CourseNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <>
      <nav
        className={cn(
          "hidden md:block sticky top-4 z-10 transition-all duration-300",
          isScrolled && "top-20"
        )}
      >
        <div className="bg-card/95 backdrop-blur-sm border rounded-lg p-2 shadow-sm">
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      <div className="md:hidden sticky top-4 z-10 mb-6">
        <Select value={activeSection} onValueChange={onNavigate}>
          <SelectTrigger className="bg-card/95 backdrop-blur-sm">
            <SelectValue placeholder="选择章节" />
          </SelectTrigger>
          <SelectContent>
            {sections.map((section) => (
              <SelectItem key={section.id} value={section.id}>
                {section.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
