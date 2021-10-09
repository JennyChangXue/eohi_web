export default {
  getPosterList: { method: 'post', url: '/manage/poster/queryPoster' }, // 获取海报列表
  addPoster: { method: 'post', url: '/manage/poster/addPoster' }, // 新建海报列表
  uploadImg: { method: 'post', url: '/common/upload/uploadFile' }, // 图片上传
  deletePoster: { method: 'post', url: '/manage/poster/delete' }, // 删除海报
  batchDelete: { method: 'post', url: '/manage/poster/batchDelete' }, // 批量删除海报
  getPosterInfo: { method: 'post', url: '/manage/poster/getDetail' }, // 获取海报详情
  setPosterStatus: { method: 'post', url: '/manage/poster/updateStatus' }, // 修改海报状态
  updatePoster: { method: 'post', url: '/manage/poster/updatePoster' } // 更新海报
};
