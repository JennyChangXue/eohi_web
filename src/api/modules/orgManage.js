export default {
  getOrgList: { method: 'post', url: '/manage/dept/getDeptTree' }, // 获取组织树
  orgAdd: { method: 'post', url: '/manage/dept/addDepartment' }, // 新建组织
  getList: { method: 'post', url: '/manage/dept/queryDepartment' }, // 获取组织 列表
  changeStatus: { method: 'post', url: '/manage/dept/updateStatus' }, // 修改状态
  delete: { method: 'post', url: '/manage/dept/delete' }, // 删除组织
  batchDelete: { method: 'post', url: '/manage/dept/batchDelete' }// 批量删除
};
