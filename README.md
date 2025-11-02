# 数字设计构成 - AI助教提示词工具箱

专业的AI提示词模板库，帮助设计学生更好地使用AI工具完成设计任务。

## 功能特性

### 1. 提示词模板库

- **分级模板**：初级、进阶、高级三个难度等级
- **结构化内容**：包含角色、任务、方法论、期望输出四个部分
- **一键复制**：使用Clipboard API快速复制提示词
- **实时反馈**：Toast通知显示复制成功/失败状态

### 2. 智能推荐系统

- **上下文感知**：基于课程参数（如 `?course=pa01`）推荐相关提示词
- **优雅降级**：无课程上下文时显示全部模板

### 3. 自定义编辑器

- **模板复用**：基于现有模板创建自定义版本
- **标签管理**：支持添加最多10个标签
- **输入验证**：使用Zod进行表单验证
- **持久化**：保存到本地状态（可扩展为后端持久化）

### 4. 历史与收藏

- **时间排序**：按更新时间倒序显示历史记录
- **快速筛选**：按难度等级和收藏状态筛选
- **关键词搜索**：支持搜索标题、标签和内容
- **收藏功能**：一键收藏/取消收藏

### 5. AI工具适配指南

- **多工具支持**：Midjourney、Stable Diffusion、文心一格、通义万相
- **详细说明**：每个工具的特点、适配技巧和示例
- **折叠面板**：使用Accordion节省空间

### 6. 无障碍设计

- **键盘导航**：全面支持Tab、Enter、方向键操作
- **ARIA标签**：所有交互元素都有描述性标签
- **屏幕阅读器友好**：使用语义化HTML和ARIA属性
- **响应式布局**：从360px到大屏幕全面适配

## 技术栈

- **React 18.3** - UI框架
- **TypeScript 5.6** - 类型安全
- **Vite 7** - 构建工具
- **Tailwind CSS 4** - 样式系统
- **shadcn/ui** - 组件库（基于Radix UI）
- **Wouter** - 路由
- **Sonner** - Toast通知
- **Zod 4** - 表单验证
- **nanoid** - ID生成

## 开发指南

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
client/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui组件
│   │   ├── PromptEditorDialog.tsx
│   │   ├── PromptHistory.tsx
│   │   └── theme-provider.tsx
│   ├── pages/
│   │   └── AIToolsPage.tsx  # AI工具箱主页面
│   ├── lib/
│   │   └── utils.ts         # cn工具函数
│   ├── App.tsx              # 应用入口和路由
│   ├── main.tsx             # React渲染入口
│   └── index.css            # 全局样式
├── index.html
shared/
├── types.ts                 # 共享类型定义
└── mockData.ts              # 模拟数据
server/
└── index.ts                 # Express服务器
```

## 路由

- `/` - 首页
- `/ai-tools` - AI工具箱
- `/ai-tools?course=pa01` - 带课程上下文的AI工具箱

## 数据结构

### PromptTemplate

```typescript
interface PromptTemplate {
  id: string;
  title: string;
  tier: "beginner" | "intermediate" | "advanced";
  role: string;
  task: string;
  methodology: string;
  expectedOutput: string;
  tags: string[];
  category: string;
  createdAt: string;
}
```

### CustomPrompt

```typescript
interface CustomPrompt {
  id: string;
  title: string;
  content: string;
  tags: string[];
  tier: PromptTier;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  baseTemplateId?: string;
}
```

## 未来扩展

- [ ] 连接真实的后端API
- [ ] 用户认证和多用户支持
- [ ] 提示词效果评分系统
- [ ] AI生成结果展示
- [ ] 社区分享功能
- [ ] 多语言支持

## License

MIT
