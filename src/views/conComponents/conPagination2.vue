<template>
  <div class="paginationMain">
    <el-pagination
      background
      :layout="pageSizes.length<=0?'next, pager, prev,total':'next, pager, prev,sizes,total'"
      @current-change="handleCurrentChange"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize1"
      :total="total"
      :current-page="currentPage1"
      :page-sizes="pageSizes"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'conPagination2',
  props: {
    pageSize: {
      default: 10
    },
    currentPage: {
      default: 1
    },
    totals: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default: () => []
    }
  },
  data () {
    const pageSize1 = this.pageSize;
    const currentPage1 = this.currentPage;
    const total = this.totals;
    return {
      pageSize1: pageSize1,
      currentPage1: currentPage1,
      total: total
    };
  },
  watch: {
    currentPage () {
      this.currentPage1 = this.currentPage;
    },
    pageSize () {
      this.pageSize1 = this.pageSize;
    },
    totals () {
      this.total = this.totals;
    }
  },
  methods: {
    handleCurrentChange (page) {
      this.$emit('pageChange', page);
    },
    handleSizeChange (size) {
      this.$emit('sizeChange', size);
    }
  },
  mounted () {

  }
};
</script>
<style scoped lang="less">
  .el-pagination{
    margin-top: 16px;
    margin-bottom: 16px;
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
  .paginationMain /deep/ .el-pagination .el-pager li{
    /*width 30px*/
    padding:0 10px;
    height: 30px;
    line-height: 30px;
    background:linear-gradient(8deg,rgba(228,230,237,1),rgba(255,255,255,1));
    border-radius:6px;
  }
  .paginationMain /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
    background: #409EFF;
    color: #fff;
  }
</style>
