const fs = require('fs');
const path = require('path');

const dailyDir = path.resolve(process.cwd(), 'content/algorithm/daily/2021');

let dir = fs.readdirSync(dailyDir);

let dailyFiles = [],
  count = 1;

for (let file of dir) {
  let content = fs.readFileSync(path.resolve(dailyDir, file), 'utf8');
  // console.log(content)
  let title = content.match(/title:(.*)\n/)[1].trim();
  dailyFiles.push(`${count++}. [${title}](./2021/${file}) `);
}

const finalMarkDown = dailyFiles.join('\n');

fs.writeFileSync(path.resolve(dailyDir, '../README.md'), finalMarkDown);
