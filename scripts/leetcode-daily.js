const fs = require('fs');
const handlebars = require('handlebars');
const dayjs = require('dayjs');
const path = require('path');

const link = process.argv[2];

let paths = link.split('/');

const problem = paths[paths.length - 2];

if (!problem) {
  throw new Error(`Bad Link`);
}

const template = handlebars.compile(
  fs.readFileSync(path.resolve(__dirname, './leetcode-daily.template'), 'utf8')
);

let fileContent = template({
  title: `leetcode - daily - ${problem}`,
  date: dayjs().format('YYYY-MM-DD'),
  link,
});

const filename = `${dayjs().format('MM.DD')}_${problem}.md`;
const filepath = path.resolve(
  process.cwd(),
  'content/algorithm/daily/2021',
  filename
);

fs.writeFileSync(filepath, fileContent);
