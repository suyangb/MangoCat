// 从utils/types.ts导入接口
import type { SiteConfigType } from './utils/types';

export const SiteConfig: SiteConfigType = {
  title: 'Almango',
  author: 'Almango',
  favicon: '/favicon.png',
  desc: '天真永不消逝，浪漫至死不渝',
  siteUrl: 'https://blog.almango.cn',
  PaginationConfig: {
    POSTS_PER_PAGE: 8,    // 每页显示的文章数量
    },
  Categories: {
    '年度总结': { icon: 'tabler:carambola', color: '#ffae00ff' },
    '感言': { icon: 'tabler:heart', color: '#ee0f52ff' },
    '日常': {icon: 'tabler:edit',color: '#c03f99ff'},
    '游戏': {icon: 'tabler:device-gamepad-2',color: '#00da49ff'},
    '技能': {icon: 'tabler:braces', color: '#36bd41ff'}
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
  name: 'Almango',
  avatar: '/avatar.jpg',
  desc: '精益求精，至臻至善',
  showOnHome: true, // 控制是否在主页显示头像和作者信息
}

export const CommentConfig = {
  enable: true, 
  provider: 'twikoo', 
  twikoo: {
    envId: 'https://www.almango.fun/', 
    path: 'auto', 
  }
}

export const DEVELOPER_CONFIG = {
  THEME_VERSION: '2.5',
}