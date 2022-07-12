import type { NextPage } from 'next';

const Post: NextPage = ({}) => {
  return <div></div>;
};

export default Post;

type Params = {
  params: { slug: string };
};
export async function getStaticProps({ params }: Params) {
  return {
    props: {},
  };
}
