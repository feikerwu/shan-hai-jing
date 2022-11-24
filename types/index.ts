// 单篇博文的类型
export type Post = {
  title: string;
  slug: string;
  desc?: string;
  // MD 或者 MDX 的文件内容
  content: any;
  date: Date | number;
  tags?: string[];
} & Record<string, any>;
