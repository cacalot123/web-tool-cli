import fetchModel from '../component/fetchModel';
import {baseUrl} from './urlconfig';

export default class baseModel {
  /**
   * 转换数据
   * @param data
   * @returns {{}}
   * @private
   */


  static convert(data) {
    const obj = Object.assign({}, data);
    if (data.status === 200) {
      obj.convert = true;
      return obj.data;
    }
    return obj;
  }


  /** *
   * get测试
   * @class baseGetTest
   * */
  static baseGetTest(param) {
    const url = `${baseUrl}/v3/sign/contract`;
    // const url = '/api-liquidation/liquidation/v2/recon/fail/loadCountFailData';
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetchModel.get(url, {param}).then(data => baseModel.convert(data)
        ).then((data) => {
          resolve(data);
        }).catch(reject);
      }, 200);
    });
  }

  /***
   * post测试
   * @class basePostTest
   * ***/
  static basePostTest(param) {
    const url = `${baseUrl}/simple/post`;
    // const url = '/api-liquidation/liquidation/v2/recon/fail/loadCountFailData';
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetchModel.post(url, {data: param}).then(data => baseModel.convert(data)
        ).then((data) => {
          resolve(data);
        }).catch(reject);
      }, 200);
    });
  }
}
