<template>
<div class="goodsinfo-container">
  <transition
  @before-enter='beforeEnter'
  @enter='enter'
  @after-enter='afterEnter'
  >
      <div class="ball" v-show="ballFlag" ></div>
  </transition>
     <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotulist="goodsphoto" :isfull="false"></swiper>
					</div>
				</div>
			</div>
			<div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价：
                            <span ><del>￥{{goodsinfo.market_price}}</del></span>
                            销售价：
                            <span class='now-price'>{{goodsinfo.sell_price}}</span>
                        </p>
                        <p>购买数量:<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
					</div>
				</div>
			</div>
            <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品编号：{{goodsinfo.goods_no}}</p>
                        <p>库存情况：{{goodsinfo.stock_quantity}}</p>
                        <p>上架时间{{goodsinfo.add_time}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                   
                    <mt-button  type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                    <!--
                        分析如何实现加入购物车，拿到选择的数量
                         1 加入购物车按钮属于goodsinfo按钮，数字属于numberbox组件
                         2 由于涉及父子组件的嵌套，所以，无法直接在goodsinfo页面中获取到选中的商品数量
                         3 事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当做参数传递给对方
                         分析：子组件什么时候把数值传递给父组件
                    -->
                </div>
			</div>
</div>
</template>
<script>
//导入轮播图
import swiper from '../subcomponents/swiper.vue'
//导入数字选择器
import numbox from "../subcomponents/GoodsInfo_numberbox.vue"
import {Toast} from "mint-ui" 
export default{
      data(){
          return{
             id:this.$route.params.id,
             goodsinfo:{} ,  
             goodsphoto:[],
             selectedCount:1,//保存用户购买数量
             //控制小球显示隐藏的标识符
             ballFlag:false
          }
      },
      created(){
        this.getGoodsInfo();
        this.getGoodsPhoto();
      },
      methods:{
          getGoodsPhoto(){
                    this.$http.get("api/getthumimages/"+this.id).then(result=>{
                  if(result.body.status===0){
                      result.body.message.forEach(item => {
                         item.img=item.src;
                      });
                         this.goodsphoto=result.body.message
                  }
                  else{
                           Toast('获取商品轮播图失败')
                  }
                    })
          },
                    getGoodsInfo(){
              this.$http.get("api/goods/getinfo/"+this.id).then(result=>{
                  if(result.body.status===0){
                         this.goodsinfo=result.body.message[0]
                  }
                  else{
                           Toast('获取商品详情失败')
                  }
              }
              )
          },
          goDesc(id){
              //使用编程式导航跳转到图文介绍页面
              this.$router.push({name:'goodsdesc',params:{id} })
          },
          goComment(id){
              //点击跳转到评论页面
               this.$router.push({name:'goodscomment',params:{id} })
          },
          addToShopCar(){
              //添加到购物车
              this.ballFlag=!this.ballFlag;
              var goodsinfo={
                  id: this.id,
                  count:this.selectedCount,
                  price:this.goodsinfo.sell_price,
                  selected:true}
                  this.$store.commit('addToCar',goodsinfo)
          },
     beforeEnter(el){
             el.style.transform="translate(0,0)"
           },
       enter(el,done){
              el.offsetWidth
           //获取小球在页面位置
           const ballPosition=el.getBoundingClientRect();
           //获取徽标在页面位置
           const badgePosition=document.getElementById("badge").getBoundingClientRect()
           const left=badgePosition.left-ballPosition.left
           const top=badgePosition.top-ballPosition.top
        
           el.style.transform = "translate(" + left + "px, " + top + "px)";
           el.style.transition = "all 1s cubic-bezier(.46,-0.4,1,.49)";
           done()
       },
    afterEnter(el){
    this.ballFlag=!this.ballFlag
                },
                getSelectedCount(count){
                    //当子组件把选中的数量传递给父组件的时候，把选中的数值保存在data上，
                   this.selectedCount=count
                  
                }
          },
        components:{
          swiper,
          numbox
      }
}

</script>
<style lang='scss' scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    .now-price{
        font-size:16px;
        color:red;
        font-weight:bold;
    }
    .mui-card-footer{
     display:block;
     button{
         margin:10px 0;
     }
 }
 .ball{
     width:15px;
     height: 15px;
     background-color:red;
     border-radius: 50%;
     position:absolute;
     z-index: 99;
     top:429px;
     left:79px;
     
 }
}
 
</style>