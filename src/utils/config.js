const host = window.location.host;
const url = 'http://' + host;
const port = window.location.port;
const frontendUrl = port === '8001' ? url : url.replace('8000', '8001');
const adminUrl = port === '8000' ? url : url.replace('8001', '8000');
// const frontendUrl = port === '8081' ? url : url.replace('8080', '8081');
// const adminUrl = port === '8080' ? url : url.replace('8081', '8080');
// console.log(frontendUrl, adminUrl);
const config = {
  // 接口请求地址
  baseUrl: process.env.VUE_APP_BASE_URL,
  // 页面跳转地址
  frontendUrl: frontendUrl,
  adminUrl: adminUrl
};
module.exports = config;
