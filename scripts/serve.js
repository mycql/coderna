const fs = require('fs');
const bs = require('browser-sync').create();
const renderer = require('./render.js');

const assetsPath = './assets';
const buildPath = './build';
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
      match: [renderer.templatesPath + '**/*.pug'],
      fn: function (event, file) {
        if (event === 'change') {
          renderer.render(indexFilePath);
        }
      }
    }
  ]
});

function initBuild() {
  fs.mkdirSync(buildPath);
  renderer.render(indexFilePath);
}
