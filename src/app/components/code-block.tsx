'use client';

import { FunctionComponent } from 'mdx/types';

// 代码块组件，需要后续继续做一些处理
function CodeBlock({ children }: { children: React.ReactNode }) {
  return <pre>{children}</pre>;
}

export default CodeBlock as FunctionComponent<JSX.IntrinsicElements['pre']>;
