<template>
    <el-form style="padding:15px 20px 0;background: #fff;border-radius: 6px;box-shadow:#ccc 0 0 10px" :label-width="formData.labelWidth||'86px'" label-position="right" :inline="true" :model="formData.model" class="search_form" :class="formData.className||''" ref="refName">
      <el-row :gutter="0">
        <template v-for="(item,index) in formData.options">
          <template v-if="!item.isHidden">
            <el-col v-if="item.type == 'input'" :span="item.span" :key="index">
              <el-form-item  :label="item.label" :key="item.label" :prop="item.model">
                <el-input :style="'width:'+(formData.inputWidth||'100%')" v-model="formData.model[item.model]" :placeholder="item.placeholder" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col v-else-if="item.type == 'select'" :span="item.span"  :key="index">
              <el-form-item  :label="item.label"  :key="item.label" :prop="item.model">
                <el-select :style="'width:'+(formData.inputWidth||'100%')" v-model="formData.model[item.model]" :placeholder="item.placeholder" @change="item.onChange&&$emit('onChange',{type:item.model,value:formData.model[item.model]})" clearable>
                  <el-option v-for="temp in item.option" :key="temp.value" :label="temp.label" :value="temp.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-else-if="item.type == 'time'" :span="item.span"  :key="index">
              <el-form-item :class="item.size == 'mini'?'mini_time_control':'time_control'" :label="item.label" :prop="item.model">
                <el-date-picker
                    v-model="formData.model[item.model]"
                    :type="item.timeType||'daterange'"
                    :range-separator="item.range_separator||'-'"
                    :start-placeholder="item.start_placeholder||'开始日期'"
                    :end-placeholder="item.end_placeholder||'结束日期'"
                    :format="item.format||'yyyy-MM-dd'"
                    :value-format="item.value_format||'yyyy-MM-dd'"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col v-else-if="item.type == 'range'" :span="item.span"  :key="index">
              <el-form-item class="range_input" :label="item.label">
                <template v-for="(range,index) in item.option">
                  <el-input :style="'width:'+item.width" :key="index" v-model="formData.model[range.model]" :placeholder="range.placeholder"></el-input>
                  <span v-if="index == 0" :key="index">-</span>
                </template>
              </el-form-item>
            </el-col>
            <el-col v-else-if="item.type === 'button'" :span="item.span" class="btn-item" :key="index">
              <el-form-item :class="item.isMiddle?'btn_item_content':''">
                <template v-for="(btn, index) in item.option">
                  <el-button type="primary" :key="index" :style="{'padding-left':item.padding,'padding-right':item.padding}" v-if="btn.type == 'search'" @click="onSubmit">{{btn.label}}</el-button>
                  <el-button :style="{'padding-left':item.padding,'padding-right':item.padding}" :key="index" v-else-if="btn.type == 'reset'" @click="resetForm('refName')">{{btn.label}}</el-button>
                  <el-button type="warning" :style="{'padding-left':item.padding,'padding-right':item.padding}" :key="index" v-else-if="btn.type == 'download'&&$store.state.isExport" @click="withoutCheckDownload">{{btn.label}}</el-button>
                  <el-button type="success" :style="{'padding-left':item.padding,'padding-right':item.padding}" :key="index"  v-else-if="btn.type == 'refresh'" @click="onSubmit">{{btn.label}}</el-button>
                  <el-button type="success" :style="{'padding-left':item.padding,'padding-right':item.padding}" :key="index"  v-else-if="btn.type == 'custom'">{{btn.label}}</el-button>
                </template>
              </el-form-item>
            </el-col>
          </template>
        </template>
      </el-row>
    </el-form>
</template>

