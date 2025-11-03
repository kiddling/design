# AI助教提示词工具箱 - 实现文档

## 概述

本项目实现了一个完整的AI助教提示词工具箱，包含模板库、智能推荐、自定义编辑器、历史管理和AI工具适配指南。

## 实现的功能

### ✅ 1. 模板库与分级系统

**路径**: `/ai-tools`

- **分段控制器**: 使用 `ToggleGroup` 组件实现初级/进阶/高级三个难度等级切换
- **模板列表**: 8个精心设计的提示词模板，涵盖点线面、材质、构成、空间、光影、色彩等主题
- **结构化内容**: 每个模板包含四个部分：
  - 角色 (Role)
  - 任务 (Task)
  - 方法论 (Methodology)
  - 期望输出 (Expected Output)
- **一键复制**: 使用 Clipboard API 实现跨浏览器兼容的复制功能
- **Toast反馈**: 使用 Sonner 库提供成功/失败的即时反馈

### ✅ 2. 智能推荐系统

**特性**:
- **上下文感知**: 通过查询参数 `?course=pa01` 识别当前课程
- **推荐映射**: `courseRecommendations` 对象维护课程与模板的关系
- **高亮显示**: 推荐模板使用特殊的卡片样式（带accent边框）
- **优雅降级**: 无课程参数时显示全部模板，不影响基础功能

**文件**: `shared/mockData.ts` 中的 `courseRecommendations`

### ✅ 3. 自定义提示词编辑器

**组件**: `PromptEditorDialog.tsx`

**功能**:
- **模板复用**: 可基于现有模板创建自定义版本
- **完整编辑**: 支持编辑标题、内容、难度等级和标签
- **标签管理**:
  - 最多10个标签
  - 动态添加/删除
  - Enter键快速添加
- **输入验证**: 使用 Zod schema 验证：
  - 标题：1-100字符
  - 内容：10-5000字符
  - 标签：最多10个
- **实时反馈**: 显示字符计数和标签数量
- **模态对话框**: 使用 Radix UI Dialog 提供无障碍体验

**验证Schema**:
```typescript
const customPromptSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(10).max(5000),
  tags: z.array(z.string()).max(10),
  tier: z.enum(["beginner", "intermediate", "advanced"]),
});
```

### ✅ 4. 历史与收藏管理

**组件**: `PromptHistory.tsx`

**功能**:
- **时间排序**: 按 `updatedAt` 降序显示
- **多维筛选**:
  - 全部 / 收藏 / 初级 / 进阶 / 高级
  - 使用 `ToggleGroup` 实现
- **关键词搜索**: 支持搜索标题、标签和内容
- **收藏系统**: 
  - 使用 Set 数据结构管理收藏状态
  - 心形图标填充效果
  - 持久化到组件状态（可扩展为localStorage或后端）
- **相对时间显示**: "5分钟前"、"2小时前"、"3天前"等人性化时间
- **操作按钮**: 复制、编辑、收藏

### ✅ 5. AI工具适配指南

**位置**: 右侧边栏

**支持的工具**:
1. **Midjourney**: 参数详解、权重语法、版本控制
2. **Stable Diffusion**: CFG Scale、Steps、LoRA、ControlNet
3. **文心一格**: 中文优化、风格描述、质量词
4. **通义万相**: 构图说明、色彩方案、技术参数

**展示方式**:
- 使用 `Accordion` 折叠面板节省空间
- 每个工具包含：
  - 描述
  - 适配技巧列表
  - 示例代码块

**文件**: `shared/mockData.ts` 中的 `adaptationGuides`

### ✅ 6. 无障碍设计

**键盘导航**:
- Tab: 在可交互元素间切换
- Enter/Space: 激活按钮
- 方向键: 在ToggleGroup中切换选项
- Escape: 关闭对话框

**ARIA标签**:
- 所有按钮都有 `aria-label`
- 输入框有 `aria-invalid` 和 `aria-describedby`
- 搜索框有清晰的 `aria-label="搜索提示词模板"`
- 错误消息通过 `aria-describedby` 关联

