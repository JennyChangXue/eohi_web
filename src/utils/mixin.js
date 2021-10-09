export const mixin = {
  methods: {
    // 状态status===1 上架 === 0 下架
    statusRender (h, params) {
      const desc = params.row.status === 1 ? '已上架' : '已下架';
      const color = params.row.status === 1 ? 'green' : 'red';
      return h('span', {
        style: {
          color: color
        }
      }, desc);
    }
  }
};
