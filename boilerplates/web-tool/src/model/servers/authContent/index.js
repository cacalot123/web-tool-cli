import {Toast} from 'antd-mobile';
import axios from '../config/axios';

export default {

  convert(data) {
    let dataNew = {};
    if (data.code === '200') {
      dataNew = Object.assign([], data.data);
      return dataNew;
    }
    Toast.fail(data.msg, 5);
    return false;
  },

  /***
   * 获取评论数
   * @function comments
   * @param id 课程id
   * ***/
  comments(params) {
    return axios.get('/auth/content/comments', {params})
      .then(data => this.convert(data));
  },
  /***
   * 发表评论
   * @function commentsAdd
   * @param id 课程id
   * ***/
  commentsAdd(params) {
    return axios.post('/auth/content/comments/add', params)
      .then(data => this.convert(data));
  }
};
