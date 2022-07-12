import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { getAllPosts } from 'services/blog';
import dayjs from 'dayjs';
import styles from 'styles/post.module.css';
import Markdown from 'components/Markdown';

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
    <div className={styles.item}>
      <Link href={`/post/${slug}`}>
        <h2>
          <a>{title}</a>
        </h2>
      </Link>
      <div className={styles.date}>{dayjs(date).format('YYYY-MM-DD')}</div>
      <p className={styles.desc}>
        {desc}
        {/* <Markdown content={desc}></Markdown> */}
      </p>
    </div>
  );
};

export default PostList;

export async function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: { allPosts },
  };
}
