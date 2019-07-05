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
   * 课程项目
   * @function getDetail
   * @param id CourseId

   * ***/
  getDetail(params) {
    return axios.get('/auth/course/getDetail', {params})
      .then(data => this.convert(data));
  }
};