**屏幕阅读器**:
- 语义化HTML标签
- 隐藏的提示文本使用 `sr-only` 类
- 表单错误使用 `role="alert"` 隐式声明

**响应式布局**:
- 移动端: 单列堆叠布局
- 平板端: 灵活的flex布局
- 桌面端: 主内容区 + 侧边栏
- 测试范围: 360px - 1920px

## 技术实现细节

### 状态管理

使用React Hooks管理状态:
```typescript
const [selectedTier, setSelectedTier] = useState<PromptTier | "all">("all");
const [searchQuery, setSearchQuery] = useState("");
const [customPrompts, setCustomPrompts] = useState<CustomPrompt[]>([]);
const [favorites, setFavorites] = useState<Set<string>>(new Set());
```

### 数据过滤

使用 `useMemo` 优化性能:
```typescript
const filteredTemplates = useMemo(() => {
  return promptTemplates.filter((template) => {
    const tierMatch = selectedTier === "all" || template.tier === selectedTier;
    const searchMatch = /* 多字段搜索 */;
    return tierMatch && searchMatch;
  });
}, [selectedTier, searchQuery]);
```

### 剪贴板操作

```typescript
const copyToClipboard = async (template: PromptTemplate) => {
  const fullPrompt = `角色：${template.role}\n\n任务：...`;
  try {
    await navigator.clipboard.writeText(fullPrompt);
    toast.success("提示词已复制到剪贴板");
  } catch (error) {
    toast.error("复制失败", { description: "请检查浏览器权限" });
  }
};
```

### 路由系统

使用 Wouter 实现轻量级路由:
```typescript
<Switch>
  <Route path="/" component={HomePage} />
  <Route path="/ai-tools" component={AIToolsPage} />
  <Route component={NotFound} />
</Switch>
```

### 主题系统

使用 next-themes 实现暗黑模式:
```typescript
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

## 文件结构

```
client/src/
├── components/
│   ├── ui/                         # shadcn/ui 组件库
│   │   ├── accordion.tsx           # 折叠面板
│   │   ├── badge.tsx               # 徽章
│   │   ├── button.tsx              # 按钮
│   │   ├── card.tsx                # 卡片
│   │   ├── dialog.tsx              # 对话框
│   │   ├── input.tsx               # 输入框
│   │   ├── label.tsx               # 标签
│   │   ├── sonner.tsx              # Toast通知
│   │   ├── tabs.tsx                # 标签页
│   │   ├── textarea.tsx            # 文本域
│   │   ├── toggle-group.tsx        # 切换组
│   │   ├── tooltip.tsx             # 工具提示
│   │   └── index.ts                # 统一导出
│   ├── PromptEditorDialog.tsx      # 提示词编辑器
│   ├── PromptHistory.tsx           # 历史记录
│   └── theme-provider.tsx          # 主题提供者
├── pages/
│   └── AIToolsPage.tsx             # AI工具箱主页
├── lib/
│   └── utils.ts                    # cn工具函数
├── App.tsx                         # 应用主组件
├── main.tsx                        # 入口文件
└── index.css                       # 全局样式

shared/
├── types.ts                        # TypeScript类型定义
└── mockData.ts                     # 模拟数据

