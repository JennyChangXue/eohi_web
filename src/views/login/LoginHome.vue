<template>
  <div class="main" style="margin-bottom:0">
    <div class="login_form">
      <LoginForm></LoginForm>
    </div>
  </div>
</template>

<script>
import LoginForm from './component/LoginForm';

export default {
  name: 'LoginHome',
  components: {
    LoginForm
  },
  data () {
    return {
      adminName: '永康电器'
    };
  },
  mounted () {
    // this.$request.user.getContactlist().then(() => {
    //
    // }).catch((res) => {
    //   console.log(res)
    // })
    document.title = 'eohi';
  }
};
</script>
<style  lang="less" scoped>

</style>
