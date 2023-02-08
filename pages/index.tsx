import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { getAllPosts } from 'services/blog';
import dayjs from 'dayjs';

import type { Post } from 'types';

type ListPageProps = {
  allPosts: Post[];
};

const PostList: NextPage<ListPageProps> = ({ allPosts }) => {
  return (
    <div>
      {allPosts.map(post => (
        <PostItem {...post} key={post.slug}></PostItem>
      ))}
    </div>
  );
};

const PostItem: React.FC<Post> = ({ slug, date, title, desc, tags }) => {
  return (
    <div className='flex items-end my-2'>
      <Link href={`/post/${slug}`}>
        <div className='text-lg font-medium pr-4'>
          <a>{title}</a>
        </div>
      </Link>

      <div className='text-sm text-zinc-900 pb-0.5'>
        {dayjs(date).format('YYYY-MM-DD')}
      </div>

      {/* <p className={styles.desc}> */}
      {/* {desc} */}
      {/* <Markdown content={desc}></Markdown> */}
      {/* </p> */}
    </div>
  );
};

export default PostList;

export async function getStaticProps() {
  const allPosts = await getAllPosts();
  allPosts.forEach(item => {
    item.date = Number(item.date);
  });
  return {
    props: { allPosts },
  };
}
