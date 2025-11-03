import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Workflow } from "lucide-react";
import { courseApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => courseApi.getCourses().then((res) => res.data),
  });

  const courseList = Array.isArray(courses) ? courses : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              数字设计构成
            </h1>
            <p className="text-xl text-muted-foreground">
              通过系统化的学习，掌握设计思维的基础，培养敏锐的设计洞察力
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" asChild>
                <Link href="/courses/guan-yuan-su-jie-gou">
                  开始学习
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/workflow">
                  工作流指南
                  <Workflow className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">课程列表</h2>
          <p className="text-muted-foreground">
            精心设计的课程体系，带你从基础到进阶
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <BookOpen className="h-12 w-12 animate-pulse text-muted-foreground" />
          </div>
        ) : courseList.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/10 bg-slate-900/40 px-6 py-10 text-center text-sm text-muted-foreground">
            暂无可用课程，请稍后再试。
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courseList.map((course, index) => {
              const metadata = (course as any)?.metadata ?? {};
              const level = metadata?.level ?? "待定";
              const tags = Array.isArray(metadata?.tags) ? metadata.tags : [];
              const displayTags = tags.slice(0, 3);
              const courseHref = course.id ? `/courses/${course.id}` : "#";

              return (
                <motion.div
                  key={course.id ?? `course-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <Badge variant="secondary">{level}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{course.duration ?? "--"}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{course.title ?? "未命名课程"}</CardTitle>
                      {course.subtitle && (
                        <CardDescription className="text-xs uppercase tracking-wider">
                          {course.subtitle}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                        {course.description ?? "课程详情即将上线，敬请期待。"}
                      </p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {displayTags.map((tag, i) => (
                          <Badge key={`${course.id ?? index}-tag-${i}`} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button asChild className="w-full">
                        <Link href={courseHref} aria-disabled={!course.id}>
                          查看课程
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
