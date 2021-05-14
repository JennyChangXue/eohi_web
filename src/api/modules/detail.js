export default {
  getContactlist: { method: 'get', url: '/contactlist' }, // 获取联系人列表
  newContactForm: { method: 'post', url: '/contact/new/form' }, // 新建联系人 form-data
  editContact: { method: 'put', url: '/contact/edit' }, // 编辑联系人
  delContact: { method: 'delete', url: '/contact' }// 删除联系人
};
