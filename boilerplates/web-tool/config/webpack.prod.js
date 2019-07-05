const path = require('path');
const glob = require('glob');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const packageJson = require('../package');
const fs = require('fs');
const webpackBaseConfig = require('./webpack.rules.js');


fs.open('./config/env.js', 'w', function (err, fd) {
  const buf = 'export default "9";';
  fs.write(fd, buf, 0, 'utf-8', function (err, written, buffer) {
  });
});

/***
 * 获取指定路径下的入口文件
 * @function getEntries
 * @param globPath
 * ***/
function getEntries(globPath) {
  const files = glob.sync(globPath),
    entries = {};
  files.forEach(function (filepath) {
    const split = filepath.split('/');
    const name = split[split.length - 2];
    entries[name] = './' + filepath;
  });
  return entries;
}


/***
 * 获取指定路劲下的html模板
 * @function getTemplate
 * @param globPath
 * ***/
function getTemplate(globPath) {
  const files = glob.sync(globPath),
    entries = [];
  files.forEach(function (filepath, index) {
    const split = filepath.split('/');
    const template = `./${filepath.substring(0, filepath.lastIndexOf('.js'))}.html`
    const name = split[split.length - 2];
    //entries[name] = './' + filepath;
    // console.log(index)
    entries[index] = {};
    entries[index].name = name;
    entries[index].src = './' + filepath;
    entries[index].template = './src/template.html';

  });
  return entries;
}

// const entries = getEntries('src/**/index.js');
const entries = getEntries('src/pages/index.js');
const Template = getTemplate('src/pages/index.js');

let plugin;


/***
 * 生成html 参数配置
 * @function setHtmlPluginConfig
 * ***/

function setHtmlPluginConfig(arrayString) {
  const entryArray = arrayString;
  if (!Array.isArray(entryArray)) {
    // console.log("请确保entry是一个数组")
    return []
  }
  let plugin = [];
  entryArray.map(function (item, index) {
    //console.log('item',item,index)

    plugin.push(
      new htmlWebpackPlugin({
        inject: true,
        chunks: ['main', 'vendor', 'common'],
        //template: temp,
        template: item.template,

        filename: "index.html",
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      })
    );
  });
  return plugin;
}

/***
 * outputHandle
 * @function outputHandle
 * ***/
function outputHandle() {
  const output = {
    path: path.resolve(__dirname, `../dist/${packageJson.name}`),         // 出口文件位置，一定要是绝对路径
    // filename: '[name]/index.[chunkhash].js',      // 出口文件名
    filename: '[name].[chunkhash:8].js',   // 出口文件名
    publicPath: `/${packageJson.name}`
  };
  if (packageJson.domain) {
    //output.publicPath = `//${packageJson.domain}/${packageJson.name}`;
  }
  return output;
}

//生成 html-webpack-plugin 循环参数配置
const htmlPlugin = setHtmlPluginConfig(Template)
const outputJson = outputHandle();


module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  entry: './src/pages/index.js',
  output: outputJson,
  // devtool: 'source-map',
  plugins: [
    ...htmlPlugin,
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  module: {
    strictExportPresence: true
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        // Compression specific options
        uglifyOptions: {
          // Eliminate comments
          comments: false,
          compress: {
            // remove warnings
            warnings: false,
            // Drop console statements
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});
