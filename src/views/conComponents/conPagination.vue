<template>
  <div class="paginationMain">
    <el-pagination
      background
      :layout="hasPageSizes?'next, pager, prev,sizes,total':'next, pager, prev,total'"
      @current-change="handleCurrentChange"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize1"
      :total="totals"
      :current-page="currentPage1"
      :page-sizes="pageSizes"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'conPagination',
  props: {
    pageSize: {
      default: 10
    },
    currentPage: {
      default: 1
    },
    pageSizes: {
      type: Array,
      default: () => [10, 30, 50]
    },
    hasPageSizes: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pageSize1: 10,
      currentPage1: 1,
      totals: 0
    };
  },
  watch: {
    currentPage (val) {
      this.currentPage1 = val * 1;
    }
  },
  methods: {
    handleCurrentChange (page) {
      this.$emit('pageChange', page);
    },
    getPages (val) {
      this.totals = val;
    },
    handleSizeChange (size) {
      this.pageSize1 = size;
      this.$emit('onPageSizeChange', size);
    }
  },
  mounted () {
    this.pageSize1 = typeof this.pageSize === 'number' ? this.pageSize : parseInt(this.pageSize);
    this.currentPage1 = typeof this.currentPage === 'number' ? this.currentPage : parseInt(this.currentPage);
  }
};
</script>
<style scoped lang="less" type="text/less">
  .el-pagination{
    margin-top: 16px;
    margin-bottom:16px;
  }
  .paginationMain /deep/ .el-pagination .btn-prev,.paginationMain /deep/ .el-pagination .btn-next{
    width: 68px;
    height: 30px;
    background:linear-gradient(8deg,rgba(228,230,237,1),rgba(255,255,255,1));
    border-radius:6px;
    color: #888888;
    font-size: 14px;
    float: right;
  }
  .paginationMain /deep/ .el-pagination .el-pagination__sizes{
    float: right;
  }
  .paginationMain /deep/ .el-pager{
    float: right;
  }
  .paginationMain /deep/ .el-pagination .el-pager li {
    /*width 30px*/
    padding: 0 10px;
    height: 30px ;
    line-height: 30px;
    background: linear-gradient(8deg, rgba(228, 230, 237, 1), rgba(255, 255, 255, 1));
    border-radius: 6px;
  }
  .paginationMain /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
    background: #409EFF;
    color: #fff;
  }
</style>
