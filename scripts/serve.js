const pug = require('pug');
const fs = require('fs');
const rimraf = require('rimraf');
const bs = require('browser-sync').create();

const assetsPath = './assets';
const buildPath = './build';
const templatesPath = './src/templates/';
const indexFilePath = './build/index.html';

initBuild();

// Now init the Browsersync server
bs.init({
  server: {
    baseDir: buildPath,
    routes: {
      '/assets': assetsPath
    }
  },
  files: [
    indexFilePath,
    {
      match: [templatesPath + '*.pug'],
      fn: function (event, file) {
        if (event === 'change') {
          compile();
        }
      }
    }
  ]
});

function initBuild() {
  fs.mkdirSync(buildPath);
  compile();
}


function compile() {
  console.info('Compiling templates ...');
  const html = pug.renderFile(templatesPath + 'index.pug', { pretty: true });
  console.info('Done.');
  console.info('Generating index file ...');
  fs.writeFileSync(indexFilePath, html, { encoding: 'UTF-8' });
  console.info('Done.');
}
