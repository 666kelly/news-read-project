<template>
<div >
    <!--轮播图-->
    <!--分析为什么商品评论中的轮播图这么丑-->
    <!--首页中的图片，它的宽高都是用100%-->
    <!--商品详情页面中，轮播图的图片，如果也使用100%宽度，页面不好看-->
    <!--商品详情页面中的插图，期望高度100%，宽度自适应-->
    <!--分歧点，宽度要求不同-->
    <!--即然轮播图的其他属性相同，只有宽度要求不同，我们可以定义一个属性，让使用轮播图的调用者，手动指定-->
<mt-swipe :auto="4000">
  <mt-swipe-item v-for="item in lunbotulist" :key='item.url'>
      <img :src="item.img" alt="" :class="[ isfull ? 'img-full' : 'img-normal' ]">
  </mt-swipe-item>
</mt-swipe>
</div>
</template>
<script>
import {Toast} from "mint-ui"
export default{
    data(){
        return{};
    },
    methods:{},
   props:["lunbotulist","isfull"]
}</script>
<style lang='scss' scoped>
.mint-swipe{
        height:200px;
        .mint-swipe-item{
        text-align:center;
       img{
              
               height:100%;
               overflow: hidden;
           }
        }
    }
    .img-full {
      // 如果给图片应用了这个类，则图片的宽和高都是撑满父元素的
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .img-normal {
      // 如果给图片添加了这个类，则图片的高度 100%， 宽度是 自适应，横向的位置是居中显示
      height: 100%;
      
    }
</style>