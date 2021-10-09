export default {
  // 资料申请核实
  // search: { method: 'get', url: '/manage/materialApply' }, // 列表查询
  // delete: { method: 'post', url: '/manage/materialApply/delete' }, // 删除
  // batchDelete: { method: 'post', url: '/manage/materialApply/batchDelete' }, // 批量删除
  // changeStatus: { method: 'post', url: '/manage/materialApply/updateStatus' }// 审核
  // 咨询信息核实
  search: { method: 'get', url: '/manage/trial/queryTrial' }, // 列表查询
  delete: { method: 'post', url: '/manage/trial/deleteTrial' }, // 删除
  batchDelete: { method: 'post', url: '/manage/trial/batchDelete' }, // 批量删除
  changeStatus: { method: 'post', url: '/manage/trial/updateStatus' }// 审核
};
