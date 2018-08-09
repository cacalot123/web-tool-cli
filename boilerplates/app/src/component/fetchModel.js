import 'whatwg-fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
function parseJSON(response) {
  return response.json();
}

export default class Http {


  static get(url, params = {}) {
    const con = {};
    window.location.search.substring(1).split('&').forEach((name) => {
      con[name.split('=')[0]] = decodeURIComponent(name.split('=')[1]);
    });
    console.log('con',con)
    const token = con.token;
    const param = [];
    console.log(params)
    Object.keys(params.param).forEach((key) => {
      // console.log(params.param[key],key)
      param.push(`${key}=${params.param[key]}`);
      console.log('param',param)
    });
    console.log('param',param)


    let options;
    if (token) {
      options = {
        method: 'get',
        credentials: 'same-origin',
        headers: {
          'x-auth-token': token
        }
      };
    } else {
      options = {
        method: 'get',
        credentials: 'same-origin'
      };
    }
    return new Promise((resolve, reject) => {
      fetch(`${url}?${param.join('&')}`, options)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static post(url, options = {}) {
    const con = {};
    window.location.search.substring(1).split('&').forEach((name) => {
      con[name.split('=')[0]] = decodeURIComponent(name.split('=')[1]);
    });
    const token = con.token;
    let _options;
    if (token) {
      _options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        credentials: 'same-origin'
      };
    } else {
      _options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      };
    }
    if (options.data) {
      _options.body = JSON.stringify(options.data);
      delete _options.data;
    }
    return new Promise((resovle, reject) => {
      fetch(url, _options)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          resovle(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
