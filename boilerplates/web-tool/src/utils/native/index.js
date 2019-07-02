import {setParams, setParamsRouter} from './native';

const native = {};
/***
 * 分享页面
 * @function actionSharePage
 * @param shareInfo 分享信息
 * ***/
native.actionSharePage = function (shareInfo) {
  const actionName = 'action_share';
  const params = {};
  params.share = {
    cover: shareInfo.cover,
    desc: shareInfo.desc,
    title: shareInfo.title,
    share_url: shareInfo.shareUrl
  };
  const url = 'ydl_app';
  setParams(actionName, params, url);
};

/***
 * 跳转到h5页面
 * @function 跳转H5页面
 * @param url
 * ***/
native.goH5page = function (H5Url) {
  const params = {url: H5Url};
  const getInfoCode = encodeURIComponent(JSON.stringify(params));

  const url = `ydl-user://h5/consult?params=${getInfoCode}`;
  setParamsRouter(url);
};

export default native;
