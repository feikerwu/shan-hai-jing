import * as fs from 'fs';
import * as path from 'path';

async function dirFileToReadme(path: string) {
  const dir = await fs.promises.opendir(path);
  let res = [];
  for await (const dirent of dir) {
    const name = dirent.name.split('.');
    name.pop();
    const nameWithoutFileType = name.join('.');

    const entry = getMarkdownLinkEntry(
      nameWithoutFileType,
      `${path}/${dirent.name}`
    );
    res.push(entry);
  }
  res = res.sort((a, b) => parseInt(a.substring(4)) - parseInt(b.substring(4)));
  res.unshift(`## ${path.substring(2)}\n`);

  return res.join('');
}

async function getReadme() {
  const leetcode = await dirFileToReadme('./docs/algorithm/leetcode');

  let result = [leetcode].join('\n\n');
  await fs.promises.writeFile(
    path.resolve('./docs/algorithm/README.md'),
    result
  );
  process.exit(0);
}

function getMarkdownLinkEntry(name: string, link: string) {
  return `- [${name}](${link})\n`;
}

getReadme();
