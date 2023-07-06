import HelloWorld from './content/blog/cache-lock.mdx';
import path from 'node:path';
import Link from 'next/link';

import { getFiles } from '@/utils/markdown';
import type { Post } from '@/utils/markdown';

function getBlogLink(post: Post) {
  const href = `blog/${post.slug}`;
  return (
    <Link href={href} key={post.slug}>
      {post.title}
    </Link>
  );
}

function getBlogLinkItem(post: Post) {
  return <div>{getBlogLink(post)}</div>;
}

export default async function Page() {
  let files = getFiles(path.resolve('src/app/content/blog'));

  return <div>{files.map(file => getBlogLinkItem(file))}</div>;
}
