import {getUrlParams, keyValueToJson} from '@util';

const setStorageApp = function () {
  // var storage=window.localStorage;
  // if(!window.localStorage){
  //   window.localStorage['key'] = 11;
  //   console.log('window',window)
  //
  //   // console.log('window.localStorage',window.localStorage)
  //
  //   alert("浏览器1支持localstorage");
  //   return false;
  // }else{
  //   alert("浏览器bu支持localstorage");
  //
  //   //主逻辑业务
  // }
  const urlParams = getUrlParams(window.location.href);
  const localJson = keyValueToJson(urlParams);
  const Storage = {};
  localJson.map((value) => {
    Storage[value.key] = value.value;
    localStorage.setItem(value.key, value.value);
    return Storage;
  });
  console.log(Storage);
  return Storage;
};

export {setStorageApp};
export default setStorageApp;
