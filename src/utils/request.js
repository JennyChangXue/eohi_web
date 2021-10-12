import axios from 'axios';
import qs from 'qs';
import service from '@/api';
import { Message, Loading } from 'element-ui';
// import tool from '@/utils/tool';
// // service 循环遍历输出不同的请求方法
const baseConfig = require('./config.js');
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000,
  withCredentials: false
});
let loading;
const Request = {}; // 包裹请求方法的容器
// 请求格式/参数的统一
for (const key in service) {
  const module = service[key];
  Request[key] = {};
  for (const item in module) {
    const api = module[item]; // url method
    Request[key][item] = async function (
      params, // 请求参数 get：url，put，post，patch（data），delete：url
      isFormData = false, // 标识是否是form-data请求
      config = {} // 配置参数
    ) {
      // console.log(isFormData);
      // let newParams = {};
      // //  content-type是否是form-data的判断
      // if (params && isFormData) {
      //   newParams = new FormData();
      //   for (const i in params) {
      //     // 如果参数是数组
      //     if (tool.isKeyType(params[i], 'array')) {
      //       const itemArray = params[i];
      //       if (itemArray.length > 0) {
      //         for (let j = 0; j < itemArray.length; j++) {
      //           newParams.append(`${i}[${j}]`, itemArray[j]);
      //         }
      //       } else {
      //         newParams.append(`${i}`, []);
      //       }
      //     } else {
      //       newParams.append(i, params[i]);
      //     }
      //   }
      // } else {
      //   newParams = params;
      // }
      // console.log(newParams);
      // 一个项目多个接口用不同的baseURL
      if (api.baseURL) {
        instance.defaults.baseURL = api.baseURL;
      } else {
        instance.defaults.baseURL = process.env.VUE_APP_BASE_URL;
      }
      // 不同请求的判断
      let response = {}; // 请求的返回值
      if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
        try {
          // config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
          params = isFormData ? params : qs.stringify(params);
          response = await instance[api.method](api.url, params, config);
        } catch (err) {
          response = err;
          // console.log(err);
          throw (response);
        }
      } else if (api.method === 'delete' || api.method === 'get') {
        config.params = params;
        try {
          response = await instance[api.method](api.url, config); // axios.get()
        } catch (err) {
          response = err;
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
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  // 发起请求前
  loading = Loading.service({
    fullscreen: true,
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  if (localStorage.getItem('token')) {
    config.headers.Auth = 'Bearer ' + window.atob(localStorage.getItem('token'));
  }
  return config;
}, (e) => {
  // 请求错误
  loading.close();
  Message.error({ message: '请求错误，请求稍后重试' });
  throw (e);
});
// 响应拦截器
instance.interceptors.response.use(res => {
  // 请求成功
  loading.close();
  if (res.status === 200) {
    if (res.data.code) {
      if (res.data.code !== 200) {
        if (res.data.code === 401) { //  登录超时
          window.location.href = baseConfig.frontendUrl + '/#/login';
        }
        if (res.data.msg) {
          Message.error({ message: res.data.msg });
        }
        return (res.data);
      }
      // 刷新token
      if (res.data.refreshToken) {
        localStorage.setItem('token', res.data.refreshToken);
      }
      return res.data;
    } else {
      return res;
    }
  }
}, (e) => {
  // console.log(e);
  loading.close();
  Message.error({ message: '请求错误，请求稍后重试' });
  throw (e);
  // ret
});
export default Request;
