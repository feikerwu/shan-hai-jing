import fs from 'fs';
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';

const content = fs.readFileSync('./blog/example.md', 'utf-8');

// console.log('pre', content);

async function main() {
  const file = await remark().use(remarkFrontmatter).process(content);
  console.log(String(file));
}

main();
