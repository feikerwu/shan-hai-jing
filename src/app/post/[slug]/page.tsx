import { allPosts, Post } from 'contentlayer/generated';
import MDXContent from '@/app/components/mdx-content';

// 生成动态路由头部的 slug 信息
export function generateStaticParams() {
  return allPosts.map(post => ({ slug: post._raw.flattenedPath }));
}

type PostPageParams = {
  slug: string;
};

export default function PostPage({ params }: { params: PostPageParams }) {
  const { slug } = params;
  const post = allPosts.find(post => post._raw.flattenedPath === slug) as Post;

  return (
    <article className={'prose lg:prose-xl m-auto'}>
      <MDXContent code={post?.body.code}></MDXContent>
    </article>
  );
}
