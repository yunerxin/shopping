import axios from "axios";
import qs from "qs";
import config from "./config";
// import { goLogin } from "../util/auth";
axios.interceptors.response.use(response => {
  console.log('response')
  console.log(response)
  if(response.data.state == 3){
    // goLogin()
    return false
  }

  return response
}, error => Promise.resolve(error.response));

function checkStatus(response) {
  return response.data
}

function checkCode(res) {
  return res;
}

// "App：1
// 微信:2
// QQ:3"
let channel = (function () {
  var ret = ''
  var _ua = window.navigator.userAgent.toLowerCase();
  if (_ua.indexOf("com.supply.mall") > -1) {
    ret = 1
  }
  // 微信:2
  if (_ua.match(/MicroMessenger/i) == 'micromessenger') {
    ret = 2
  }
  // qq
  if (_ua.indexOf(' qq') > -1 && _ua.indexOf('mqqbrowser') < 0) {
    //qq内置浏览器
    ret = 3
  }
  return ret
})()

// 其他统计
if (!localStorage.getItem("u_id_h5")) {
  let u_id_h5 = new Date().getTime() + '' + '_' + Math.random()
  localStorage.setItem("u_id_h5", u_id_h5)
}
function checkMallApi(url,domain){
  const host = window.location.host;
  if(domain) {
    return config.domain.replace("[config]", 'mall-api');
  } else {
    return config.api;
  }
}

export default {
    post(url, params,domain) {
      let api = checkMallApi(url,domain);
        return axios({
            method: "POST",
            url: api + url,
            data: params,
            transformRequest: [function (data) {
                data = qs.stringify(data, {
                        serializeDate: (date) => {
                          return date.toString()
                        }
                      })
                return data;
            }],
        }).then(checkStatus).then(checkCode);
    },
    post2(url, params,domain) {
      let api = checkMallApi(url,domain);
        return axios({
            method: "POST",
            url:api + url,
            header: {
                'Content-Type': 'application/json'
            },
            dataType:'json',
            data: params,
        }).then(checkStatus).then(checkCode);
    },
    postWithHead(url, params) {
      return axios({
        method: "POST",
        url: config.api + url,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params,
        transformRequest: [function (data) {
          data = qs.stringify(data, {
            serializeDate: (date) => {
              return date.toString()
            }
          })
          return data;
        }],
      }).then(checkStatus).then(checkCode);
    },

    get(url, params = {},domain) {
     let api = checkMallApi(url,domain);
      return axios({
            method: "get",
            url: api + url,
            params,
            timeout: config.timeout
        }).then(checkStatus).then(checkCode);
    },
    postForm(url, params, type) {
      let api = ''
      if (type) {
        api = getApiWithType(url, type)
      } else {
        api = config.api + url
      }
      return axios({
        method: "POST",
        url: api,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params,
        transformRequest: [function (data) {
          data = qs.stringify(data, {
            serializeDate: (date) => {
              return date.toString()
            }
          })
          return data;
        }],
      }).then(checkStatus).then(checkCode);
    },
    postJson(url, params, type) {
      let api = ''
      if (type) {
        api = getApiWithType(url, type)
      } else {
        api = config.api + url
      }
      return axios({
        method: "POST",
        url: api,
        header: {
          'Content-Type': 'application/json'
        },
        dataType: 'json',
        data: params,
      }).then(checkStatus).then(checkCode);
    },

};
