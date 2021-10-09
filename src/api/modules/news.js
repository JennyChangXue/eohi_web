// 资讯动态
export default {
  searchList: { method: 'post', url: '/manage/info/queryInfo' }, // 查询列表
  add: { method: 'post', url: '/manage/info/addInformation' }, // 新增
  update: { method: 'post', url: '/manage/info/updateInformation' }, // 修改
  changeStatus: { method: 'post', url: '/manage/info/updateStatus' }, // 上架、下架
  delete: { method: 'post', url: '/manage/info/deleteInfo' }, // 删除
  batchDelete: { method: 'post', url: '/manage/info/batchDelete' }, // 批量删除
  detail: { method: 'post', url: '/manage/info/getInfoDetail' } // 获取资讯详情
};
