// 用于承载mdx的内容
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';

type MDXContentProps = {
  code: string;
  components?: MDXComponents;
};

export default function MDXContent({ code, components = {} }: MDXContentProps) {
  const ParsedMDXContent = useMDXComponent(code);
  return <ParsedMDXContent components={components}></ParsedMDXContent>;
}
