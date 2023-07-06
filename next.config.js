/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
});

module.exports = withMDX(nextConfig);
