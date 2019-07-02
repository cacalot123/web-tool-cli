import {setParams} from './native';
import common from './index';

const native = {};


/***
 * 双呼
 * @function listenTel
 * @param id 倾听者id
 * ***/


native.listenTel = function (id) {
  const params = {id};
  setParams('listen_tel', params, 'ydl_app');
};

/***
 * 声网
 * @function listenAgora
 * @param id 倾听者id
 * ***/
native.listenAgora = function (id) {
  const params = {id};
  setParams('listen_agora', params, 'ydl_app');
};


const nativeCeshi = Object.assign(native, common);

export {nativeCeshi};
export default nativeCeshi;
