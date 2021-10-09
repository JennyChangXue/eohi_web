<template>
  <div class="layout">
    <div class="topBar">
      <div class="logo" @click="toFrontend">永康电器厨具工业互联网平台</div>
      <div class="rigMsg">
        <span @click="toWorkStage" style="margin-right: 0.2rem"> 我的工作台  </span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-s-custom"></i> {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="account">账户设置</el-dropdown-item>
            <el-dropdown-item command="workStage">我的工作台</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="wrapMain">
      <el-scrollbar class="sideBar" :class="{'minSideBar':isCollapse}" wrap-class="scrollbar-wrapper" >
        <div class="navTopBtn">
          <i :class="{'el-icon-s-fold':!isCollapse,'el-icon-s-unfold':isCollapse}" @click="isCollapse=!isCollapse"></i>
        </div>
        <el-menu  class="navMenu"
          :default-active="this.$store.state.activeMenu.currentActive"
          @open="handleOpen" @close="handleClose"
          router
          :collapse="isCollapse"
          background-color="#1E324D"
          text-color="#fff"
          active-text-color="#ffd04b"
                  :unique-opened = 'true'
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">账号管理</span>
            </template>
              <el-menu-item index="/userManage">用户管理</el-menu-item>
              <el-menu-item index="/organization">组织架构</el-menu-item>
              <el-menu-item index="/roleManage">角色管理</el-menu-item>
<!--              <el-menu-item index="/authManage">权限管理</el-menu-item>-->
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-monitor"></i>
              <span slot="title">门户管理</span>
            </template>
              <el-menu-item index="/poster">轮播/海报</el-menu-item>
              <el-menu-item index="/platformOverview">平台概要</el-menu-item>
              <el-menu-item index="/solution">解决方案</el-menu-item>
              <el-menu-item index="/selectedCases">精选案例</el-menu-item>
              <el-menu-item index="/consultationNews">资讯动态</el-menu-item>
              <el-menu-item index="/aboutUs">关于我们</el-menu-item>
          </el-submenu>
<!--          <el-submenu index="3">-->
<!--            <template slot="title">-->
<!--              <i class="el-icon-s-data"></i>-->
<!--              <span slot="title">基础数据</span>-->
<!--            </template>-->
<!--              <el-menu-item index="1-2-1">产品分类</el-menu-item>-->
<!--              <el-menu-item index="1-2-2">设备供应商</el-menu-item>-->
<!--          </el-submenu>-->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">产品管理</span>
            </template>
            <el-menu-item index="/industrialApp">工业APP管理</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">资料管理</span>
            </template>
            <el-menu-item index="/documentManagement">资料管理</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-s-claim"></i>
              <span slot="title">信息核实</span>
            </template>
            <el-menu-item index="/consultInformation">咨询信息核实</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-scrollbar>
      <div class="main">
        <div class="mainCont">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/utils/config.js';
export default {
  data () {
    return {
      isCollapse: false,
      userName: ''
    };
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    toWorkStage () {
      window.location.href = config.frontendUrl + '/#/workStage';
    },
    toFrontend () {
      window.location.href = config.frontendUrl;
    },
    handleCommand (command) {
      switch (command) {
        case 'account': window.location.href = config.frontendUrl + '/#/personalCenter'; break;
        case 'workStage': window.location.href = config.frontendUrl + '/#/workStage'; break;
        default :
          this.$confirm('确定退出登录?', '退出登录', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$request.login.logout({}).then((res) => {
              window.location.href = config.frontendUrl + '/#/login';
              localStorage.clear();
              this.$message.success('退出登录成功！');
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          }); break;
      }
    }
  },
  created () {
    this.userName = localStorage.getItem('user');
  }
};
</script>

<style lang="less" scoped>
  .layout{
    height: 100%;
    .topBar{
      width: 100%;
      height: 80px;
      font-size: 16px;
      color: #0F5299;
      border-bottom: 1px solid #e1e1e1;
      display: flex;
      .logo{
        width: 240px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
      }
      .rigMsg{
        width: calc(100% - 240px);
        text-align: right;
        line-height: 80px;
        padding: 0 20px;
      }
      .rigMsg:hover{
        cursor: pointer;
      }
    }
    .wrapMain{
      width: 100%;
      height: calc(100% - 80px);
      display: flex;
      /deep/ .el-scrollbar__wrap{
        overflow-x: hidden;
        overflow-y: scroll;
      }
      .sideBar{
        width: 240px;
        height: 100%;
        background: #1E324D;
        transition: width 0.1s;
        &.minSideBar{
          width: 64px;
          .navTopBtn{
            text-align: center;
          }
        }
        .navTopBtn{
          height: 40px;
          color: #eee;
          text-align: right;
          padding:10px 18px;
          i{
            font-size: 20px;
            cursor: pointer;
          }
        }
        .navMenu{
          height: calc(100% - 40px);
          border-right: none;
          .el-submenu .el-menu-item{
            padding-left: 50px!important;
          }
        }
      }
      .main{
        flex: 1;
        height: 100%;
        padding:10px;
        overflow: auto;
        .mainCont{
          //min-width: 1200px;
          padding: 20px;
          height: 100%;
          border-radius: 4px;
          box-shadow: #ccc 0px 0px 10px;
        }
      }
    }

  }
</style>
