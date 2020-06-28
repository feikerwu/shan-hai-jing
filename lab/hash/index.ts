import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const HASH_ALGORITHM = 'sha256';
const filename = path.join(__dirname, './index.ts');

const hash = crypto.createHash(HASH_ALGORITHM);

fs.promises.readFile(filename).then((chuck) => {
  console.log(chuck.toString());
  hash.update(chuck);
  console.log(`${hash.digest('hex')} ./index.ts`);
});
