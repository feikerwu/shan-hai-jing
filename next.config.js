/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

const withMDX = require('@next/mdx')({
  options: {
    providerImportSource: '@mdx-js/react',
  },
  extension: /\.(md|mdx)$/,
});

module.exports = withMDX(nextConfig);
