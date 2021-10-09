import Vue from 'vue';
const tool = {
  /**
   * @param {HTMLElement} element
   * @param {string} className
   */
  removeClass (element, className) {
    if (!element || !className) {
      return false;
    }
    const classList = [...element.classList];
    if (classList.includes(className)) {
      element.classList.remove(className);
    }
  },
  /**
 * @param {HTMLElement} element
 * @param {string} className
 */
  addClass (element, className) {
    if (!element || !className) {
      return false;
    }
    const classList = [...element.classList];
    if (!classList.includes(className)) {
      element.classList.add(className);
    }
  },
  /**
   * @param {HTMLElement} element
   * @param {string} className
   */
  toggleClass (element, className) {
    if (!element || !className) {
      return false;
    }
    const classList = [...element.classList];
    if (!classList.includes(className)) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  },
  /**
 * 获取数据类型
 * @param {All} [o] 需要检测的数据
 * @returns {String}
 */
  getType (o) {
    return Object.prototype.toString.call(o).slice(8, -1);
  },

  /**
 * 判断是否是指定数据类型
 * @param {All} [o] 需要检测的数据
 * @param {String} [type] 数据类型
 * @returns {Boolean}
 */
  isKeyType (o, type) {
    return tool.getType(o).toLowerCase() === type.toLowerCase();
  },
  /**
   * @param {string} path
   * @returns {Boolean}
   */
  isExternal (path) {
    return /^(https?:|mailto:|tel:)/.test(path);
  },

  // message
  message (message, type, onClose) {
    Vue.prototype.$message({
      message,
      type,
      duration: 2000,
      onClose
    });
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
  /**
   * 递归树形数据查找数据 [{children:[{}]}]
   * @param [data] [array]需要递归的数据
   * @param {childLable} [string] 数据类型
   * @returns {}
   */
  treeMap (data, callback, childLable = 'children') {
    if (!tool.isKeyType(data, 'array')) {
      return false;
    };
    data.map(item => {
      if (callback(item, data)) {
        return false;
      } else {
        return tool.treeMap(item[childLable], callback);
      };
    });
  },
  // 状态[1,2]
  formatterStatusTwo (row, column, cellValue, index) {
    switch (cellValue) {
      case 1:
        return '启用';
      case 2:
        return '禁用';
      default:
        return '';
    }
  },
  // 状态[1,-1]
  formatterStatus (row, column, cellValue, index) {
    switch (cellValue) {
      case 1:
        return '启用';
      case -1:
        return '禁用';
      default:
        return '';
    }
  },
  // 默认
  formatterDefault (row, column, cellValue, index) {
    switch (cellValue) {
      case 1:
        return '是';
      case -1:
        return '否';
      default:
        return '';
    }
  },
  // 菜单权限类型
  formatterMenuType (row, column, cellValue, index) {
    switch (cellValue) {
      case 1:
        return '菜单';
      case 2:
        return '按钮';
      case 3:
        return '目录';
      default:
        return '';
    }
  },
  //
  formatterRoles (row, column, cellValue, index) {
    if (tool.isKeyType(cellValue, 'array')) {
      return tool.recombineArr(cellValue, 'role_name').join(', ');
    } else {
      return '';
    }
  },
  // 前台管理-菜单权限类型判断
  formatterMenuTypeFront (row, column, cellValue, index) {
    switch (cellValue) {
      case 1:
        return '目录';
      case 2:
        return '菜单';
      case 3:
        return '按钮';
      default:
        return '';
    }
  }
};
export default tool;
