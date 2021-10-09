<template>
  <div class="commen_list">
    <slot name="table-header"></slot>
    <el-table
      :data="tableOptions.tableData"
      select-on-indeterminate
      :border = "border"
      :header-cell-style="{background:'#fafafa','text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      :max-height="tableOptions.maxHeight"
      @selection-change="handleSelectionChange"
      :style="{width:'100%','margin-top':tableOptions.top?'10px':'0px'}">
      <template v-for="item in tableOptions.options">
        <template v-if="!item.isHidden">
          <!--多选-->
<!--         ---------------------------------------------------------------------- key要加判断,默认 id-->
          <el-table-column
              :key="item.id"
              v-if="item.type&&item.type=='selection'"
              type="selection"
              resizable
              align="center"
              width="55">
          </el-table-column>
          <!--序号-->
          <el-table-column
            :key="item.id"
              v-else-if="item.type&&item.type=='index'"
              type='index'
              align="center"
              resizable
              :label="item.label"
              :index="indexMethod"
              :width='item.width'
          >
          </el-table-column>
          <!--多级-->
          <el-table-column
              v-else-if="item.children&&item.children.length>0"
              resizable
              align="center"
              :label="item.label"
              :fixed="item.fixed?item.fixed:false"
              :width='item.width'
              :key='item.label'
              :formatter="item.formatter?item.formatter:defaultFuc"
          >
            <template v-for="child in item.children">
              <el-table-column
                  resizable
                  align="center"
                  :prop="child.prop"
                  :label="child.label"
                  :width='child.width'
                  :key='child.prop'
                  :show-overflow-tooltip="item.overflow"
                  v-if="child.render"
                  :formatter="child.formatter?child.formatter:defaultFuc"
              >
                <template slot-scope="scope">
                  <my-column :render="child.render" :scope="scope"></my-column>
                </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  resizable
                  :prop="child.prop"
                  :label="child.label"
                  :width='child.width'
                  :key='child.prop'
                  :show-overflow-tooltip="item.overflow"
                  v-if="child.render"
                  :formatter="child.formatter?child.formatter:defaultFuc"
              >
              </el-table-column>
            </template>
          </el-table-column>
          <!--自定义-->
          <el-table-column
              align="center"
              v-else-if="item.render"
              resizable
              :prop="item.prop"
              :label="item.label"
              :fixed="item.fixed?item.fixed:false"
              :width='item.width'
              :key='item.prop'
              :show-overflow-tooltip="item.overflow"
              :formatter="item.formatter?item.formatter:defaultFuc"
          >
            <template v-if="item.render" slot-scope="scope">
              <my-column :render="item.render" :scope="scope"></my-column>
            </template>
          </el-table-column>
          <el-table-column
              align="center"
              v-else
              resizable
              :prop="item.prop"
              :label="item.label"
              :fixed="item.fixed?item.fixed:false"
              :width='item.width'
              :key='item.prop'
              :show-overflow-tooltip="item.overflow"
              :formatter="item.formatter?item.formatter:defaultFuc"

          >
          </el-table-column>
        </template>
      </template>
      <slot></slot>
    </el-table>
    <con-pagination  ref='pageDom' v-if="totals != 0" :currentPage="this.current" @pageChange="pageChange" @sizeChange="sizeChange" :totals="total1" :pageSizes="pageSizes" :pageSize="size1"></con-pagination>
  </div>
</template>
<script>
import conPagination from '@/views/conComponents/conPagination2';
import myColumn from './myColumn';
export default {
  name: 'baseTable',
  components: {
    conPagination,
    myColumn
  },
  props: {
    border: {
      type: Boolean,
      default: true
    },
    tableOptions: {
      type: Object
    },
    totals: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 10
    },
    summary: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const total1 = this.totals;
    return {
      current: 0,
      total1,
      size1: this.size,
      loading: true,
      pageSizes: [10, 20, 50]
    };
  },
  watch: {
    totals () {
      this.total1 = this.totals;
    }
  },
  methods: {
    sizeChange (size) {
      this.size1 = size;
      this.$emit('sizeChange', size);
    },
    // 默认函数
    defaultFuc (row, column, cellValue, index) {
      return cellValue;
    },
    indexMethod (index) {
      return index + 1;
    },
    handleSelectionChange (val) {
      this.$emit('selectionChange', val);
    },
    pageChange (page) {
      this.current = page;
      this.$emit('onPageChange', page);
    },
    reset () {
      this.current = 0;
    },
    cancelLoading () {
      this.loading = false;
    }
  },
  mounted () {

  }
};
</script>
<style scoped lang="less" type="text/less">
  .commen_list{
    margin-top: 8px;
    padding: 5px 15px 5px 15px;
    background: #fff;
    // border-radius: 4px;
    // box-shadow: #ccc 0px 0px 10px;
  }
</style>
