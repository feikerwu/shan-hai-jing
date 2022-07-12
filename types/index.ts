// 单篇博文的类型
export type Post = {
  title: string;
  slug: string;
  desc: string;
  content: string;
  date: string;
  tags?: string[];
};
