import fsPromise from 'node:fs/promises';
import fs from 'node:fs';
import dayjs from 'dayjs';

import path from 'node:path';
// import chalk from 'chalk';

const TagReg = /(^|\sst)#[\w\\]+/g;
const allFilesNeedFiller = ['#blog'];
const backupDir = path.join(process.cwd(), '.backup');

const filter = (name: string, path: string) =>
  name.endsWith('.md') && !/daily|Excalidraw/.test(path);

const getFileTags = (content: string): string[] => {
  // TODO: 优化正则，匹配全局
  let tags: string[] = [];
  let lines = content.split('\n');
  for (let line of lines) {
    let curTags = line.match(TagReg) || [];
    tags = [...tags, ...curTags];
  }

  if (tags.length) {
    console.log(tags);
  }

  return tags;
};

function intersection<T = String>(A: T[], B: T[]) {
  return A.filter(item => B.includes(item));
}

function copyDir(source: string, target: string) {
  if (!fs.existsSync(source)) {
    throw new Error(`${source} not exist`);
  }

  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    fs.rmSync(target, { recursive: true });
  }

  fs.mkdirSync(target);

  const files = fs.readdirSync(source);
  files.forEach(file => {
    const sourceFile = path.join(source, file);
    const targetFile = path.join(target, file);

    if (fs.statSync(sourceFile).isDirectory()) {
      copyDir(sourceFile, targetFile);
    } else {
      fs.copyFileSync(sourceFile, targetFile);
    }
  });
}

function getMarkdownMetaData(content: string) {
  const metadataReg = /^---\n([\s\S]*?)\n---/;
  const match = content.toString().match(metadataReg);
  if (match && match[1]) {
    let metadataStr = match[1];
    const metadata: Record<string, string> = {};
    const lines = metadataStr.split('\n');
    for (let line of lines) {
      const [key, value] = line.split(':');
      if (key && value) {
        metadata[key.trim()] = value.trim();
      }
    }

    return metadata;
  }
  return {};
}

type FileType = {
  name: string;
  path: string;
  tags: string[];
  // 文件的更新时间，由于在当前仓库的content中，md 文件每次都会被重新生成，所以需要保存在 obsidian 内的更新时间
  updateTime: string;
};

// 获取到所有的markdown文件
async function getAllMarkdownFiles(entry: string) {
  const allFiles: FileType[] = [];

  const getCurFiles = async (file: string) => {
    const contents = await fsPromise.readdir(file, { withFileTypes: true });

    for (let content of contents) {
      const curFilePath = `${file}/${content.name}`;
      // 排除所有以.开始的文件，比如 .obsidian
      if (content.name.startsWith('.')) {
        continue;
      }

      if (content.isDirectory()) {
        await getCurFiles(curFilePath);
      } else if (filter(content.name, curFilePath)) {
        // 如果是具体文件，从文件内容中获取到所有的tag
        const fileContent = await fsPromise.readFile(curFilePath);
        const stat = await fsPromise.stat(curFilePath);

        allFiles.push({
          name: content.name,
          path: curFilePath,
          tags: getFileTags(fileContent.toString()),
          updateTime: dayjs(stat.mtime).format('YYYY-MM-DD'),
        });
      }
    }
  };

  await getCurFiles(entry);

  return allFiles;
}

// 根据入口生成的文件类型生成目标文件
async function generateFiles(files: FileType[], distDir: string) {
  /**
   * 1. 目标文件生成缓存
   */
  copyDir(distDir, backupDir);

  /**
   * 2. 清空目标文件
   */
  fs.readdirSync(distDir).forEach(file =>
    fs.rmSync(path.join(distDir, file), { recursive: true })
  );

  /**
   * 3. 生成目标文件
   */

  for (let file of files) {
    const content = fs.readFileSync(file.path, { encoding: 'utf-8' });

    let contentRemoveTags = content.replace(TagReg, '');

    const metadata = {
      tags: file.tags.join(','),
      date: file.updateTime,
      title: file.name.replace('.md', ''),
      ...getMarkdownMetaData(content),
    };

    const front = [
      '---',
      ...Object.entries(metadata).map(([key, value]) => `${key}: ${value}`),
      '---',
    ].join('\n');

    contentRemoveTags = `${front}\n\n${contentRemoveTags}`;

    /**
     * todo: 删除双链文件
     */
    fs.writeFileSync(path.join(distDir, file.name), contentRemoveTags, {
      encoding: 'utf-8',
    });
  }
}

// 筛选出所有符合条件的内容
async function run() {
  const result = await getAllMarkdownFiles(`second-brain`);

  const filterResult = result.filter(
    item => intersection(item.tags, allFilesNeedFiller).length
  );

  fsPromise.writeFile('./output.json', JSON.stringify(filterResult), {
    encoding: 'utf-8',
  });

  await generateFiles(
    filterResult,
    path.join(process.cwd(), 'src/app/content/blog')
  );
}

run();

// console.log(process.cwd());
