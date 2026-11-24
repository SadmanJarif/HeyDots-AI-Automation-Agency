import { BlogPost } from './blogTypes';
import { US_AGENCY_BLOG_POSTS } from './blogPostsUS';
import { AGENTS_AND_WORKFLOW_BLOG_POSTS } from './blogPostsAgents';
import { SAAS_DEV_BLOG_POSTS } from './blogPostsSaas';
import { GROWTH_PLAYBOOK_BLOG_POSTS } from './blogPostsGrowth';

export * from './blogTypes';

export const BLOG_POSTS: BlogPost[] = [
  ...US_AGENCY_BLOG_POSTS,
  ...AGENTS_AND_WORKFLOW_BLOG_POSTS,
  ...SAAS_DEV_BLOG_POSTS,
  ...GROWTH_PLAYBOOK_BLOG_POSTS,
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(currentPost: BlogPost, count = 3): BlogPost[] {
  const sameCategory = BLOG_POSTS.filter(
    (p) => p.id !== currentPost.id && p.category === currentPost.category
  );
  const otherCategory = BLOG_POSTS.filter(
    (p) => p.id !== currentPost.id && p.category !== currentPost.category
  );
  return [...sameCategory, ...otherCategory].slice(0, count);
}
