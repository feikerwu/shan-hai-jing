import type { NextPage } from 'next';
import { getAllPosts, getPostBySlug } from 'services/blog';
import Markdown from 'components/Markdown';

import markdownToHtml from 'utils/markdown';
import type { Post } from 'types';

const Post: NextPage<Post> = ({ content }) => {
  return (
    <div>
      <Markdown content={content}></Markdown>
    </div>
  );
};

export default Post;

type Params = {
  params: { slug: string };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug);

  // post.content = await markdownToHtml(post.content);

  return {
    props: {
      ...post,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));
  return { paths, fallback: false };
}