<script>
import { config } from '@/utils/config.js';
export default {
  name: 'searchForm',
  props: {
    formOptions: {
      type: Object,
      default: () => ({
        model: {}
      })
    }
  },
  data () {
    const modelObj = {};
    const modelCatch = {};
    const options = this.formOptions.options;
    for (const item of options) {
      if (item.type !== 'range' && item.type !== 'button') {
        modelObj[item.model] = item.default || '';
        if (item.type === 'time') {
          modelCatch[item.start] = item.default || '';
          modelCatch[item.end] = item.default || '';
        } else {
          modelCatch[item.model] = item.default || '';
          //            console.log(item.default);
        }
      } else if (item.type === 'range') {
        modelObj[item.option[0].model] = item.default || '';
        modelObj[item.option[1].model] = item.default || '';
        modelCatch[item.option[0].model] = item.default || '';
        modelCatch[item.option[1].model] = item.default || '';
      }
    }
    return {
      infidentifyDialogVisible: false,
      formData: Object.assign({ model: modelObj }, this.formOptions),
      formCatch: modelCatch
      //        formData:{
      //          className:'',//默认为空
      //         labelWidth:'70px'//默认
      //          downloadUrl:'/admin/order/serviceExport',
      //          options:[
      //            {
      //              type:'time',
      //              label:'时间',
      //              model:'time',
      //              format:'yyyy-MM-dd',//默认
      //              value_format:'yyyy-MM-dd',//默认
      //              start_placeholder:'开始日期',//默认
      //              end_placeholder:'结束日期',//默认
      //              range_separator:'-',//默认
      //              start:'startTime',
      //              end:'endTime',
      //              span:10
      //            },
      //            {
      //              type:'input',
      //              label:'用户名',
      //              placeholder:'input',
      //              model:'username',
      //              span:6
      //            },
      //            {
      //              type:'select',
      //              label:'省份',
      //              placeholder:'select',
      //              model:'province',
      //              span:6,
      //              option:[
      //                {
      //                  label:'first',
      //                  value:'1'
      //                },
      //                {
      //                  label:'second',
      //                  value:'2'
      //                }
      //              ]
      //            },
      //              {
      //                type:'range',
      //                label:'芝麻分',
      //                span:7,
      //                width:'100px',
      //                option:[
      //                  {
      //                    model:'zhimaStart',
      //                    placeholder:''
      //                  },
      //                  {
      //                    model:'zhimaEnd',
      //                    placeholder:''
      //                  }
      //                ]
      //              },
      //              {
      //                type:'button',
      //                  span:6,
      //                isMiddle:false //true||false
      //                option:[
      //                    {
      //                      type:'search',
      //                      label:'搜索',
      //                    },{
      //                      type:'reset',
      //                      label:'重置'
      //                    }
      //              ]
      //             }
      //          ]
      //        }
    };
  },
  methods: {
    // 更新数据
    updateData () {
      const options = this.formData.options;
      this.formCatch = {};
      for (const item in options) {
        if (options[item].type === 'time') {
          if (this.formData.model[options[item].model]) {
            this.formCatch[options[item].start] = this.formData.model[options[item].model][0];
            this.formCatch[options[item].end] = this.formData.model[options[item].model][1];
          } else {
            this.formCatch[options[item].start] = '';
            this.formCatch[options[item].end] = '';
          }
        } else if (options[item].type === 'range') {
          this.formCatch[options[item].option[0].model] = this.formData.model[options[item].option[0].model] || '';
          this.formCatch[options[item].option[1].model] = this.formData.model[options[item].option[1].model] || '';
        } else if (options[item].type !== 'button') {
          this.formCatch[options[item].model] = this.formData.model[options[item].model] || '';
        }
      }
    },
    // 异步修改默认值
    setDefault (key, value) {
      this.formData.model[key] = value;
      this.updateData();
    },
    onSubmit () {
      this.updateData();
      this.$emit('reSearch', this.formCatch);
    },
    resetForm (refName) {
      this.$refs[refName].resetFields();
      const options = this.formData.options;
      for (const item in options) {
        if (options[item].type === 'time') {
          if (this.formData.model[options[item].model]) {
            this.formData.model[options[item].model][0] = '';
            this.formData.model[options[item].model][1] = '';
            this.formCatch[options[item].start] = this.formData.model[options[item].model][0];
            this.formCatch[options[item].end] = this.formData.model[options[item].model][1];
          } else {
            this.formCatch[options[item].start] = '';
            this.formCatch[options[item].end] = '';
          }
        } else if (options[item].type === 'range') {
          this.formData.model[options[item].option[0].model] = '';
          this.formData.model[options[item].option[1].model] = '';
          this.formCatch[options[item].option[0].model] = this.formData.model[options[item].option[0].model] || '';
          this.formCatch[options[item].option[1].model] = this.formData.model[options[item].option[1].model] || '';
        } else if (options[item].type !== 'button') {
          this.formData.model[options[item].model] = options[item].default || '';
          this.formCatch[options[item].model] = this.formData.model[options[item].model] || '';
        }
      }
      this.$emit('reSearch', this.formCatch);
    },
    withoutCheckDownload () {
      const token = localStorage.getItem('tokenStr');
      let parmStr = '';
      if (this.formOptions.downloadUrl.indexOf('?') === -1) {
        parmStr = '?token=' + token;
      } else {
        parmStr = '&token=' + token;
      }
      for (const item in this.formCatch) {
        parmStr += `&${item}=${this.formCatch[item]}`;
      }
      window.open(config.baseURL + this.formOptions.downloadUrl + parmStr);
    },
    refresh () {
      this.$emit('reSearch', this.formCatch);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .el-form-item{
    width:100%;
    margin-bottom:4px;
    margin-right: 0;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
  /deep/ .el-date-editor .el-range-separator{
    padding: 2px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
  .search_form /deep/ .el-form-item__content{
    width: 68.5%;
  }
  .time_control /deep/ .el-form-item__content{
    width:84.2%
  }
  .mini_time_control /deep/ .el-form-item__content{
    width:68.5%
  }
  .mini_time_control /deep/ .el-form-item__label{
    padding-right: 12px;
  }
  @media screen and (max-width: 1600px){
    .mini_time_control /deep/ .el-form-item__content{
      width:78%
    }
    .mini_time_control /deep/ .el-form-item__label{
      padding-right: 0;
      text-align: center;
      width: 60px!important;
    }
    .mini_time_control /deep/  .el-range-editor{
      padding-left: 4px;
      padding-right: 4px;
    }
    .mini_time_control /deep/ .el-date-editor /deep/ .el-range__close-icon{
      width: 0;
    }
  }
  .btn_item_content /deep/ .el-form-item__content{
    width:100%;
    text-align:center;
  }
  .el-button{
      height: 36px;
      padding: 0px 20px;
  }
  .btn-item /deep/ .el-form-item__content{
      width: 100%;
  }
</style>
