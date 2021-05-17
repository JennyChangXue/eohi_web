<template>
  <div class="container">
    <search-form ref="formDemo" @reSearch="reSearch" :formOptions = "formOptions"></search-form>
<!--    表格,自带翻页器-->
    <base-table ref="listTable" :tableOptions="tableOptions" :totals="totals" @onPageChange="onPageChange"
                :size="Number(size)">
<!--      表头的插槽 table-header-->
      <div class="paddingBottom10" slot="table-header">
        <el-button type="warning" plain @click="autoAssign">自动分配客户</el-button>
        <span class="orderNum1 orderNum">{{'总客户数：'}}</span>
      </div>
<!--      操作-->
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="orderDetail(scope.row)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </base-table>
<!--    翻页器-->
    <con-pagination  ref='pageDom' :currentPage="current" @pageChange="pageChange" :pageSize="size"></con-pagination>
  </div>
</template>

<script>
import searchForm from '@/views/conComponents/searchForm';
import baseTable from '@/views/conComponents/baseTable';
import conPagination from '@/views/conComponents/conPagination';
export default {
  name: 'FormDemo',
  components: {
    searchForm,
    baseTable,
    conPagination
  },
  data () {
    return {
      formOptions: { //  表单控制
        labelWidth: '86px',
        downloadUrl: '/admin/order/repServiceExport',
        options: [
          {
            type: 'input',
            label: '手机号码',
            placeholder: '手机号码',
            model: 'mobile',
            span: 6
          },
          {
            type: 'input',
            label: '真实姓名',
            placeholder: '真实姓名',
            model: 'realName',
            span: 6
          },
          {
            type: 'select',
            label: '用户来源',
            placeholder: '用户来源',
            model: 'platformName',
            span: 6,
            option: [

            ]
          },
          {
            type: 'select',
            label: '是否有跟进',
            placeholder: '是否有跟进',
            model: 'feedbackStatus',
            span: 6,
            option: [
              {
                label: '全部',
                value: ''
              },
              {
                label: '是',
                value: '1'
              },
              {
                label: '否',
                value: '2'
              }
            ]
          },
          {
            type: 'input',
            label: '委派客服',
            placeholder: '委派客服',
            model: 'serviceName',
            span: 6
          },
          {
            type: 'select',
            label: '委派状态',
            placeholder: '委派状态',
            model: 'serviceUserStatus',
            span: 6,
            option: [
              {
                label: '全部',
                value: ''
              },
              {
                label: '未委派',
                value: '2'
              },
              {
                label: '已委派',
                value: '1'
              }
            ]
          },
          {
            type: 'time',
            label: '还款时间',
            model: 'time',
            start: 'startTime',
            end: 'endTime',
            size: 'mini',
            span: 6
          },
          {
            type: 'button',
            span: 6,
            isMiddle: true,
            option: [
              {
                type: 'search',
                label: '查询'
              }, {
                type: 'reset',
                label: '重置'
              },
              {
                type: 'download',
                label: '导出'
              }
            ]
          }
        ]
      },
      tableOptions: { //   表格控制
        tableData: [
          {
            mobile: '2312313212',
            realName: '张三',
            from: 'sdfi',
            status: '已委派'
          }
        ], //   表格数据
        options: [ //  columns
          {
            type: 'selection',
            width: '55'
          },
          {
            prop: 'mobile',
            label: '手机号'
          }, {
            prop: 'realName',
            label: '姓名'
          }, {
            prop: 'from',
            label: '用户来源'
          }, {
            prop: 'status',
            label: '委派状态'
          }
        ]
      },
      current: '1', //  翻页器数据
      size: '10',
      totals: 1
    };
  },
  methods: {
    // 切换分页
    onPageChange (page) {
      this.current = page.toString();
      this.goSearch();
    },
    // 查询或重置
    reSearch (data) {
      console.log(data);
      this.formData = data;
      this.current = '1';
      this.$refs.listTable.reset();
      this.goSearch();
    },
    // 获取列表
    goSearch () {
      this.$request.user.getContactlist({
        current: this.current,
        size: this.size,
        ...this.formData
      }).then((res) => {
        // 使用baseTable时
        this.totals = res.result.page.total;
        this.tableOptions.tableData = res.result.page.records;
        // 使用conPagination时，控制totals
        this.$refs.pageDom.getPages(this.totals);
      }).catch((res) => {
        this.tableOptions.tableData = [];
        this.totals = 0;
        this.$tool.message(res.message, 'info');
      });
    },
    autoAssign () {},
    orderDetail () {},
    // 翻页器
    pageChange (page) {
      this.current = page.toString();
      this.goSearch();
    }
  },
  mounted () {
    this.$refs.pageDom.getPages(this.totals);
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/css/main.less';
</style>
