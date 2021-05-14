# eohi_web

### 目录结构
```
h5/
├── api/   接口
           modules：js文件以功能模块命名。
           新增接口在相应模块，新建功能模块js时，index.js内无需引入
           接口调用：this.$request.文件名.接口名，使用：this.$request.user.getContactlist(data)
├── assets/ 静态资源
├── router/ 路由
            module：js文件以功能模块命名 
            新建无需引用
├── store/  vuex
├── util/  request接口请求，tool.js公用方法  使用：this.$tool.formatDecimal(num, decimal)
├── views/ 页面
           conComponents 公用组件
├── dist/  打包后的文件
├── index.js webpack入口文件
├── package.json
├── README.md
├── .gitignore
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


