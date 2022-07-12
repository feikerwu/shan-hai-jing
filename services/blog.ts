/**
 * 获取博客内容
 */
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { partial } from 'utils';

const blogDirs = join(process.cwd(), './content/blog');

/**
 * 获取所有的 markdown 文件名
 */
export function getPostSlugs() {
  return fs.readdirSync(blogDirs).map(file => file.replace(/\.md$/, ''));
}

const descLimit = 100;

export function getPostBySlug(slug: string) {
  const fullFilePath = join(blogDirs, `${slug}.md`);
  const fileContent = fs.readFileSync(fullFilePath, 'utf8');
  const { data, content } = matter(fileContent);

  const result = {
    date: +new Date(),
    title: slug,
    desc: content.slice(0, descLimit) || null,
    content,
    slug,
    ...data,
  };

  result.date = +result.date;

  return result;
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  return posts;
}
