import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { getAllPosts } from 'services/blog';

type ListPageProps = {
  allPosts: Post[];
};

const PostList: NextPage<ListPageProps> = ({ allPosts }) => {
  console.log(allPosts);
  return (
    <div>
      {allPosts.map(post => (
        <Link href={`/post/${post.slug}`} key={post.slug}>
          {
            <a href={`/post/${post.slug}`} key={post.slug}>
              {post.title}
            </a>
          }
        </Link>
      ))}
    </div>
  );
};

export default PostList;

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug']);
  return {
    props: { allPosts },
  };
}
