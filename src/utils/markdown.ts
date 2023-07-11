import fs from 'node:fs';
import path, { parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

export type Post = {
  content: string;
  title: string;
  tags: string;
  date: string;
  path: string;
  slug: string;
};

let cached: Post[] = [];
/**
 * 获取到所有的博客markdown文件列表
 */
export function getFiles(dir: string): Post[] {
  if (cached && cached.length) {
    return cached;
  }

  const files = fs.readdirSync(dir);

  let allPosts = files.map(file => {
    return {
      slug: file.replace(/.md(x)?/, ''),
      path: path.resolve(dir, file),
      ...getMarkdownMetaData(path.resolve(dir, file)),
    } as Post;
  });

  console.log(allPosts.map(a => a.slug));

  cached = allPosts;

  return allPosts;
}

/**
 * 通过 gray-matter 解析 markdown 文件生成文件内容以及元数据
 * @returns
 */
export function getMarkdownMetaData(path: string) {
  const fileContent = fs.readFileSync(path);
  const parsedFile = matter(fileContent, {
    // 可以考虑使用 AI 工具对内容进行解析，然后生成摘要
    excerpt: true,
  });

  return {
    content: parsedFile.content,
    ...parsedFile.data,
  };
}

export function getPostContentBySlug(slug: string) {
  const allPosts = getFiles(
    path.resolve(process.cwd(), 'src/app/content/blog')
  );
  const post = cached.find(post => post.slug === slug);

  if (!post) {
    throw new Error(`找不到文件 ${slug}`);
  }

  return post;
}
