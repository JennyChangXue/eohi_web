export default {
  getPlatformOverviewList: { method: 'post', url: '/manage/platformSummary/queryArticle' }, // 获取平台概要
  addPlatformOverview: { method: 'post', url: '/manage/platformSummary/addSection' }, // 新建平台概要
  uploadImg: { method: 'post', url: '/common/upload/uploadFile' }, // 图片上传
  deleteList: { method: 'post', url: '/manage/platformSummary/deleteSection' }, // 删除段落
  deleteAllList: { method: 'post', url: '/manage/platformSummary/batchDelete' }, // 批量删除段落
  changeStatus: { method: 'post', url: '/manage/platformSummary/updateStatus' }, // 修改状态
  getDetails: { method: 'post', url: '/manage/platformSummary/getSectionDetail' }, // 查询详情
  updatePlatformOverview: { method: 'post', url: '/manage/platformSummary/updateSection' } // 修改平台概要
};
