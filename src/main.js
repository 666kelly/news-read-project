import Vue from 'vue'
//导入路由的包
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
//导入mint
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

//import {Header,Swipe, SwipeItem,Button} from'mint-ui'
//Vue.component(Header.name, Header)
//Vue.component(Swipe.name, Swipe);
//Vue.component(SwipeItem.name, SwipeItem);
//Vue.component(Button.name, Button);
//Vue.use(Lazyload)
//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2 安装 vue-resource
Vue.use(VueResource)
//设置请求根路径
Vue.http.options.root='http://www.liulongbin.top:3005';
//全局设置post时候数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSOn=true;
//导入mui样式z
import './lib/mui/css/mui.min.css'
import "./lib/mui/css/icons-extra.css"
import "./lib/CSS/golbal.css"

//安装图片预览插件

import preview from 'vue-preview'
Vue.use(preview)

//导入路由模块
import router from './router.js'

import app from './App.vue'
var vm=new Vue({
   el:'#app',
   render: c =>c(app),
   router//挂在路由到实例上
})