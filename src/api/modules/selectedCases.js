export default {
  getSelectedCases: { method: 'post', url: '/manage/case/queryCase' }, // 获取精选案例列表
  addSelectedCases: { method: 'post', url: '/manage/case/addCase' }, // 新建精选案例
  uploadImg: { method: 'post', url: '/common/upload/uploadFile' }, // 图片上传
  changeStatus: { method: 'post', url: '/manage/case/updateStatus' }, // 修改状态
  deleteList: { method: 'post', url: '/manage/case/deleteCase' }, // 删除段落
  deleteAllList: { method: 'post', url: '/manage/case/batchDelete' }, // 批量删除段落
  getDetails: { method: 'post', url: '/manage/case/getCaseDetail' }, // 查询详情
  updatePlatformOverview: { method: 'post', url: '/manage/case/updateCase' } // 修改精选案例
};
