import Vue from 'vue'
//导入路由的包
//配置vuex的步骤
//1, 运行cnpm i vuex -S
// 2. 导入包
import Vuex from 'vuex'
//3 注册vuex到vue
Vue.use(Vuex)
//每次刚进入网站肯定会调用main.js，在调用的时候先从本地存储中把购物车的数据读出来，放到store中
var car =window.JSON.parse(localStorage.getItem('car')||'[]')
var store = new Vuex.Store({
   state:{
      //如果在组件中想要访问store中的数据，只能通过this.$store.state.来访问
      car:car//将购物车中的商品数据，用一个数组存储起来，在car数组中，存储一些商品的对象，咱们可以暂时将这个对象设计成这个样子，{id:商品的ID，count：要购买的数量，price：商品的单价，select：true

   },
   mutations:{
      addToCar(state,goodsinfo){
         //如果购物车中，之前已经有这个对应的商品了，那么只需要更新数量
         //如果没有，则直接把商品数据push到car中即可
     var flag=false
         //假设购物车中有对应商品
         state.car.some(item=>{
            if(item.id==goodsinfo.id){
               item.count +=parseInt(goodsinfo.count)
               flag=true
               return true
            }
         })
         if(!flag){
            state.car.push(goodsinfo)
         }
         //当更新car之后，把car数组，存储到本地的localstorge中
         localStorage.setItem('car',window.JSON.stringify(state.car))
      },
      updateGooodsInfo(state,goodsinfo){
        //修改购物车中的数量值
        //分析：
        state.car.some(item=>{
           if(item.id==goodsinfo.id){
              item.count=parseInt(goodsinfo.count)
              return true
           }
        })
        //当修改完商品的数量,把最新的购物车数据保存到本地
        localStorage.setItem('car',window.JSON.stringify(state.car))
        
      },
      removeFormCar(state,id){
         //根据ID从store中的购物车中删除对应的那条商品数据
         state.car.some((item,i)=>{
            if(item.id==id){state.car.splice(i,1)}
            return true
         })
         localStorage.setItem('car',window.JSON.stringify(state.car))
      },
      updateGoodsSeleted(state,info){
  
         state.car.some(item=>{
            if(item.id==info.id){
               item.selected=info.selected
            }
         })
         localStorage.setItem('car',window.JSON.stringify(state.car))
      }
   },
   getters:{
      getAllCount(state){
         var c=0;
         state.car.forEach(item=>{
            c+=item.count
         })
         return c
      },
      getGoodsCount(state){
         var o={}
         state.car.forEach(item=>{
            o[item.id]=item.count
         })
         return o
      },
      getGoodsSelected(state){
    var o={}
    state.car.forEach(item =>{
       o[item.id]=item.selected
    })
    return o

      },
      getGoodsCountAndAmount(state){
     var o={
      count:0,
      amount:0
     }
     state.car.forEach(item=>{
        if(item.selected){
           o.count+=item.count
           o.amount+=item.price*item.count
        }
     })
     return o
      }
      
     
   }
})
//总结
//1 state中的数据，不能直接修改，必须通过mutations
//2 如果组件想要直接从state上获取数据需要使用this.$store.state,***
//3.如果组件，想要修改数据，必须使用mutations提供的方法，需要通过this.$store.commit('方法的名称'，唯一的一个参数)
//4. 如果store中state上的数据，在对外提供的时候，需要做一层包装，那么推荐使用getters,如果使用getters，则用this.$store.getters.***
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
   router,//挂在路由对象到实例上
   store //挂载store状态管理对象
})