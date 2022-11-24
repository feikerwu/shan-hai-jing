/**
 * 获取博客内容
 */
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { Post } from 'types';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const blogDirs = join(process.cwd(), './content/blog');

/**
 * 获取所有的 markdown 文件名
 */
export function getPostSlugs() {
  return fs.readdirSync(blogDirs).map(file => file.replace(/\.mdx?$/, ''));
}

const descLimit = 100;

const excerptFile = (file: any) => {
  file.excerpt = file.content.split('\n').slice(0, 4).join(' ');
  return file.excerpt;
};

// 通过文件名获取到 markdown 内容
export function getPostBySlugWithMd(slug: string): Post {
  const fullFilePath = join(blogDirs, `${slug}.md`);
  const fileContent = fs.readFileSync(fullFilePath, 'utf8');

  const { data, content, excerpt } = matter(fileContent, {
    excerpt: excerptFile,
  });

  const result = {
    isMdx: false,
    date: +new Date(),
    title: slug,
    desc: excerpt,
    content,
    slug,
    ...data,
  };

  // Date 对象在next的page里序列化会报错
  result.date = +new Date(result.date);

  return result;
}

// 通过文件名的获取到 mdx 内容
export async function getPostBySlugWithMdx(slug: string): Promise<Post> {
  const path = join(blogDirs, `${slug}.mdx`);
  const source = fs.readFileSync(path);

  const { content, data, excerpt } = matter(source, { excerpt: excerptFile });

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    },
  });

  return {
    isMdx: true,
    date: +new Date(),
    title: path,
    desc: excerpt,
    content: mdxSource,
    slug,
    ...data,
  };
}

export async function getPostBySlug(slug: string) {
  const mdxPath = join(blogDirs, `${slug}.mdx`);
  return fs.existsSync(mdxPath)
    ? await getPostBySlugWithMdx(slug)
    : getPostBySlugWithMd(slug);
}

export async function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = [];
  for (let slug of slugs) {
    let post = await getPostBySlug(slug);
    posts.push(post);
  }

  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
