import { useEffect, useState, useRef } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Clock,
  Target,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { courseApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RichText } from "@/components/course/RichText";
import { CourseNavigation } from "@/components/course/CourseNavigation";
import type { CourseOverviewSection } from "@shared/types/course";

export default function CoursePage() {
  const [, params] = useRoute("/courses/:id");
  const courseId = params?.id || "";
  const queryClient = useQueryClient();
  
  const [activeSection, setActiveSection] = useState<string>("");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  
  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => courseApi.getCourseById(courseId).then((res) => res.data),
    enabled: !!courseId,
  });
  
  const { data: progress } = useQuery({
    queryKey: ["progress", courseId],
    queryFn: () => courseApi.getProgress(courseId).then((res) => res.data),
    enabled: !!courseId,
  });
  
  const updateProgressMutation = useMutation({
    mutationFn: (completedSections: string[]) =>
      courseApi.updateProgress(courseId, completedSections),
    onSuccess: (response) => {
      queryClient.setQueryData(["progress", courseId], response.data);
      toast.success("进度已保存", {
        description: `完成进度：${response.data.progressPercentage}%`,
      });
    },
    onError: () => {
      toast.error("保存失败", {
        description: "请稍后重试",
      });
    },
  });
  
  const completedSections = progress?.completedSections || [];
  
  useEffect(() => {
    if (course?.sections.length && !activeSection) {
      setActiveSection(course.sections[0].id);
    }
  }, [course, activeSection]);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("data-section-id");
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [course]);
  
  const handleNavigate = (sectionId: string) => {
    const element = sectionRefs.current.get(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  
  const handleSectionComplete = (sectionId: string, completed: boolean) => {
    const newCompletedSections = completed
      ? [...completedSections, sectionId]
      : completedSections.filter((id) => id !== sectionId);
    
    updateProgressMutation.mutate(newCompletedSections);
  };
  
  useEffect(() => {
    if (course) {
      document.title = `${course.title} - 数字设计构成`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", course.description);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = course.description;
        document.head.appendChild(meta);
      }
    }
  }, [course]);
  
  if (courseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <BookOpen className="h-12 w-12 animate-pulse mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">加载课程中...</p>
        </div>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">课程未找到</p>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="mb-6"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回
            </Button>
            
            <div className="space-y-6">
              <div className="space-y-2">
                {course.subtitle && (
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    {course.subtitle}
                  </p>
                )}
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {course.title}
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-3xl">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{course.duration}</span>
                </div>
                <Badge variant="secondary">{course.metadata.level}</Badge>
                {course.metadata.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span className="font-medium">学习进度</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {completedSections.length} / {course.sections.length} 完成
                  </span>
                </div>
                <Progress
                  value={progress?.progressPercentage || 0}
                  className="h-2"
                />
              </div>
              
              {course.objectives.length > 0 && (
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold text-lg">学习目标</h2>
                  </div>
                  <ul className="space-y-2">
                    {course.objectives.map((objective, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3">
            <CourseNavigation
              sections={course.sections}
              activeSection={activeSection}
              onNavigate={handleNavigate}
            />
          </aside>
          
          <main className="lg:col-span-9 space-y-12">
            {course.sections.map((section, index) => (
              <motion.section
                key={section.id}
                ref={(el) => {
                  if (el) {
                    sectionRefs.current.set(section.id, el);
                  }
                }}
                data-section-id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="scroll-mt-24"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h2
                        className="text-2xl font-bold tracking-tight"
                        id={section.id}
                      >
                        {section.title}
                      </h2>
                      <Badge variant="outline" className="text-xs">
                        {section.order}
                      </Badge>
                    </div>
                  </div>
                  
                  <label
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors",
                      completedSections.includes(section.id)
                        ? "bg-green-50 dark:bg-green-950"
                        : "bg-muted"
                    )}
                  >
                    <Checkbox
                      checked={completedSections.includes(section.id)}
                      onCheckedChange={(checked) =>
                        handleSectionComplete(section.id, checked as boolean)
                      }
                      aria-label={`标记"${section.title}"为${completedSections.includes(section.id) ? "未完成" : "已完成"}`}
                    />
                    <span className="text-xs font-medium whitespace-nowrap">
                      {completedSections.includes(section.id)
                        ? "已完成"
                        : "标记完成"}
                    </span>
                  </label>
                </div>
                
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <RichText blocks={section.content.blocks} />
                </div>
              </motion.section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
