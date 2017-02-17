const pug = require('pug');
const fs = require('fs');
const templatesPath = './src/templates/';

function render(targetPath) {
  console.info('Rendering templates ...');
  const html = pug.renderFile(templatesPath + 'index.pug', { pretty: true });
  console.info('Done.');
  console.info('Generating index file ...');
  fs.writeFileSync(targetPath, html, { encoding: 'UTF-8' });
  console.info('Done.');
}

module.exports = {
  render: render,
  templatesPath: templatesPath
};
