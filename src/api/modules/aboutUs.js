export default {
  getParagraphlist: { method: 'post', url: '/manage/aboutUs/queryArticle' }, // 查询
  newParagraph: { method: 'post', url: '/manage/aboutUs/addSection' }, // 新增
  batchDelParagraph: { method: 'post', url: '/manage/aboutUs/batchDelete' }, // 批量删除
  delParagraph: { method: 'post', url: '/manage/aboutUs/deleteSection' }, // 删除
  updateParagraph: { method: 'post', url: '/manage/aboutUs/updateSection' }, // 更新
  setStatus: { method: 'post', url: '/manage/aboutUs/updateStatus' }, // 修改状态
  getSelfInfo: { method: 'post', url: '/platform/account/getSelfInfo' }, // 获取当前账户信息
  uploadImg: { method: 'post', url: '/common/upload/uploadFile' }, // 图片上传
  getParagraphInfo: { method: 'post', url: '/manage/aboutUs/getSectionDetail' } // 获取详情
};
