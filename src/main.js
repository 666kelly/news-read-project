import Vue from 'vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)
import {Header} from'mint-ui'
Vue.component(Header.name, Header)
import './lib/mui/css/mui.min.css'
import app from './App.vue'
var vm=new Vue({
   el:'#app',
   render: c =>c(app)
})