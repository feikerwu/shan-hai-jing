import Image from 'next/image';
// import type { FunctionComponent } from 'mdx/types';
import type { MDXComponents, FunctionComponent } from 'mdx/types';
import CodeBlock from '@/app/components/code-block';

function pre({
  children,
}: {
  children: React.ReactNode;
}): React.HTMLProps<HTMLPreElement> {
  return <CodeBlock>{children}</CodeBlock>;
}

// 替换掉 mdx 中被解析的所有原生组件
const mdxComponents: MDXComponents = {
  pre: pre as FunctionComponent<JSX.IntrinsicElements['pre']>,
};

export default mdxComponents;
