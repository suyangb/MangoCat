### Astro Theme MangoCat

 一个简洁、现代、高性能的 Astro 博客主题 ([Demo](https://blog.almango.cn))


### 特性

- **🚀 高性能** - 基于 Astro 构建，零 JS 默认加载，极致的性能体验
- **🎨 现代化设计** - 简洁优雅的界面，支持自定义主题色
- **📱 响应式布局** - 完美适配桌面端和移动端
- **🌙 深色模式** - 支持自动/手动切换深色主题
- **📝 Markdown ** - 采用Github Markdown 格式、增强阅读体验
- **🔍 SEO 友好** - 自动生成 RSS、Sitemap，支持 Open Graph
- **💬 评论系统** - 内置 Twikoo 评论支持
- **🔗 友链系统** - 支持 RSS 订阅聚合展示（鱼塘功能）

### 安装

> Node.js 21 +
> Astro 6 (>= 6.0.0)

```bash
# 克隆仓库
git clone https://github.com/Almango/MangoCat.git
cd mangocat

# 安装依赖
pnpm i

# 启动开发服务器
pnpm dev
```

### 构建

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

### 项目结构

```
.
├── public/                 # 静态资源
│   ├── avatar.jpg         # 头像
│   └── favicon.png        # 站点图标
├── src/
│   ├── components/        # 组件
│   │   ├── Header.astro   # 导航栏
│   │   ├── Footer.astro   # 页脚
│   │   ├── Postlist.astro # 文章列表
│   │   └── ...
│   ├── content/           # 文章数据
│   │   └── posts/         # Markdown 文章
│   ├── data/              # 数据文件
│   │   └── links.ts       # 友链配置
│   ├── layouts/           # 布局模板
│   │   └── Layout.astro   # 基础布局
│   ├── pages/             # 页面路由
│   │   ├── index.astro    # 首页
│   │   ├── archive.astro  # 归档
│   │   ├── circle.astro   # 鱼塘
│   │   ├── link.astro     # 友链页面
│   │   ├── project.astro  # 项目展示
│   │   ├── about.astro    # 关于页面
│   │   └── posts/         # 文章详情页
│   ├── styles/            # 样式文件
│   │   ├── global.css     # 全局样式
│   │   ├── animate.css    # 自定义动画库
│   │   └── markdown.css   # Markdown 样式
│   ├── utils/             # 工具函数
│   │   ├── RSSParser.ts   # RSS 解析
│   │   └── types.ts       # TypeScript 类型
│   ├── config.ts          # 站点配置
│   └── content.config.ts  # 内容集合配置
├── astro.config.ts        # Astro 配置
├── tailwind.config.ts     # TailwindCSS 配置
└── package.json
```



