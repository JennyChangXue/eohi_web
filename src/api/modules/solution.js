export default {
  getSolutionList: { method: 'post', url: '/manage/solution/queryArticle' }, // 获取解决方案列表
  addSolution: { method: 'post', url: '/manage/solution/addSection' }, // 新建解决方案
  uploadImg: { method: 'post', url: '/common/upload/uploadFile' }, // 图片上传
  batchDeleteSolution: { method: 'post', url: '/manage/solution/batchDelete' }, // 批量删除
  deleteSolution: { method: 'post', url: '/manage/solution/deleteSection' }, // 批量删除
  setSolutionStatus: { method: 'post', url: '/manage/solution/updateStatus' }, // 修改状态
  updateSolution: { method: 'post', url: '/manage/solution/updateSection' }, // 编辑
  getSolutionInfo: { method: 'post', url: '/manage/solution/getSectionDetail' } // 获取详情
};
