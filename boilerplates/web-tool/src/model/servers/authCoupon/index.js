import {Toast} from 'antd-mobile';
import axios from '../config/axios';

export default {

  convert(data) {
    const dataNew = [];
    if (data.code === '200') {
      console.log(data);
      //dataNew = Object.assign([], data.data);
      data.data.map((value, index) => {
        dataNew[index] = {};
        dataNew[index].label = value.code;
        dataNew[index].value = value.code;
      });
      return dataNew;
    }
    Toast.fail(data.msg, 5);
    return false;
  },

  /***
   * 获取该用户所有可用的该课程优惠券
   * @function authCouponController
   * @param course_id 课程id
   * ***/
  courseCoupon(params) {
    return axios.get('/auth/coupon/courseCoupon', {params})
      .then(data => this.convert(data));
  }
};
