/**
 * 返回URL参数对象
 * getUrlParams
 * @param {String} url
 * @returns {Object}
 * **/

function getUrlParams(url) {
  var theRequest = {};
  if (url.indexOf('?') != -1) {
    var str = url.substr(url.lastIndexOf('?') + 1);
    var strs = str.split('&');
    for (var i = 0; i < strs.length; i += 1) {
      theRequest[strs[i].split('=')[0]] = (strs[i].substr(strs[i].indexOf('=') + 1));
    }
  }
  return theRequest;
}

/**
 * 返回URL参数对象
 * serilizeURL
 * @param {String} url
 * @returns url
 * **/
function serilizeURL(url) {
  var rs = url.split("?")[1];
  return rs;
}

export {getUrlParams, serilizeURL};
export default getUrlParams;


