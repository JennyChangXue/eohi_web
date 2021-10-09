export default {
  getUserList: { method: 'post', url: '/manage/account/queryUser' }, // 管理员查询用户
  addUser: { method: 'post', url: '/manage/account/createAccount' }, // 创建账户用户
  changeUserPwd: { method: 'post', url: '/manage/account/updatePassword' }, // 修改用户密码
  updateUser: { method: 'post', url: '/manage/account/updateUser' }, // 修改用户信息
  deleteUser: { method: 'post', url: '/manage/account/deleteUser' }, // 删除用户
  batchDelete: { method: 'post', url: '/manage/account/batchDelete' }, // 批量删除用户
  importCreateUser: { method: 'post', url: '/manage/account/importCreateUser' }, // 导入新增用户
  exportUser: { method: 'post', url: '/manage/account/exportUser' }, // 导出用户
  updateUserStatus: { method: 'post', url: '/manage/account/updateUserStatus' }, // 导出用户
  getUserInfo: { method: 'post', url: '/manage/account/getUserDetail' } // 查看用户详情
};
