import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const files = require.context('./modules', false, /\.js$/);
const modules = {};
files.keys().forEach(key => {
  const name = require('path').basename(key, '.js');
  modules[name] = files(key).default || files(key);
  modules[name].namespaced = true; // 开启命名空间
});
// console.log(modules);
export default new Vuex.Store({
  modules
});
