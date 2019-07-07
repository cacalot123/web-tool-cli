const path = require('path');
const glob = require('glob');
const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const vConsolePlugin = require('vconsole-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpackBaseConfig = require('./webpack.rules.js');
const packageJson = require('../package');

const port = 8888;

fs.open('./config/env.js', 'w', function (err, fd) {
  if (process.env.thisEnv === 'dev') { //dev本地环境
    const buf = 'export default "0";';
    fs.write(fd, buf, 0, 'utf-8', function (err, written, buffer) {
    });
  }
  if (process.env.thisEnv === 'test') { //测试环境
    const buf = 'export default "7";';
    fs.write(fd, buf, 0, 'utf-8', function (err, written, buffer) {
    });
  }

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
    return [];
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

        filename: 'index.html',
        EVNTest: true,
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
    path: path.resolve(__dirname, `../dist/${packageJson.name}`), //出口文件位置，一定要是绝对路径
    // filename: '[name]/index.[chunkhash].js',      // 出口文件名
    filename: '[name].[chunkhash:8].js' //出口文件名
  };
  if (process.env.thisEnv === 'dev') { //dev本地环境
    output.publicPath = '/';
  }
  if (process.env.thisEnv === 'test') { //测试环境
    output.publicPath = `/${packageJson.name}`;
  }
  if (packageJson.domain) {
    //output.publicPath = `//dev.${packageJson.domain}/${packageJson.name}`;
  }
  return output;
}

//生成 html-webpack-plugin 循环参数配置
const htmlPlugin = setHtmlPluginConfig(Template);
const outputJson = outputHandle();
module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  // entry: entries,
  // entry: './src/pages/index.',

  entry: {
    main: './src/pages/index.js',
    // vendor: ['react', 'react-dom', 'react-router-dom']
  },
  output: outputJson,                                             // 出口文件
  devServer: {
    port,             // 监听端口
    compress: true,         // gzip压缩
    https: false,             //配置https
    publicPath: '/',
    host: '0.0.0.0',
    historyApiFallback: {
      index: '/src/404.html',
      rewrites: [
        {from: /^\//, to: '/index.html'}
      ]
      // rewrites: [
      //   {from: /^\/pages/, to: '/pages'},
      //   {from: /^\/find/, to: '/find'}
      // ]
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3100',
        changeOrigin: true,
        pathRewrite: {
          '^api': '/api'
        }
      }
    }
  },
  plugins: [
    ...htmlPlugin,
    new vConsolePlugin({
      filter: [], // 需要过滤的入口文件
      enable: true // vconsole 开启
    }),
    new OpenBrowserPlugin({ url: `http://localhost:${port}/${packageJson.name}/index` })

    // new MiniCssExtractPlugin({  //css独立打包
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: '[name].css',
    //   chunkFilename: '[id].css'
    // })
  ],
  module: {
    strictExportPresence: true
  }
});
