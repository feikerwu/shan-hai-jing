import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { s } from 'hastscript';
import remarkToc from 'remark-toc';
// rehypeSlug 自动解析html的heading标签，生成id
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: post => `/post/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'blog',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [
      /**
       * 添加 markdown 的 toc 支持
       */
      remarkToc,
    ],
    rehypePlugins: [
      rehypeSlug,
      // 在标题后面插入锚点，锚点以井号符实现
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          test: ['h1', 'h2', 'h3'],
          content: s(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 24 24',
              width: '24',
              height: '24',
              fill: 'none',
              stroke: 'currentColor',
              'stroke-width': '2',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'aria-label': 'anchor',
              class: 'inline',
            },
            [
              s('line', { x1: '4', y1: '9', x2: '20', y2: '9' }),
              s('line', { x1: '4', y1: '15', x2: '20', y2: '15' }),
              s('line', { x1: '10', y1: '3', x2: '8', y2: '21' }),
              s('line', { x1: '16', y1: '3', x2: '14', y2: '21' }),
            ]
          ),
        },
      ],
      rehypePrettyCode,
    ],
  },
});
