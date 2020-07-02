const fs = require('fs');
const path = require('path');
const babylon = require('@babel/parser');
// const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

function run(input, output) {
  const content = fs.readFileSync(path.resolve(__dirname, input), {
    encoding: 'utf8',
  });
  console.log({ content });
  const ast = babylon.parse(content, {
    sourceType: 'module',
  });

  const { code } = babel.transformFromAstSync(ast, null, {
    plugins: ['transform-commonjs'],
  });

  fs.writeFileSync(path.resolve(__dirname, output), code);

  console.log({ code });
}

run('./b.js', './output.js');
