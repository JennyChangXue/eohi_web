<template>
  <div class="home">
    <!-- <ul class="statistics-list-top">
      <li><span class="statistics-title">注册会员</span> <span class="statistics-msg">225</span></li>
      <li><span class="statistics-title">接入工厂</span> <span class="statistics-msg">231</span></li>
      <li><span class="statistics-title">接入设备</span> <span class="statistics-msg">1431</span></li>
      <li><span class="statistics-title">在线工业APP</span> <span class="statistics-msg">960</span></li>
      <li><span class="statistics-title">注册零件产品</span> <span class="statistics-msg">272</span></li>
    </ul> -->
  </div>
</template>

<script>
// import config from '@/utils/config.js';
export default {
  data () {
    return {

    };
  },
  mounted () {
    // const str = location.search;
    // if (str || localStorage.getItem('token')) {
    //   const user = unescape(str.split('&user=')[1]);
    //   const token = str.split('&user=')[0].slice(6);
    //   localStorage.setItem('token', token);
    //   localStorage.setItem('user', user);
    // } else {
    //   window.location.href = config.frontendUrl + '/#/login';
    // }
  },
  methods: {

  }
};
</script>
<style  lang="less" scoped>
  .home{
    height: 100%;
    position:relative;
    .map1{
      height: 76%;
      width: auto;
      position:absolute;
      left: 0;top: 0;
      right: 0;bottom: 0;
      margin: auto;
    }
    .map2{
       position:absolute;
       top: 20px;
       right: 20px;
       width: 12%;
       border: 1px solid #fff;
    }
  }
</style>
