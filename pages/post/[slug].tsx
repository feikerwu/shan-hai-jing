import type { NextPage } from 'next';
import { getAllPosts, getPostBySlug } from 'services/blog';
import { MDXRemote } from 'next-mdx-remote';

import type { Post } from 'types';

// 用于替换 mdx-remote 替换出来的 DOM 组件
const components = {};

const Post: NextPage<Post> = ({ content, isMdx }) => {
  return (
    <div>
      <main>
        <MDXRemote {...content} components={components}></MDXRemote>
      </main>
    </div>
  );
};

export default Post;

type Params = {
  params: { slug: string };
};

export async function getStaticProps({ params }: Params) {
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      ...post,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));
  return { paths, fallback: false };
}
