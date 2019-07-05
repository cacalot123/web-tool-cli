// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const theme = require('../theme.js');

module.exports = {
  optimization: {//包清单
    // runtimeChunk: {
    //   name: "manifest"
    // },
    //拆分公共包
    splitChunks: {
      cacheGroups: {
        //项目公共组件
        common: {
          chunks: 'initial',
          name: 'common',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        //第三方组件
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          minChunks: Infinity,
          maxInitialRequests: 5,
          minSize: 0,
          enforce: true
        }
      }
    }
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }]
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {loader: 'less-loader', options: {modifyVars: theme}}
        ],
        include: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        //use: ['file-loader']
        use: [
          {
            // url-loader内置了file-loader
            loader: 'url-loader',
            options: {
              limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'images/'   // 图片打包后存放的目录
            }
          }
        ]
      }
      // {
      //   test: /\.scss$/,
      //   loaders: ['style-loader', 'css-loader', 'sass-loader'],
      // },
    ]
  }
};



