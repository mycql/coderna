const fs = require('fs');
const pug = require('pug');
const yaml = require('js-yaml');
const templatesPath = './src/templates/';
const dataPath = './src/data/';

function render(targetPath) {
  console.info('Rendering templates ...');
  try {
    const data = yaml.safeLoad(fs.readFileSync(`${dataPath}resume.yml`, 'utf8'));
    const compileFn = pug.compileFile(`${templatesPath}main/index.pug`, { pretty: true });
    const html = compileFn(data);
    console.info('Done.');
    console.info('Generating index file ...');
    fs.writeFileSync(targetPath, html, { encoding: 'UTF-8' });
    console.info('Done.');
  } catch (e) {
    console.error('Error while rendering template.');
    console.error(e);
  }
}

module.exports = {
  render: render,
  templatesPath: templatesPath
};
