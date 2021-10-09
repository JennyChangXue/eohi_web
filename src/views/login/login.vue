<template>
  <div class="loginCont">
    <h1>登 录</h1>
    <el-form :model="form" class="loginForm">
      <el-form-item label="">
        <el-input v-model="form.user" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="">
          <el-input type="password" v-model="form.pwd" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" type="primary" @click="handleLogin">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'LoginHome',
  data () {
    return {
      adminName: '永康电器',
      form: {
        user: 'admin',
        pwd: '111111'
      }
    };
  },
  mounted () {
    // this.$request.user.getContactlist().then(() => {
    //
    // }).catch((res) => {
    //   console.log(res)
    // })
    document.title = 'eohi';
  },
  methods: {
    handleLogin () {
      this.$router.push('/home');
    }
  }
};
</script>
<style  lang="less" scoped>
.loginCont{
  width: 100%;
  height: 100%;
  background: #283443;
  overflow: hidden;
  h1{
    color: #fff;
    font-size: 30px;
    width: 500px;
    display: block;
    margin: 160px auto 0;
    text-align: center;
  }
  .loginForm{
    width: 500px;
    margin: 20px auto;
    padding: 40px;
    .loginBtn{
      width: 100%;
    }
  }
}

</style>
