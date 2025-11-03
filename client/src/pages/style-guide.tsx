import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Checklist,
  ContentGrid,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DifficultyBadge,
  Highlight,
  InfoBanner,
  MasonryGrid,
  MasonryItem,
  MediaFigure,
  PageBreadcrumbs,
  Progress,
  QuoteCallout,
  RichText,
  SectionHeader,
  StatusPill,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Timeline,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { Heart, Star, Download, Settings, Palette } from "lucide-react";

export default function StyleGuidePage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [checklistItems, setChecklistItems] = React.useState([
    { id: "1", label: "完成课程第一章", checked: true },
    { id: "2", label: "提交作业", checked: false },
    { id: "3", label: "参与讨论", checked: false },
  ]);

  const handleChecklistToggle = (id: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="container-responsive py-12">
      <PageBreadcrumbs
        items={[
          { label: "首页", href: "/" },
          { label: "样式指南" },
        ]}
        className="mb-8"
      />

      <SectionHeader
        title="UI 设计系统样式指南"
        description="全面的组件库展示和使用说明"
        icon={Palette}
      />

      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-bold mb-6">按钮 (Buttons)</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <Button>默认按钮</Button>
                <Button variant="secondary">次要按钮</Button>
                <Button variant="outline">轮廓按钮</Button>
                <Button variant="ghost">幽灵按钮</Button>
                <Button variant="link">链接按钮</Button>
                <Button variant="destructive">危险按钮</Button>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <Button size="sm">小按钮</Button>
                <Button>默认大小</Button>
                <Button size="lg">大按钮</Button>
                <Button size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-3 mt-4">
                <Button disabled>禁用按钮</Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  带图标
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">卡片 (Cards)</h2>
          <ContentGrid cols={3}>
            <Card>
              <CardHeader>
                <CardTitle>标准卡片</CardTitle>
                <CardDescription>这是卡片的描述文本</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  卡片内容区域，可以放置任何内容
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>带图标卡片</CardTitle>
                <Star className="h-8 w-8 text-primary mb-2" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  可以在卡片中添加图标和其他元素
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>交互卡片</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">操作按钮</Button>
              </CardContent>
            </Card>
          </ContentGrid>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">徽章 (Badges)</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                <Badge>默认徽章</Badge>
                <Badge variant="secondary">次要徽章</Badge>
                <Badge variant="outline">轮廓徽章</Badge>
                <Badge variant="destructive">危险徽章</Badge>
              </div>
              <h3 className="text-lg font-semibold mt-6 mb-3">难度徽章</h3>
              <div className="flex flex-wrap gap-2">
                <DifficultyBadge difficulty="base" />
                <DifficultyBadge difficulty="advance" />
                <DifficultyBadge difficulty="stretch" />
              </div>
              <h3 className="text-lg font-semibold mt-6 mb-3">状态标签</h3>
              <div className="flex flex-wrap gap-2">
                <StatusPill status="active" />
                <StatusPill status="completed" />
                <StatusPill status="pending" />
                <StatusPill status="locked" />
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">标签页 (Tabs)</h2>
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">标签一</TabsTrigger>
                  <TabsTrigger value="tab2">标签二</TabsTrigger>
                  <TabsTrigger value="tab3">标签三</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <p>这是第一个标签的内容</p>
                </TabsContent>
                <TabsContent value="tab2">
                  <p>这是第二个标签的内容</p>
                </TabsContent>
                <TabsContent value="tab3">
                  <p>这是第三个标签的内容</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">手风琴 (Accordion)</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>第一项</AccordionTrigger>
              <AccordionContent>
                手风琴的内容区域，可以展开和收起
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>第二项</AccordionTrigger>
              <AccordionContent>
                支持键盘导航和可访问性功能
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>第三项</AccordionTrigger>
              <AccordionContent>
                平滑的动画过渡效果
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">对话框 (Dialog)</h2>
          <Card>
            <CardContent className="pt-6">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>打开对话框</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>对话框标题</DialogTitle>
                    <DialogDescription>
                      这是对话框的描述文本，用于解释对话框的用途
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p>对话框的内容区域</p>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      取消
                    </Button>
                    <Button onClick={() => setDialogOpen(false)}>确认</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">工具提示 (Tooltip)</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">悬停查看</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>这是一个工具提示</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>设置</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">进度条 (Progress)</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-sm mb-2">25% 完成</p>
                <Progress value={25} />
              </div>
              <div>
                <p className="text-sm mb-2">50% 完成</p>
                <Progress value={50} />
              </div>
              <div>
                <p className="text-sm mb-2">75% 完成</p>
                <Progress value={75} />
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">切换组 (Toggle Group)</h2>
          <Card>
            <CardContent className="pt-6">
              <ToggleGroup type="single" defaultValue="left">
                <ToggleGroupItem value="left">左对齐</ToggleGroupItem>
                <ToggleGroupItem value="center">居中</ToggleGroupItem>
                <ToggleGroupItem value="right">右对齐</ToggleGroupItem>
              </ToggleGroup>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">富文本 (Rich Text)</h2>
          <Card>
            <CardContent className="pt-6">
              <RichText>
                <h1>一级标题</h1>
                <p>
                  这是一段普通文本，支持<strong>加粗</strong>、
                  <Highlight>高亮显示</Highlight>等样式。
                </p>
                <h2>二级标题</h2>
                <p>段落文本可以包含多种格式和样式。</p>
                <ul>
                  <li>无序列表项一</li>
                  <li>无序列表项二</li>
                  <li>无序列表项三</li>
                </ul>
                <h3>三级标题</h3>
                <ol>
                  <li>有序列表项一</li>
                  <li>有序列表项二</li>
                  <li>有序列表项三</li>
                </ol>
              </RichText>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">高亮文本 (Highlight)</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-2">
                使用 <Highlight>默认高亮</Highlight> 来强调重要内容
              </p>
              <p className="mb-2">
                <Highlight variant="accent">重点高亮</Highlight> 用于特别重要的信息
              </p>
              <p className="mb-2">
                <Highlight variant="success">成功高亮</Highlight> 表示正面信息
              </p>
              <p className="mb-2">
                <Highlight variant="warning">警告高亮</Highlight> 提醒注意事项
              </p>
              <p>
                <Highlight variant="error">错误高亮</Highlight> 标记问题或错误
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">引用块 (Quote Callout)</h2>
          <QuoteCallout author="包豪斯创始人" source="设计理论">
            形式追随功能，这是现代设计的基本原则
          </QuoteCallout>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">信息横幅 (Info Banner)</h2>
          <div className="space-y-4">
            <InfoBanner variant="info" title="提示信息">
              这是一个信息提示横幅，用于展示普通提示信息
            </InfoBanner>
            <InfoBanner variant="success" title="成功">
              操作已成功完成！
            </InfoBanner>
            <InfoBanner variant="warning" title="警告">
              请注意，这个操作可能会影响你的数据
            </InfoBanner>
            <InfoBanner variant="error" title="错误">
              发生了一个错误，请重试
            </InfoBanner>
            <InfoBanner variant="tip" title="小贴士">
              你知道吗？可以使用快捷键 Ctrl+S 保存
            </InfoBanner>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">图片组件 (Media Figure)</h2>
          <MediaFigure
            src="https://placehold.co/800x450/1E40AF/ffffff?text=Demo+Image"
            alt="示例图片"
            caption="这是图片的说明文字"
            credit="图片来源示例"
            aspectRatio="video"
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">时间轴 (Timeline)</h2>
          <Card>
            <CardContent className="pt-6">
              <Timeline
                items={[
                  {
                    id: "1",
                    title: "第一周",
                    description: "观·元素解构",
                    date: "2024-01",
                    completed: true,
                  },
                  {
                    id: "2",
                    title: "第二周",
                    description: "触·材质发现",
                    date: "2024-02",
                    completed: true,
                  },
                  {
                    id: "3",
                    title: "第三周",
                    description: "构·动态平衡",
                    date: "2024-03",
                    completed: false,
                  },
                  {
                    id: "4",
                    title: "第四周",
                    description: "塑·空间幻觉",
                    date: "2024-04",
                    completed: false,
                  },
                ]}
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">清单 (Checklist)</h2>
          <Card>
            <CardContent className="pt-6">
              <Checklist items={checklistItems} onItemToggle={handleChecklistToggle} />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">轮播图 (Carousel)</h2>
          <Card>
            <CardContent className="pt-6">
              <Carousel className="w-full max-w-xl mx-auto">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-video items-center justify-center p-6">
                            <span className="text-4xl font-semibold">{index + 1}</span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">内容网格 (Content Grid)</h2>
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">3列网格</h3>
                <ContentGrid cols={3}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-muted p-6 rounded-lg text-center">
                      项目 {i + 1}
                    </div>
                  ))}
                </ContentGrid>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">瀑布流网格 (Masonry Grid)</h2>
          <Card>
            <CardContent className="pt-6">
              <MasonryGrid cols={3}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <MasonryItem key={i}>
                    <div
                      className="bg-muted p-6 rounded-lg"
                      style={{ height: `${150 + Math.random() * 150}px` }}
                    >
                      项目 {i + 1}
                    </div>
                  </MasonryItem>
                ))}
              </MasonryGrid>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">响应式测试</h2>
          <InfoBanner variant="info" title="响应式支持">
            本设计系统支持从 360px 到 1920px 的屏幕宽度，所有组件都经过响应式优化。
            请尝试调整浏览器窗口大小查看效果。
          </InfoBanner>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">主题切换</h2>
          <InfoBanner variant="tip" title="主题系统">
            点击顶部导航栏的主题切换按钮，可以在浅色、深色和系统主题之间切换。
            所有组件都完美支持深色模式。
          </InfoBanner>
        </section>
      </div>
    </div>
  );
}