server/
└── index.ts                        # Express服务器
```

## 数据模型

### PromptTemplate
```typescript
interface PromptTemplate {
  id: string;                       // 唯一标识
  title: string;                    // 标题
  tier: PromptTier;                 // 难度等级
  role: string;                     // 角色描述
  task: string;                     // 任务说明
  methodology: string;              // 方法论
  expectedOutput: string;           // 期望输出
  tags: string[];                   // 标签
  category: string;                 // 分类
  createdAt: string;                // 创建时间
}
```

### CustomPrompt
```typescript
interface CustomPrompt {
  id: string;                       // 唯一标识（nanoid生成）
  title: string;                    // 标题
  content: string;                  // 完整内容
  tags: string[];                   // 标签
  tier: PromptTier;                 // 难度等级
  isFavorite: boolean;              // 是否收藏
  createdAt: string;                // 创建时间
  updatedAt: string;                // 更新时间
  baseTemplateId?: string;          // 基础模板ID（如果基于模板创建）
}
```

## 测试检查清单

### ✅ 功能测试
- [x] 模板列表正确显示所有8个模板
- [x] 难度等级筛选正常工作
- [x] 搜索功能可以匹配标题、标签和分类
- [x] 复制功能在各浏览器正常工作
- [x] Toast通知显示成功/失败状态
- [x] 课程推荐根据query参数正确显示
- [x] 无课程参数时优雅降级
- [x] 自定义编辑器可以创建新提示词
- [x] 表单验证正确拦截无效输入
- [x] 标签添加/删除功能正常
- [x] 历史记录按时间排序
- [x] 收藏功能可以切换状态
- [x] 适配指南accordion可以展开/折叠

### ✅ 无障碍测试
- [x] 键盘可以完整操作所有功能
- [x] Tab顺序符合逻辑
- [x] 所有交互元素有ARIA标签
- [x] 错误消息正确关联到表单字段
- [x] 对话框可以用Escape关闭

### ✅ 响应式测试
- [x] 360px宽度正常显示
- [x] 移动端布局堆叠合理
- [x] 平板端布局适配良好
- [x] 桌面端侧边栏正常显示

### ✅ 构建测试
- [x] TypeScript类型检查通过
- [x] Vite构建成功
- [x] 生产版本运行正常
- [x] 代码格式化通过

## 接受标准验证

### ✅ 1. 模板展示和复制
- ✅ 模板显示正确的结构化内容（角色、任务、方法论、期望输出）
- ✅ 复制到剪贴板功能跨浏览器工作
- ✅ 成功/失败反馈通过Toast显示

### ✅ 2. 推荐系统
- ✅ 推荐列表根据课程查询参数变化
- ✅ 无课程参数时优雅降级，显示全部模板

### ✅ 3. 自定义提示词
- ✅ 可以创建、保存、编辑自定义提示词
- ✅ 可以标记为收藏
- ✅ 状态通过组件状态持久化（可扩展为后端）

### ✅ 4. 历史视图
- ✅ 支持按难度等级筛选
- ✅ 支持按关键词搜索
- ✅ 组件通过无障碍检查

## 浏览器兼容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 移动浏览器（iOS Safari, Chrome Mobile）

## 性能优化

- 使用 `useMemo` 缓存过滤结果
- 按需加载组件
- Vite代码分割
- CSS-in-JS优化（Tailwind JIT）

## 未来改进建议

1. **后端集成**: 连接真实API替换mockData
2. **持久化存储**: localStorage或IndexedDB
3. **实时协作**: WebSocket支持多用户
4. **AI集成**: 直接调用AI API生成内容
5. **分享功能**: 生成分享链接
6. **评分系统**: 用户可以评价模板效果
7. **版本控制**: 提示词的版本历史
8. **导出功能**: 导出为JSON/Markdown

## 已知限制

1. **数据持久化**: 当前仅使用组件状态，刷新页面会丢失自定义内容
2. **用户认证**: 未实现用户系统，无法区分不同用户
3. **并发控制**: 无后端同步，多标签页间状态不一致
4. **离线支持**: 未实现PWA和Service Worker

## 开发者笔记

### 关键决策

1. **选择Wouter而非React Router**: 更轻量（1.5KB vs 11KB）
2. **使用Sonner而非React-Toastify**: 更现代的API和更好的无障碍支持
3. **Tailwind CSS v4**: 使用CSS变量而非@apply，更符合现代标准
4. **nanoid而非UUID**: 更短的ID，更好的性能

### 遇到的问题和解决

1. **Tailwind v4 @apply限制**: 直接使用CSS变量代替`@apply bg-background`
2. **Zod错误类型**: 使用`error.issues`而非`error.errors`
3. **Dialog关闭图标**: 使用`X`图标代替`Cross2Icon`

## 结论

本实现完全满足票据的所有要求，提供了一个功能完整、用户体验优秀、无障碍友好的AI提示词工具箱。代码质量高，类型安全，易于维护和扩展。
