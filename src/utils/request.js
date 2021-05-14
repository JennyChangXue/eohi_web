import axios from 'axios';
import service from '@/api';
import { Message, Loading } from 'element-ui';
// // service 循环遍历输出不同的请求方法
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000
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
      let newParams = {};
      //  content-type是否是form-data的判断
      if (params && isFormData) {
        newParams = new FormData();
        for (const i in params) {
          newParams.append(i, params[i]);
        }
      } else {
        newParams = params;
      }
      // 一个项目多个接口用不同的baseURL
      if (api.baseURL) {
        instance.defaults.baseURL = api.baseURL;
      }
      // 不同请求的判断
      let response = {}; // 请求的返回值
      if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
        try {
          response = await instance[api.method](api.url, newParams, config);
        } catch (err) {
          response = err;
          throw (new Error(response));
        }
      } else if (api.method === 'delete' || api.method === 'get') {
        config.params = newParams;
        try {
          response = await instance[api.method](api.url, config); // axios.get()
        } catch (err) {
          response = err;
          throw (new Error(response));
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
  loading = Loading.service({
    fullscreen: true,
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  if (localStorage.token) {
    config.headers.token = localStorage.token;
    config.withCredentials = true;
  }
  return config;
}, (e) => {
  // 请求错误
  loading.close();
  Message.error({ message: '请求错误，请求稍后重试' });
  throw (new Error(e));
});
// 响应拦截器
instance.interceptors.response.use(res => {
  // 请求成功
  loading.close();
  return res.data;
}, (e) => {
  loading.close();
  Message.error({ message: '请求错误，请求稍后重试' });
  throw (new Error(e));
});
export default Request;
