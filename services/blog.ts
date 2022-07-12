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
  return fs.readdirSync(blogDirs);
}

const mustNeededFields = ['title', 'date', 'desc'];
const descLimit = 100;

export function getPostBySlug(slug: string, fileds = mustNeededFields) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullFilePath = join(blogDirs, slug);
  console.log(fullFilePath);
  const fileContent = fs.readFileSync(fullFilePath, 'utf8');
  const { data, content } = matter(fileContent);

  const result = {
    date: +new Date(),
    title: slug,
    desc: content.slice(0, descLimit),
    ...partial(data, fileds),
    content,
    slug,
  };

  result.date = +result.date;

  return result;
}

export function getAllPosts(fields: string[]) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug, fields))
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  return posts;
}
