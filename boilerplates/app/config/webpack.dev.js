const path = require('path');
const glob = require('glob');
const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageJson = require('../package');
const fs = require('fs');
const webpackBaseConfig = require('./webpack.rules.js');

fs.open('./config/env.js', 'w', function (err, fd) {
  const buf = 'export default "0";';
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


function getTemplate(globPath) {
  const files = glob.sync(globPath),
    entries = [];
  files.forEach(function (filepath, index) {
    const split = filepath.split('/');
    // const template = `./${filepath.substring(0, filepath.lastIndexOf('.js'))}.html`
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
const entries = getEntries('src/pages/*/index.js');
const Template = getTemplate('src/pages/*/index.js');

let plugin;

/***
 * 生成html 参数配置
 * @function setHtmlPluginConfig
 * ***/

function setHtmlPluginConfig(arrayString) {
  const entryArray = arrayString;
  if (!Array.isArray(entryArray)) {
    // console.log("请确保entry是一个数组")
    return [];
  }
  let plugin = [];
  entryArray.map(function (item, index) {
    //console.log('item',item,index)

    plugin.push(
      new htmlWebpackPlugin({
        inject: true,
        chunks: [item.name, 'vendor', 'common'],
        //template: temp,
        template: item.template,

        filename: item.name + "/index.html",
        minify: {
          removeComments: true,
          collapseWhitespace: false,
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
    filename: '[name].[chunkhash].js'     // 出口文件名
  };
  if (packageJson.domain) {
    //output.publicPath = `//dev.${packageJson.domain}/${packageJson.name}`;
  }
  return output;
}

//生成 html-webpack-plugin 循环参数配置
const htmlPlugin = setHtmlPluginConfig(Template);
const outputJson = outputHandle();
console.log(outputJson)

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  entry: entries,
  output: outputJson,                                             // 出口文件
  devServer: {
    port: 8888,             // 监听端口
    compress: true,         // gzip压缩
    https: false,             //配置https
    publicPath: '/'
  },
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
  }
});
