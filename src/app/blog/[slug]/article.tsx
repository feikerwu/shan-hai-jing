'use client';

import { MDXProvider } from '@mdx-js/react';

// 可以替换掉 mdx 中的组件
const components = {};

export default function BlogPost({ content }: { content: string }) {
  return (
    <MDXProvider components={components}>
      <article>{content}</article>
    </MDXProvider>
  );
}
