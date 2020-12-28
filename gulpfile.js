const {src, dest, watch, lastRun} = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass");
const pug = require("gulp-pug");
const browserSync = require("browser-sync");
var packageImporter = require('node-sass-package-importer');

var paths = {
  'root': '.',
  'scss': 'src/scss/',
  'css': 'assets/css/',
  'js': 'assets/js',
  'pug': 'src/pug/',
  'html': './',
  'assets': 'assets/'
}

// Sassのコンパイル
const compileSass = () =>
  // style.scssファイルを取得
  src([paths.scss + "**/*.scss", "!" + paths.scss + "**/_*.scss"])
  .pipe(
    sass({
      outputStyle: "expanded",
      importer: packageImporter({
        extensions: ['.scss', '.css']
      })
    })
  )
  .pipe(dest(paths.css));

// Pugのコンパイル
const compilePug = () =>
  src([paths.pug + "**/*.pug", "!" + paths.pug + "**/_*.pug"])
      .pipe(
        pug({
          pretty: true
        })
      )
      .pipe(dest(paths.html));


// Sass,Pugファイルの監視
const watchSrcFiles = () => {
  watch(paths.pug + '**/*.pug', compilePug);
  watch(paths.scss + '**/*.scss', compileSass);
  watch(paths.pug + '**/_*.scss', compileSass);
}

// Browser Sync
const taskServer = () =>
  browserSync.init({
    server: {
			//ルートディレクトリの指定
      baseDir: paths.root,
      index: "index.html",
    }
    
  });

  // ファイルをgzipに圧縮する


const reload = (done) =>  {
  browserSync.reload();
  done();
}



  watch(paths.html + "**/*.html", reload);
  // watch(paths.html + "**/_*.pug", reload);
  // watch(paths.scss + "**/_*.scss", reload);
  watch(paths.css + "**/*.css", reload);
  // watch(paths.assets + "**/*", compressGzip);
  // watch(paths.css + "**/*.css", compressGzip);
  // watch(paths.html + "**/*.html", compressGzip);
  // watch(paths.js + "**/*.js", compressGzip);

exports.default = () =>
  watchSrcFiles ();
  taskServer();