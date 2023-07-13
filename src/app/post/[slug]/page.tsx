import { allPosts } from 'contentlayer/generated';

// 生成动态路由头部的 slug 信息
export function generateStaticParams() {
  return allPosts.map(post => ({ slug: post._raw.flattenedPath }));
}

type PostPageParams = {
  slug: string;
};

export default function PostPage({
  params,
  ...rest
}: {
  params: PostPageParams;
}) {
  console.log(params);
  console.log(rest);

  const { slug } = params;

  return <div>{slug}</div>;
}
