// 从utils/types.ts导入接口
import type { SiteConfigType } from './utils/types';

export const SiteConfig: SiteConfigType = {
  title: '王苏洋Blog',
  subtitle: '折腾不止,记录不停',
  author: '王苏洋',
  favicon: '/IMG_8745.jpeg',
  siteUrl: 'https://blog.almango.cn',
  createTime: '2025-07-17',
  PaginationConfig: {
    POSTS_PER_PAGE: 8,    // 每页显示的文章数量
  },
  
  // 封面功能开关
  CoverConfig: {
    enable: true,  // 是否开启封面功能 true/false
  },

  SiteStyleConfig: {
  themeColor: '#1890ff', // 主色调
  fontFamily: 'Inter, sans-serif', // 字体
  borderRadius: '12px', // 圆角
},
  
  Categories: {
    '年度总结': { icon: 'tabler:carambola', color: '#ffae00ff' },
    '感言': { icon: 'tabler:heart', color: '#cc2b1fff' },
    '日常': {icon: 'tabler:edit',color: '#b83f81ff'},
    '游戏': {icon: 'tabler:device-gamepad-2',color: '#cc6a19ff'},
    '技能': {icon: 'tabler:braces', color: '#2d7be0ff'},
    '随笔': {icon: 'tabler:pencil', color: '#1cb17dff'},
  },
  NavConfig: [
    { name: '归档', path: '/archive', icon: 'tabler:archive' },
    { name: '友链', path: '/link', icon: 'tabler:link' },
    { name: '鱼塘', path: '/circle', icon: 'tabler:bubble-text' },
    { name: '项目', path: '/project', icon: 'tabler:layout-kanban' },
    { name: '关于', path: '/about', icon: 'tabler:user' },
  ],
}

export const ProfileConfig = {
  name: '王苏洋Blog',
  avatar: '/IMG_8745.jpeg',
  desc: '折腾不止,记录不停',
}

export const CommentConfig = {
  enable: true, 
  provider: 'twikoo', 
  twikoo: {
    envId: 'https://twikoo.wsyblog.cn/', 
    path: 'auto', 
  }
}

export const DEVELOPER_CONFIG = {
  THEME_VERSION: '4.8a',
}
