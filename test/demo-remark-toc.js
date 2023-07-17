import fs from 'fs';
import remarkToc from 'remark-toc';
import { remark } from 'remark';

const content = fs.readFileSync('./blog/example.md', 'utf-8');

// console.log('pre', content);

async function main() {
  const file = await remark().use(remarkToc).process(content);
  console.log(String(file));
}

main();
