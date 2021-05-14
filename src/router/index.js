import Vue from 'vue';
import VueRouter from 'vue-router';

/* Layout */
// import Layout from '@/views/layout'

Vue.use(VueRouter);

/**
 * hidden 默认false 如果设置为true则不出现在菜单列表中
 * name 必填 路由的name
 * meta:{
    title 需要在菜单和面包屑中展示的必填
    noCache 默认false 如果设为true 则页面将被缓存
    affix 默认false 如果设为true 则将固定在tags-view中
    breadcrumb 默认为true 如果设为false 将不会再面包屑中展示
    activeMenu 匹配到当前路由，菜单高亮的item
  }
 */

let conRouter = [
  {
    path: '/',
    component: () => import('@/views/login/LoginHome')
  },
  {
    path: '/login',
    component: () => import('@/views/login/LoginHome')
  }
];

// 所有的router
let finalRouters = [];
const files = require.context('./modules', false, /\.js$/);
files.keys().forEach(key => {
  finalRouters = finalRouters.concat(files(key).default);
});

conRouter = conRouter.concat(finalRouters);

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: conRouter
});
const router = createRouter();
export function resetRouter () {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
