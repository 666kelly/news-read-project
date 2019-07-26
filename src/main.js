import Vue from 'vue'
//导入路由的包
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
//导入mint
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

import {Header,Swipe, SwipeItem,Button} from'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2 安装 vue-resource
Vue.use(VueResource)
//设置请求根路径
Vue.http.options.root='http://www.liulongbin.top:3005';
//导入mui样式
import './lib/mui/css/mui.min.css'
import "./lib/mui/css/icons-extra.css"

//导入路由模块
import router from './router.js'

import app from './App.vue'
var vm=new Vue({
   el:'#app',
   render: c =>c(app),
   router//挂在路由到实例上
})