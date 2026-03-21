import { DOMParser } from 'xmldom';

// 定义文章信息的 TypeScript 接口（新增 link 字段）
export interface Article {
  id: number;
  title: string;
  author: string;
  publishTime: string;
  summary: string;
  link: string; // 新增：文章地址/链接
}

/**
 * 格式化时间为中文易读格式
 * @param dateString ISO 格式/普通时间字符串
 * @returns 格式化后的时间
 */
const formatDate = (dateString: string): string => {
  if (!dateString) return '未知时间';
  try {
    const date = new Date(dateString);
    // 兼容无效时间戳的情况
    if (isNaN(date.getTime())) return '未知时间';
    
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch (error) {
    return '时间格式错误';
  }
};

/**
 * 判断 RSS 类型（Atom / RSS2.0）
 * @param xmlDoc 解析后的 XML DOM 对象
 * @returns 类型标识
 */
const getRssType = (xmlDoc: Document): 'atom' | 'rss2' => {
  // Atom 特征：存在 <feed> 根节点 且 命名空间包含 atom
  const feedNode = xmlDoc.getElementsByTagName('feed')[0];
  if (feedNode && (feedNode.namespaceURI?.includes('atom') || feedNode.tagName === 'feed')) {
    return 'atom';
  }
  
  // RSS2.0 特征：存在 <rss> 根节点 且 version=2.0
  const rssNode = xmlDoc.getElementsByTagName('rss')[0];
  if (rssNode && rssNode.getAttribute('version') === '2.0') {
    return 'rss2';
  }
  
  // 默认按 Atom 处理（兼容大部分情况）
  return 'atom';
};

/**
 * 通用的节点文本获取函数（支持嵌套节点）
 * @param parentNode 父节点
 * @param tagNames 标签名列表（支持嵌套，如 ['author', 'name']）
 * @returns 文本内容
 */
const getNestedNodeText = (parentNode: Element, tagNames: string[]): string => {
  let currentNode: Element | null = parentNode;
  
  for (const tag of tagNames) {
    if (!currentNode) break;
    // 获取第一个匹配的子节点
    currentNode = currentNode.getElementsByTagName(tag)[0];
  }
  
  return currentNode?.textContent?.trim() || '';
};

/**
 * 专门解析文章链接的函数（兼容 Atom/RSS2.0 不同格式）
 * @param itemElement 文章节点
 * @param rssType RSS类型
 * @returns 文章链接
 */
const getArticleLink = (itemElement: Element, rssType: 'atom' | 'rss2'): string => {
  if (rssType === 'atom') {
    // Atom 格式链接解析：
    // 情况1: <link href="https://xxx.com/article" />（最常见）
    const linkNode = itemElement.getElementsByTagName('link')[0];
    if (linkNode && linkNode.hasAttribute('href')) {
      return linkNode.getAttribute('href')?.trim() || '';
    }
    // 情况2: <link>https://xxx.com/article</link>（备用）
    return getNestedNodeText(itemElement, ['link']) || '';
  } else {
    // RSS2.0 格式链接解析：
    // 情况1: <link>https://xxx.com/article</link>（最常见）
    const directLink = getNestedNodeText(itemElement, ['link']);
    if (directLink) return directLink;
    // 情况2: <guid isPermaLink="true">https://xxx.com/article</guid>（备用）
    const guidNode = itemElement.getElementsByTagName('guid')[0];
    if (guidNode && guidNode.getAttribute('isPermaLink') === 'true') {
      return guidNode.textContent?.trim() || '';
    }
    return '';
  }
};

/**
 * 解析 RSS/Atom 并提取文章核心信息（新增文章链接）
 * @param rssUrl RSS/Atom 地址
 * @returns 文章列表数组
 */
export const parseRss = async (rssUrl: string): Promise<Article[]> => {
  try {
    // 1. 发起请求获取 RSS 数据
    const response = await fetch(rssUrl);
    
    if (!response.ok) {
      throw new Error(`请求失败: ${response.status} ${response.statusText}`);
    }

    // 2. 读取 XML 文本并解析
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    // 3. 判断 RSS 类型，获取对应的文章节点
    const rssType = getRssType(xmlDoc);
    const itemNodes = rssType === 'atom' 
      ? xmlDoc.getElementsByTagName('entry')  // Atom 用 entry
      : xmlDoc.getElementsByTagName('item');   // RSS2.0 用 item

    // 4. 提取所有文章条目信息
    const articles: Article[] = Array.from(itemNodes).map((item, index) => {
      // 类型断言为 Element（确保能调用 getElementsByTagName）
      const itemElement = item as Element;
      
      // 解析文章链接（新增核心逻辑）
      const link = getArticleLink(itemElement, rssType) || '#';
      
      // 根据不同类型解析字段
      if (rssType === 'atom') {
        // Atom 格式解析
        return {
          id: index + 1,
          title: getNestedNodeText(itemElement, ['title']) || '无标题',
          author: getNestedNodeText(itemElement, ['author', 'name']) || '未知作者',
          publishTime: formatDate(getNestedNodeText(itemElement, ['updated']) || getNestedNodeText(itemElement, ['published'])),
          summary: getNestedNodeText(itemElement, ['summary']) || getNestedNodeText(itemElement, ['content']) || '无简介',
          link // 新增：文章链接
        };
      } else {
        // RSS2.0 格式解析
        return {
          id: index + 1,
          title: getNestedNodeText(itemElement, ['title']) || '无标题',
          author: getNestedNodeText(itemElement, ['dc:creator']) || getNestedNodeText(itemElement, ['author']) || '未知作者',
          publishTime: formatDate(getNestedNodeText(itemElement, ['pubDate']) || getNestedNodeText(itemElement, ['dc:date'])),
          summary: getNestedNodeText(itemElement, ['description']) || getNestedNodeText(itemElement, ['summary']) || '无简介',
          link // 新增：文章链接
        };
      }
    });

    // 过滤空文章（避免解析空节点）
    return articles.filter(article => article.title !== '无标题' || article.summary !== '无简介');
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : '解析 RSS 时发生未知错误';
    console.error(`[${rssUrl}] RSS 解析失败:`, errorMsg);
    // 返回错误提示的伪文章（补充 link 字段）
    return [{
      id: 1,
      title: '加载失败',
      author: '',
      publishTime: '',
      summary: errorMsg,
      link: '#' // 新增：兜底链接
    }];
  }
};