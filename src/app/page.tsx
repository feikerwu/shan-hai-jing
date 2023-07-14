import path from 'node:path';
import Link from 'next/link';

import { allPosts, Post } from 'contentlayer/generated';
import dayjs from 'dayjs';

function PostCard(post: Post) {
  return (
    <div className='mb-8'>
      <div className='text'>
        <Link
          href={post.url}
          className='text-blue-700 hover:text-blue-900 dark:text-blue-400'
        >
          {post.title}
        </Link>
        <time
          dateTime={dayjs(post.date).format('YYYY-MM-DD')}
          className='mb-2 text-xs text-gray-600 inline ml-2'
        >
          {dayjs(post.date).format('YYYY-MM-DD')}
        </time>
      </div>
    </div>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    dayjs(a.date).isBefore(b.date) ? 1 : -1
  );

  return (
    <div className='mx-auto max-w-xl py-8'>
      <h1 className='mb-8 text-center text-2xl font-black'>
        feiker 的编程日志
      </h1>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
