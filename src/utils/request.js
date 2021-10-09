import axios from "axios";
import service from "@/api";
import { Message, Loading } from "element-ui";
import JSONbig from 'json-bigint';
import sign from "@/utils/sign";
import store from '@/store';
import tool from "@/utils/tool";
import router from "@/router/index";
// // service 循环遍历输出不同的请求方法
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 200000,
  // 处理数字精度丢失问题
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data);
    } catch (err) { return data; }
  }]
});
const errMessage = (err) => {
  if (err.data && err.data.msg) {
    Message.error({ message: err.data.msg });
  }
};
let loading;
const pendings = [];
const Request = {}; // 包裹请求方法的容器
// 请求格式/参数的统一
for (const key in service) {
  const module = service[key];
  Request[key] = {};
  for (const item in module) {
    const api = module[item]; // url method
    Request[key][item] = async function (
      params, // 请求参数 get：url，put，post，patch（data），delete：url
      isFormData = true, // 标识是否是form-data请求
      config = {} // 配置参数
    ) {
      let newParams = {};
      //  content-type是否是form-data的判断
      if (params && isFormData) {
        newParams = new FormData();
        for (const i in params) {
          // 如果参数是数组
          if (tool.isKeyType(params[i], 'array')) {
            const itemArray = params[i];
            if (itemArray.length > 0) {
              for (let j = 0; j < itemArray.length; j++) {
                newParams.append(`${i}[${j}]`, itemArray[j]);
              }
            } else {
              newParams.append(`${i}`, []);
            }
          } else {
            newParams.append(i, params[i]);
          }
        }
      } else {
        newParams = params;
      }
      // 一个项目多个接口用不同的baseURL
      if (api.baseURL) {
        instance.defaults.baseURL = api.baseURL;
      } else {
        instance.defaults.baseURL = process.env.VUE_APP_BASE_URL;
      }
      // 不同请求的判断
      let response = {}; // 请求的返回值
      if (api.method === "put" || api.method === "post" || api.method === "patch") {
        try {
          response = await instance[api.method](api.url, newParams, config);
        } catch (err) {
          response = err;
          errMessage(response);
          throw (response);
        }
      } else if (api.method === "get") {
        config.params = newParams;
        try {
          response = await instance[api.method](api.url, config);
        } catch (err) {
          response = err;
          errMessage(response);
          throw (response);
        }
      } else if (api.method === "delete") {
        try {
          response = await instance[api.method](api.url, { data: newParams }, config);
        } catch (err) {
          response = err;
          errMessage(response);
          throw (response);
        }
      }
      return response; // 返回响应值
    };
  }
}
// 拦截器的添加
// 请求拦截器
instance.interceptors.request.use(config => {
  // 发起请求前
  // 判断是否加载loding
  if (!pendings.length && !(config && config.noLoading)) {
    loading = Loading.service({
      fullscreen: true,
      lock: true,
      text: "加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
  }
  !config.noLoading && pendings.push(config);
  // 接口鉴权
  if (store.state.user.token) {
    config.headers.authorization = 'Bearer ' + store.state.user.token;
  }
  const headers = sign();
  for (const key in headers) {
    config.headers[key] = headers[key];
  }
  return config;
}, (e) => {
  // 请求错误
  !(e.config && e.config.noLoading) ? loading.close() : '';
  Message.error({ message: "请求错误，请求稍后重试" });
  throw (e);
});
// 响应拦截器
instance.interceptors.response.use(res => {
  // 请求成功
  const index = pendings.indexOf(res.config);
  index !== -1 && pendings.splice(index, 1);
  if (!pendings.length && !(res.config && res.config.noLoading)) {
    loading.close();
    loading = "";
  }
  // token过期，重新登录
  // res.data.error = 1005;
  // 1004 身份验证失败
  if (res.data.error === 1005 || res.data.error === 1004) {
    store.commit('user/clearUserInfo');
    // window.location.href = '/#/login';
    router.push('/login');
    if (res.data.error === 1005) {
      window.location.reload();
    }
  }
  if (res.data.error && res.data.error !== 0) {
    throw (res);
  }
  return res.data;
}, (e) => {
  // 判断是否关闭loding
  const index = pendings.indexOf(e.config);
  index !== -1 && pendings.splice(index, 1);
  if (!pendings.length && !(e.config && e.config.noLoading)) {
    loading.close();
    loading = "";
  }
  Message.error({ message: "请求错误，请求稍后重试" });
  throw (e);
});
export default Request;
