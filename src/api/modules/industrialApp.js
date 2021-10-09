export default {
  searchList: { method: 'post', url: '/manage/app/queryApp' }, // 查询工业app列表
  add: { method: 'post', url: '/manage/app/addApp' }, // 添加
  detail: { method: 'post', url: '/manage/app/getAppDetail' }, // 获取详情
  edit: { method: 'post', url: '/manage/app/updateApp' }, // 修改
  delete: { method: 'post', url: '/manage/app/delete' }, // 单行删除
  batchDelete: { method: 'post', url: '/manage/app/batchDelete' }, // 批量删除
  changeStatus: { method: 'post', url: '/manage/app/updateStatus' } // 上下架
};
