export var webviewSystem = function () {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  const ua = window.navigator.userAgent.toLowerCase();

  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    console.log('微信');
    return 'wx';
  }
  console.log('非微信');

  if (isiOS) {
    console.log('iOS');
    return 'iOS';
  } if (isAndroid) {
    console.log('isAndroid');
    return 'Android';
  }
  console.log('非微信web', ua);


  return 'web';
};
const browser = webviewSystem();


/***
 * iSO Bridge
 * connectWebViewJavascriptBridge
 * ***/
function connectWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge);
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady', function () {
      callback(WebViewJavascriptBridge);
    }, false);
  }
}


window.sendDataToOC = function (params) {

};
console.log('system', browser);

if (browser == 'iOS') {
  connectWebViewJavascriptBridge(
    function (bridge) {
      bridge.init(function (message, responseCallback) {
      });

      bridge.registerHandler('javascriptHandler', function (data, responseCallback) {
      });

      window.sendDataToOC = function (params) {
        bridge.callHandler('javascriptHandler', params, function (response) {
          if (typeof response.uid == 'undefined') {
            return;
          }
          loginSite(response);
        });
      };
    }
  );
} else if (browser == 'Android') { //android
  window.sendDataToOC = function (params) {
    let a = '';
    a = JSON.stringify(params);
    console.log('Android,toc');
    window.javascriptHandler.sendDataToOC(a);
  };
} else if (browser == 'wx') {
}

//专家版 使用 wkview 注册方法
function sendDataToExp(params) {
  if (browser == 'iOS') {
    window.webkit.messageHandlers.MModel.postMessage(params);
  } else {
    let a = '';
    a = JSON.stringify(params);
    window.javascriptHandler.sendDataToOC(a);
  }
}


function sendData(par, action_name, scheme, type) {
  const params = {};
  params.cmd = {
    params: par,
    action_name
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
  const params = {};
  params.cmd = {};

  params.cmd.params = {};
  params.cmd.action_name = 'login';
  params.url = 'ydl_app';

  sendDataToOC(params);
}

//组装传入参数
function setParams(actionName, params, _url) {
  const data = {
    url: _url,
    cmd: {
      action_name: actionName,
      params
    }
  };
  console.log(data);
  sendDataToOC(data);
}


//组装传入参数
function setParamsRouter(_url) {
  console.log('setParamsRouter', _url);
  sendDataToOC(_url);
}


/***
 * native方法
 *
 * ***/


export {
  setParams,
  setParamsRouter
};
