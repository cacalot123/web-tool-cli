import axios from 'axios';

import {Toast} from 'antd-mobile';


// axios 中文使用说明
// https://www.kancloud.cn/yunye/axios/234845
const xhr = axios.create({
  // baseURL: deploy[env],
  baseURL: '/api',
  timeout: 100000,
  responseType: 'json',
  // params: method === 'get' ? data : {}, // 添加在请求URL后面的参数
  // data: method !== 'get' ? data : {}, // 适用于 PUT POST PATCH
  // 在传递给 then/catch 前，允许修改响应数据
  // 通过Qs.stringify转换为表单查询参数
  transformRequest: [(fData) => {
    const data = JSON.stringify(fData);
    return data;

    // const newData = qs.stringify({
    //   OSSDir: JSON.parse(JSON.stringify(data))
    // });
    // return newData;
  }],
  // 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`) ,
  // promise 将被 resolve; 否则，promise 将被 rejecte 。
  validateStatus: status => status === 200
});

// 表示跨域请求时是否需要使用凭证
// 设置请求允许携带cookie
//xhr.defaults.withCredentials = true;

// 请求拦截
// api.interceptors.request.use(
//   apiconfig => apiconfig,
//   e => Promise.reject(e),
// );

// 响应拦截
xhr.interceptors.response.use((res = {}) => {
  try {
    if (res.status !== 200) {
      Toast.info(res.statusText);
    }
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
}, (error) => {
  const { status } = error.response;
  console.log('status', status);
});
//
xhr.defaults.headers.post['Content-Type'] = 'application/json';


export default xhr;
