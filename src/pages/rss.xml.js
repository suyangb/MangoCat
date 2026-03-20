import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { SiteConfig } from '../config.ts';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  
  // 按发布时间倒序排序，过滤掉无有效发布日期的文章
  const sortedPosts = posts
    .filter(post => !!post.data.published) // 过滤无发布日期的文章
    .sort((a, b) => {
      const dateA = new Date(a.data.published);
      const dateB = new Date(b.data.published);
      if (isNaN(dateA.getTime())) return 1;
      if (isNaN(dateB.getTime())) return -1;
      return dateB - dateA; 
    });
  
  // 确保站点地址有默认值，避免 context.site 为空
  const siteUrl = context.site?.href || 'https://example.com/'; // 替换为你的实际域名
  
  const items = sortedPosts.map((post) => {
    // 安全解析发布日期，默认使用当前时间
    const pubDate = new Date(post.data.published);
    const validPubDate = isNaN(pubDate.getTime()) 
      ? new Date().toUTCString() 
      : pubDate.toUTCString();
    
    // 拼接完整URL，兼容post.id的不同写法
    const postId = post.data.id || post.id;
    const fullLink = `${siteUrl}posts/${postId}/`;
    
    return {
      link: fullLink,
      title: post.data.title || '无标题文章', // 兜底标题
      description: post.data.description || '暂无文章描述', // 兜底描述
      pubDate: validPubDate,
      author: SiteConfig.author || '未知作者', // 兜底作者
    };
  });
  
  // 核心修复：给description提供默认值，避免undefined
  return rss({
    title: SiteConfig.title || 'Blog', // 兜底标题
    description: SiteConfig.desc || 'example', // 关键修复：兜底描述
    site: context.site || 'https://默认域名.com', // 兜底站点地址
    items: items,
    customData: `
      <language>zh-cn</language>
      <copyright>© ${new Date().getFullYear()} ${SiteConfig.author || '未知作者'}</copyright>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    `,
  });
}