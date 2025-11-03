import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Sparkles } from "lucide-react";

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">数字设计构成</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Digital Design Composition
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            现代、专业、富有创意的设计教育平台，帮助你系统学习平面、色彩、空间构成理论
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/knowledge">
            <Card className="cursor-pointer hover:shadow-lg transition-all group">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-2xl">知识卡片</CardTitle>
                <CardDescription>
                  探索康定斯基、包豪斯、5个透镜、扬·盖尔等核心设计理论
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">开始学习</Button>
              </CardContent>
            </Card>
          </Link>

          <Card className="opacity-50">
            <CardHeader>
              <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
              <CardTitle className="text-2xl">更多内容</CardTitle>
              <CardDescription>
                课程大纲、案例库、AI工具箱等功能即将推出
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled>
                敬请期待
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
