const MAX_CHARS = 40;

function render(precent: number) {
  const arrowNumber = ~~(MAX_CHARS * precent);
  const bar =
    '\x1b[31m' +
    '▓'.repeat(arrowNumber) +
    '\x1b[34m' +
    '░'.repeat(MAX_CHARS - arrowNumber);
  const curProcessbar = `\x1b[1A\x1b[2K${bar} ${Math.floor(precent * 100)}%`;
  console.log(curProcessbar);
}

let cur = 0;
const timer = setInterval(() => {
  if (cur >= 100) {
    clearInterval(timer);
    return;
  }
  cur++;
  render(cur / 100);
}, 16);
