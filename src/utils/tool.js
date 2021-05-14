import Vue from 'vue';
// import { Message } from 'element-ui'
// import {requestData} from '@/public/service'

const toolObj = {
  // 保留两位小说 不四舍五入
  formatDecimal (num, decimal = 2) {
    num = num || 0;
    num = num.toString();
    const index = num.indexOf('.');
    if (index !== -1) {
      num = num.substring(0, decimal + index + 1);
    } else {
      num = num.substring(0);
    }
    return parseFloat(num).toFixed(decimal);
  },
  // 减运算，避免数据相除小数点后产生多位数和计算精度损失。
  minusNumber (arg1, arg2) {
    return (arg1 * 100000 - arg2 * 100000) / 100000;// 防止丢失精度
  },
  // 乘运算，避免数据相除小数点后产生多位数和计算精度损失。
  multiplyNumber (arg1, arg2) {
    return (arg1 * 100000) * (arg2 * 100000) / 10000000000;// 防止丢失精度
  },
  // 相加运算，避免数据相除小数点后产生多位数和计算精度损失。
  addNumber (arg1, arg2) {
    return ((arg1 * 100000) + (arg2 * 100000)) / 100000;// 防止丢失精度
  },
  // 除，避免数据相除小数点后产生多位数和计算精度损失。
  divideNumber (arg1, arg2) {
    return ((arg1 * 100000) / (arg2 * 100000));// 防止丢失精度
  },
  // message
  message (message, type, onClose) {
    Vue.prototype.$message({
      message,
      type,
      duration: 1000,
      onClose
    });
  },
  // 去掉所有html标记
  delHtmlTag (str) {
    return str.replace(/<[^>]+>/g, '');// 去掉所有的html标记
  },
  // 从json对象中获取以某个key的value值组成的数组
  // json对象的格式如[{},{}......]或{x:{},y:{}.....}
  recombineArr (jsonData = [], key) {
    const arr = [];
    for (const item in jsonData) {
      const temp = jsonData[item];
      for (const i in temp) {
        if (i === key) {
          arr.push(temp[i]);
        }
      }
    }
    return arr;
  },
  // 单条记录操作时，操作成功后只变更状态，不变更排序位置(若接口字段为id时,则不需要传id)
  // singleSearch(ajaxPath,that,id='id',...rest){
  //   requestData[ajaxPath]({[id]:that.scope.row[rest.length==0?id:rest[0]]['toString']()}).then((res)=>{
  //     if(res.result&&res.result.page){
  //       if(res.result.page.records&&res.result.page.records.length>0){
  //         that.$set(that.tableOptions.tableData,that.scope.$index,res.result.page.records[0]);
  //       }
  //     }
  //   })
  // },
  /***************************/
  /* 统计相关 */
  // 统计金额
  formatterMoney (row, column, cellValue, index) {
    return '￥' + toolObj.formatDecimal(cellValue);
  },
  summaryMoney: {
    mark: '￥',
    position: 'left',
    decimal: true
  },
  // 统计百分比
  formatterPercent (row, column, cellValue, index) {
    return toolObj.formatDecimal(cellValue) + '%';
  },
  summaryPercent: {
    type: 'average',
    mark: '%'
    // decimal:true
  },
  // pre,next必填(pre除以next)
  summaryDivide (current, pre, next) {
    return {
      type: 'divide',
      handle: { current, pre, next }
    };
  },
  // 自定义求和
  summaryCustom (value) {
    return {
      type: 'custom',
      value: value
    };
  },
  /***************************/
  // 防抖: 将多次执行变为最后一次执行
  // 定义：多次触发事件后，事件处理函数只执行一次，并且是在触发操作结束时执行
  // 原理：对处理函数进行延时操作，若设定的延时到来之前，再次触发事件，则清除上一次的延时操作定时器，重新定时
  // 频繁输入防抖
  debounce (fn, delay) {
    let timer = null; // 借助闭包
    return function () {
      const context = this;
      const args = arguments;
      timer && clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  },
  // 函数节流: 将多次执行变为每隔一段时间执行
  // 定义：当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
  // 原理：对处理函数进行延时操作，通过设定时间片，控制事件函数间断性的触发。
  // 时间戳
  // throttle(fn, delay) {
  //   let prev = new Date();
  //   return function() {
  //     let context = this;
  //     let args = arguments;
  //     let now = new Date();
  //     if (now - prev >= delay) {
  //       fn.apply(context, args);
  //       prev = new Date();
  //     }
  //   }
  // },
  // 定时器
  // throttle(fn, delay) {
  //   let timer = null;
  //   return function() {
  //     let context = this;
  //     let args = arguments;
  //     if (!timer) {
  //       timer = setTimeout(function() {
  //         fn.apply(context, args);
  //         clearTimeout(timer);
  //       }, delay)
  //     }
  //   }
  // },
  // 节流 规定时间内执行第一次点击
  throttle (fn, delay) {
    let timer = null;
    let isFirst = true;
    return function () {
      const context = this;
      const args = arguments;
      if (isFirst) {
        isFirst = false;
        fn.apply(context, args);
      }
      if (!timer) {
        timer = setTimeout(function () {
          isFirst = true;
          clearTimeout(timer);
          timer = null;
        }, delay);
      }
    };
  },
  // 复制指定区域文本 target为指定文本的dom
  copyText (target) {
    // 创建要copy的块, createRange: 表示一个包含节点与文本节点的一部分的文档片段。
    const block = document.createRange();
    // 选中要copy的区域
    block.selectNode(target);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(block);
    const copyResult = document.execCommand('copy');
    // 清除选中的区域
    window.getSelection().removeAllRanges();
    if (copyResult) {
      this.message('复制成功', 'success');
    } else {
      this.message('复制失败', 'error');
    }
  }
};
export default toolObj;
