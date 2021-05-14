<template>
  <div class="login-form-wrapper">
    <el-form>
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { requestData } from '@/api/request'

export default {
  name: 'LoginForm',
  data () {
    return {
      form: {
        name: '232312'
      }
    };
  },
  methods: {

  },
  mounted () {
    // console.log(this.$request.user)
    this.$request.user.getContactlist().catch((res) => {
      console.log(res);
    });
  }
};
</script>
<style lang="less" scoped>

</style>
