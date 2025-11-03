import { Link } from "wouter";
import { BookOpen, Palette, Lightbulb } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ContentGrid,
  SectionHeader,
} from "@/components/ui";

export default function HomePage() {
  return (
    <div className="container-responsive py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          数字设计构成
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          系统化的设计教育平台，探索视觉构成的基本原理
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/courses">
            <Button size="lg">
              <BookOpen className="mr-2 h-5 w-5" />
              开始学习
            </Button>
          </Link>
          <Link href="/style-guide">
            <Button size="lg" variant="outline">
              查看样式指南
            </Button>
          </Link>
        </div>
      </div>

      <SectionHeader
        title="核心模块"
        description="探索课程的主要学习板块"
      />

      <ContentGrid cols={3}>
        <Card>
          <CardHeader>
            <BookOpen className="h-10 w-10 text-primary mb-2" />
            <CardTitle>课程大纲</CardTitle>
            <CardDescription>
              12周系统课程，从基础到进阶的完整学习路径
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/courses">
              <Button variant="outline" className="w-full">
                查看课程
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Palette className="h-10 w-10 text-primary mb-2" />
            <CardTitle>知识卡片</CardTitle>
            <CardDescription>
              精心整理的设计理论与实践知识库
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/knowledge">
              <Button variant="outline" className="w-full">
                探索知识
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Lightbulb className="h-10 w-10 text-primary mb-2" />
            <CardTitle>案例库</CardTitle>
            <CardDescription>
              国内外优秀设计案例分析与学习
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/cases">
              <Button variant="outline" className="w-full">
                查看案例
              </Button>
            </Link>
          </CardContent>
        </Card>
      </ContentGrid>
    </div>
  );
}
