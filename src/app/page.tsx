import HelloWorld from './content/blog/cache-lock.mdx';
import fs from 'node:fs';
import path from 'node:path';

import { getFiles } from '@/utils/markdown';

getFiles('src/app/content/blog');

async function getAllPosts() {
  const files = fs.readdirSync(
    path.resolve(path.resolve(), 'src/app/content/blog')
  );
  console.log(files);
  return files;
}

export default async function Page() {
  let files = await getAllPosts();
  return (
    <div>
      {files.map(file => (
        <div key={file}>{file}</div>
      ))}
    </div>
  );
}
