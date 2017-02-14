const pug = require('pug');
const fs = require('fs');
const options = {
  pretty: true
};
console.info('Compiling templates ...');
const html = pug.renderFile('src/templates/index.pug', options);
console.info('Done.');
console.info('Generating index file ...');
fs.writeFileSync('index.html', html, { encoding: 'UTF-8' });
console.info('Done.');
