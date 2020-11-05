const prefix = '[';
const postfix = ']';
const MAX_CHARS = 100;

function render(precent: number) {
  const arrowNumber = ~~(MAX_CHARS * precent);
  const bar = '>'.repeat(arrowNumber) + ' '.repeat(MAX_CHARS - arrowNumber);
  const curProcessbar = `${prefix}${bar}${postfix}`;
  console.log('\x1bc');
  console.log(curProcessbar);
}

let cur = 0;
const timer = setInterval(() => {
  if (cur >= 100) {
    clearInterval(timer);
  }
  cur++;
  render(cur / 100);
}, 100);
