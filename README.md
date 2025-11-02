# 数字设计构成 - Digital Design Composition

数字设计构成课程的学习资源平台，提供结构化的阅读资源库和交互式学习工具。

## 功能特性

### 学习资源库 (/resources)

- **资源分类**: 将书籍分为"必读经典"和"当代视角"两个部分
- **完整元数据**: 每个资源包含标题、作者、年份、摘要、推荐理由、外部链接和标签
- **阅读状态管理**: 支持标记资源为"未读"、"想读"、"在读"、"已读"
- **状态持久化**: 阅读状态保存在浏览器本地存储，刷新页面后保持
- **筛选功能**:
  - 按标签筛选（如：康定斯基、点线面、包豪斯等）
  - 按作者筛选
  - 按阅读状态筛选
  - 全文搜索
- **URL状态同步**: 筛选条件保存在URL中，支持分享和书签
- **快捷操作**:
  - 一键复制引用格式
  - 打开外部链接
  - 添加和编辑个人笔记
- **响应式设计**: 移动端列表布局，桌面端网格布局
- **统计面板**: 显示各阅读状态的资源数量

## 技术栈

- **前端**: React 18.3 + TypeScript 5.6
- **构建工具**: Vite 7
- **路由**: Wouter
- **样式**: Tailwind CSS 4
- **UI组件**: shadcn/ui (基于 Radix UI)
- **图标**: Lucide React
- **后端**: Express (生产环境)

## 开发

### 安装依赖

```bash
npm install --legacy-peer-deps
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

### 类型检查

```bash
npm run check
```

### 代码格式化

```bash
npm run format
```

## 项目结构

```
.
├── client/                 # 前端代码
│   ├── src/
│   │   ├── components/     # React组件
│   │   │   ├── ui/        # shadcn UI组件
│   │   │   └── ResourceCard.tsx
│   │   ├── pages/         # 页面组件
│   │   │   └── Resources.tsx
│   │   ├── hooks/         # 自定义Hooks
│   │   │   └── useResourceState.ts
│   │   ├── lib/           # 工具函数
│   │   │   └── utils.ts
│   │   ├── App.tsx        # 主应用组件
│   │   ├── main.tsx       # 入口文件
│   │   └── index.css      # 全局样式
│   └── index.html         # HTML模板
├── server/                # 后端代码
│   └── index.ts          # Express服务器
├── shared/               # 前后端共享代码
│   ├── types/           # TypeScript类型定义
│   │   └── resource.ts
│   └── data/            # 数据
│       └── resources.ts
└── dist/                # 构建输出
```

## 数据结构

### Resource (资源)

```typescript
{
  id: string;              // 唯一标识
  title: string;           // 标题
  author: string;          // 作者
  year: number;           // 出版年份
  summary: string;        // 摘要
  recommendationReason: string; // 推荐理由
  externalLink: string;   // 外部链接
  tags: string[];         // 标签
  section: "必读经典" | "当代视角"; // 分类
}
```

### ReadingState (阅读状态)

- `未读`: 尚未阅读
- `想读`: 计划阅读
- `在读`: 正在阅读
- `已读`: 已完成阅读

## 可访问性

- 所有交互元素都有适当的 ARIA 标签
- 支持键盘导航（Tab、Enter、Space）
- 焦点可见状态
- 屏幕阅读器友好
- 响应式设计，最小支持 360px 宽度

## 浏览器支持

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)

## License

MIT
