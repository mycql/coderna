const fs = require('fs');
const pug = require('pug');
const yaml = require('js-yaml');
const sass = require('node-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const templatesPath = './src/templates/';
const dataPath = './src/data/';
const stylesPath = './src/styles/styles.scss';

function render(targetPath) {
  console.info('Compiling Sass files...');
  sass.render({
    file: stylesPath,
    outputStyle: 'compressed'
  }, (sassError, sassResult) => {
    if (sassError) {
      console.error(sassError.status);
      console.error(sassError.column);
      console.error(sassError.message);
      console.error(sassError.line);
    } else {
      console.info('Sass done.');
      const css = sassResult.css.toString();
      console.info('Running PostCSS...');
      postcss([autoprefixer]).process(css).then((postcssResult) => {
        console.info('PostCSS done.');
        console.info('Rendering templates ...');
        try {
          const data = yaml.safeLoad(fs.readFileSync(`${dataPath}resume.yml`, 'utf8'));
          data.styles = postcssResult.css;
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
      }, (postcssError) => {
        console.error('Error in PostCSS.');
        console.error(postcssError);
      });
    }
  });
}

module.exports = {
  render,
  templatesPath,
  dataPath
};
