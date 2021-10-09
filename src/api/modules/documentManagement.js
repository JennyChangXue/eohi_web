// 资料管理
export default {
  catalogAdd: { method: 'post', url: '/manage/material/addMaterialGroup' }, // 添加目录
  catalogDelete: { method: 'post', url: '/manage/material/deleteGroup' }, // 删除目录
  catalogEdit: { method: 'post', url: '/manage/material/updateMaterialGroup' }, // 修改目录
  catalogSearch: { method: 'post', url: '/manage/material/getGroupTree' }, // 查询目录
  docAdd: { method: 'post', url: '/manage/material/addMaterial' }, // 添加资料
  docDelete: { method: 'post', url: '/manage/material/delete' }, // 删除资料
  docBatchDelete: { method: 'post', url: '/manage/material/batchDelete' }, // 批量删除资料
  docEdit: { method: 'post', url: '/manage/material/updateMaterial' }, // 修改资料
  docSearch: { method: 'post', url: '/manage/material/queryMaterial' }, // 资料列表
  changeStatus: { method: 'post', url: '/manage/material/updateStatus' } // 上下架
};
