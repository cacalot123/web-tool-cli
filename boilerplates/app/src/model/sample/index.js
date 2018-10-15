import axios from '../axios';

export default {

  simpleGetConvert(data) {
    console.log('data',data)
    return data;
  },


  // poster
  simpleGet(data) {
    return axios.get('/hs-course/home-head', {params: data})
      .then(data => this.simpleGetConvert(data));
  },

  // 列表
  simplePost(data) {
    return axios.get('/hs-course/home-list', data)
      .then(data => this.homeListConvert(data));
  }
}
