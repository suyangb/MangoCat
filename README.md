### 🥭 Astro Theme MangoCat

 一个简洁、现代、高性能的 Astro 博客主题 (🖥️[Demo](https://blog.almango.cn))

[![](https://img.shields.io/badge/Astro-v6.0.7-BC52EE?logo=astro)]({linkUrl})
[![](https://img.shields.io/badge/Vercel-success-2A2F3D?logo=vercel)]({linkUrl})
[![](https://img.shields.io/badge/Node.js->=21-5FA04E?logo=nodedotjs)]({linkUrl})
[![](https://img.shields.io/badge/pnpm-v10.26.2-F69220?logo=pnpm)]({linkUrl})
[![](https://img.shields.io/badge/npm-v11.6.2-CB3837?logo=npm)]({linkUrl})
[![](https://img.shields.io/badge/许可-MIT-D1AB66)]({linkUrl})


> [!error]
> 使用该主题部署后请先删除content/posts/的文章！！！

### ✨ 特性

**高性能** - 基于 Astro 构建，零 JS 默认加载，极致的性能体验

**现代化设计** - 简洁优雅的界面，支持自定义主题色

**响应式布局** - 完美适配桌面端和移动端

**深色模式** - 支持自动/手动切换深色主题

**美观文档** - 采用Github Markdown 格式、增强阅读体验

**SEO友好** - 自动生成 RSS、Sitemap

**评论系统** - 内置 Twikoo 评论支持

**精美图标支持** - 采用 Tabler Icons 图标库，更贴合现代审美

### 🛠️ 安装

环境要求：

> Node.js v24.12.0 (>= 21.0.0)

> Astro v6.0.7 (>= 6.0.7)

```bash
# 克隆仓库
git clone https://github.com/Almango/MangoCat.git

# 进入项目目录
cd mangocat

# 安装依赖
pnpm i

# 启动开发服务器
pnpm dev
```

### 🚀 构建

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

### 📁 项目结构

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
### 🔄 配置站点信息

你可以在`src/config.ts`中配置站点信息，包括站点标题、描述、头像、图标、Twikoo 评论系统 URL、Tabler Icons 图标库 URL 等。

```ts
// src/config.ts
export const SiteConfig: SiteConfigType = {
  title: 'Almango',  // 站点标题
  author: 'Almango',  // 站点作者
  favicon: '/favicon.png',  // 站点图标
  subtitle: '天真永不消逝，浪漫至死不渝',  // 站点副标题
  siteUrl: 'https://blog.almango.cn',  // 站点 URL
  createTime: '2024-01-23',  // 创建时间
  PaginationConfig: {
    POSTS_PER_PAGE: 8,    // 每页显示的文章数量
  }
  ....
```

### ✒️ 创建文章

创建文章时，需要在`content/posts/`目录下创建一个 markdown 文档，并在文档中添加 frontmatter 格式。

frontmatter 格式如下：

> [!WARNING]
> 需严格遵守frontmatter格式，否则会导致文章渲染错误

```md
---
title: Hello World 
description: this is a article description.
published: 2026-03-24 12:00:00
cover: https://example.com/cover.webp
category: 分类
tags: ["标签"]
id: "x8032l7x2"
---

文章内容...
```

### 📣 反馈

如果您有任何问题或建议，请欢迎提交 Pull Request 或创建 Issue。
