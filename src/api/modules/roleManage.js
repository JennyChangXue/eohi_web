export default {
  searchList: { method: 'get', url: '/manage/role/queryRole' }, // 获取角色列表
  add: { method: 'post', url: '/manage/role/addRole' }, // 新建角色
  changeStatus: { method: 'post', url: '/manage/role/updateStatus' }, // 修改状态
  delete: { method: 'post', url: '/manage/role/deleteRole' }, // 删除角色
  batchDelete: { method: 'post', url: '/manage/role/batchDelete' }// 批量删除
};
