import { defineConfig } from 'astro/config';

import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import { SiteConfig } from './src/config.ts';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
// 关键修改：命名导入（加花括号）
import { rehypeGithubAlerts } from 'rehype-github-alerts';

export default defineConfig({
  site: SiteConfig.siteUrl,
  markdown: {
    remarkPlugins: [ remarkGfm, remarkDirective],
    rehypePlugins: [rehypeGithubAlerts],
    // extendDefaultPlugins: true,
  },
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()]
  },
});