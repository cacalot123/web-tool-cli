const path = require('path');
const express = require('express');
const mockjs = require('express-mockjs');
const logger = require('morgan');
const bodyParser = require('body-parser');
const api = module.exports = express();
const proxyWeb = require('express-http-proxy');
// var _ = require('lodash');
const compression = require('compression');
const fs = require('fs');
// var multer = require('multer');
// var path = require('path');
api.use(logger('dev'));
api.use(compression());
api.use('/api/', bodyParser.json({ "limit": "100000kb" })); // for parsing application/json
api.use('/api/', bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//api.use(multer()); // for parsing multipart/form-data


api.use('*', function(request, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


api.use('/api/auth/course', mockjs(path.join(__dirname, 'course')));

// require('./course/routes')(api);
// require('./comments/routes')(api);
// require('./coupon/routes')(api);
// require('./discover/routes')(api);


// 测试服务器地址

// const urlTran = 'http://employee-opas.uat1.rs.com/';


const urlPre = '/api';

//
// api.use('/api/**', proxyWeb(urlTran, {
//   forwardPath: function (req, res) {
//     const url = urlTran + req.originalUrl.replace('/api-employee-opas/', '');
//     console.log(url);
//     return url;
//   }
// }));
api.use('/api/**', proxyWeb(urlPre, {
  forwardPath: function (req, res) {
    const url = urlPre + req.originalUrl.replace('/api', '');
    console.log(url);
    return url;
  }
}));

module.exports = api;
