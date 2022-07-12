import type { NextPage } from 'next';
import { getAllPosts, getPostBySlug } from 'services/blog';
import markdownToHtml from 'utils/markdown';

const Post: NextPage<Post> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
};

export default Post;

type Params = {
  params: { slug: string };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug);

  post.content = await markdownToHtml(post.content);

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
