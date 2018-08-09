export var webviewSystem = function () {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
  var ua = window.navigator.userAgent.toLowerCase();

  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    console.log('微信')
    return 'wx';
  } else {
    console.log('非微信')

    if (isiOS) {
      console.log('iOS')
      return 'iOS';
    } else if (isAndroid) {
      console.log('isAndroid')
      return 'Android';
    }else{
      console.log('非微信web',ua)
    }
  }

  return 'web';
}
var browser = webviewSystem();


/***
 * iSO Bridge
 * connectWebViewJavascriptBridge
 * ***/
function connectWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady', function () {
      callback(WebViewJavascriptBridge)
    }, false)
  }
}


window.sendDataToOC = function (params) {

};
console.log('system', browser)

if (browser == 'iOS') {

  connectWebViewJavascriptBridge(
    function (bridge) {
      bridge.init(function (message, responseCallback) {})

      bridge.registerHandler('javascriptHandler', function (data, responseCallback) {})

      window.sendDataToOC = function (params) {
        bridge.callHandler("javascriptHandler", params, function (response) {

          if (typeof response.uid == 'undefined') {
            return;
          }
          loginSite(response);
        });
      }
    }
  );
} else if (browser == 'Android') { //android
  window.sendDataToOC = function (params) {
    var a = '';
    a = JSON.stringify(params);
    window.javascriptHandler.sendDataToOC(a);
    //alert(123);
  };
} else if (browser == 'wx') {

}

//专家版 使用 wkview 注册方法
function sendDataToExp(params) {
  if (browser == 'iOS') {
    window.webkit.messageHandlers.MModel.postMessage(params);
  } else {
    var a = '';
    a = JSON.stringify(params);
    window.javascriptHandler.sendDataToOC(a);
  }
}

function gotoOCChatCall(args) {
  var params = {};
  params.cmd = {};

  params.cmd.params = args;
  params.cmd.action_name = 'chat_call';

  params.url = 'ydl_app';

  sendDataToExp(params);
}

function sendData(par, action_name, scheme, type) {
  var params = {};
  params.cmd = {
    params: par,
    action_name: action_name
  };
  params.url = scheme;

  console.log(params);
  if (type == 2) { //专家版本
    sendDataToExp(params);
    return;
  }
  sendDataToOC(params);
}

function loginOc() {
  var params = {};
  params.cmd = {};

  params.cmd.params = {};
  params.cmd.action_name = 'login';
  params.url = 'ydl_app';

  sendDataToOC(params);
}
//组装传入参数
function setParams(action_name, params, _url) {
  var data = {
    url: _url,
    cmd: {
      action_name: action_name,
      params: params
    }
  };
  console.log(data);
  sendDataToOC(data);
}

var native = {}
/***
 * 分享图片-专家版
 * @function action_share_image
 * @param share_info 分享信息
 * ***/
native.actionShareImage = function (share_url) {
  console.log('actionShareImage');
  setTimeout(function () {
    //通用分享
    var params = {};
    params.cmd = {};
    params.cmd.params = {
      share: {
        'share_url': share_url // 分享的url
      }
    };
    params.cmd.action_name = 'action_share_image';
    params.url = 'ydl_app';
    sendDataToExp(params);
  }, 300);
}


export {
  native
};

export default native;
