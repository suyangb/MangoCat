// src/utils/github.ts
export interface GithubRepoStats {
  stars: number;
  forks: number;
  openIssues?: number;
}
/**
 * 获取 GitHub 仓库统计信息（适配 Astro）
 * @param owner 仓库所有者（如 vuejs）
 * @param repo 仓库名（如 vue）
 * @returns 统计数据 | null
 */
export async function getGithubRepoStats(
  owner: string,
  repo: string
): Promise<GithubRepoStats | null> {
  const url = `https://api.github.com/repos/${owner}/${repo}`;

  try {
    // Astro 内置 fetch（兼容 Node.js/浏览器，无需额外依赖）
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Astro App", // GitHub API 必须的 User-Agent
      },
      // 缓存策略（SSG 模式下缓存，避免重复请求）
      next: { revalidate: 3600 }, // 1 小时重新验证一次
    });

    if (!response.ok) {
      throw new Error(`GitHub API 请求失败: ${response.status}`);
    }

    const data = await response.json();
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      openIssues: data.open_issues_count,
    };
  } catch (error) {
    console.error(`获取 ${owner}/${repo} 统计失败:`, error);
    return null;
  }
}