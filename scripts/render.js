const fs = require('fs');
const pug = require('pug');
const yaml = require('js-yaml');
const sass = require('node-sass');
const templatesPath = './src/templates/';
const dataPath = './src/data/';
const stylesPath = './src/styles/styles.scss';

function render(targetPath) {
  console.info('Compiling styles...');
  sass.render({
    file: stylesPath,
    outputStyle: 'compressed'
  }, (error, result) => {
    if (error) {
      console.error(error.status);
      console.error(error.column);
      console.error(error.message);
      console.error(error.line);
    } else {
      console.info('Styles done.');
      console.info('Rendering templates ...');
      try {
        const data = yaml.safeLoad(fs.readFileSync(`${dataPath}resume.yml`, 'utf8'));
        data.styles = result.css.toString();
        const compileFn = pug.compileFile(`${templatesPath}main/template.pug`, { pretty: true });
        const html = compileFn(data);
        console.info('Templates Done.');
        console.info('Generating index file ...');
        fs.writeFileSync(targetPath, html, { encoding: 'UTF-8' });
        console.info('Index File Done.');
      } catch (e) {
        console.error('Error while rendering template.');
        console.error(e);
      }
    }
  });
}

module.exports = {
  render,
  templatesPath,
  dataPath
};
