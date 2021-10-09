import Vue from 'vue';
import store from './store';
import router from './router';
import tool from '@/utils/tool';
import App from './App.vue';
import Request from '@/utils/request';
import '@/assets/css/reset.css';
import '@/assets/css/main.less';
// import config from '@/utils/config.js';

// import {
//   Pagination,
//   Dialog,
//   Menu,
//   Submenu,
//   MenuItem,
//   Input,
//   Checkbox,
//   Select,
//   Option,
//   Button,
//   Table,
//   TableColumn,
//   DatePicker,
//   Form,
//   FormItem,
//   Tabs,
//   Row,
//   Col,
//   Container,
//   Header,
//   Aside,
//   Main,
//   Footer,
//   Loading,
//   Message,
//   MessageBox
// } from 'element-ui';

import Element, { Loading, Message, MessageBox } from 'element-ui';

import { mixin } from '@/utils/mixin.js';
Vue.use(Element, { size: 'medium' });
Vue.config.productionTip = false;
Vue.prototype.$request = Request;
Vue.prototype.$tool = tool;
// Vue.use(Pagination);
// Vue.use(Dialog);
// Vue.use(Menu);
// Vue.use(Submenu);
// Vue.use(MenuItem);
// Vue.use(Input);
// Vue.use(Checkbox);
// Vue.use(Select);
// Vue.use(Option);
// Vue.use(Button);
// Vue.use(Table);
// Vue.use(TableColumn);
// Vue.use(DatePicker);
// Vue.use(Form);
// Vue.use(FormItem);
// Vue.use(Tabs);
// Vue.use(Row);
// Vue.use(Col);
// Vue.use(Container);
// Vue.use(Header);
// Vue.use(Aside);
// Vue.use(Main);
// Vue.use(Footer);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.mixin(mixin);
// 路由拦截
router.beforeEach((to, from, next) => {
  // 控制nav菜单栏的active
  // let curActive = '';
  // curActive = to.path === '/' ? '/home' : to.path;
  // store.dispatch('activeMenu/setCurrentActive', curActive);
  // if (to.path === '/home' || to.path === '/') {
  //   next();
  // } else {
  //   if (!localStorage.getItem('token')) {
  //     window.location.href = config.frontendUrl + '/#/login';
  //     Message('登录超时，请重新登录');
  //   }
  // }
  next();
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
