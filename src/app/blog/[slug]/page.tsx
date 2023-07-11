import { getPostContentBySlug } from '@/utils/markdown';
// 可以替换掉 mdx 中的组件

import Article from './article';

export default function BlogPost({
  params,
  ...rest
}: {
  params: { slug: string };
}) {
  console.log(params, rest);

  const { content } = getPostContentBySlug(params.slug);

  return <Article content={content}></Article>;
}
