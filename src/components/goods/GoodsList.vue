<template>
<div  class='goods-list'>
   <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
        <img :src="item.img_url" alt="">
        <h class="title">{{item.title}}</h>
        <div class="info">
             <p class="price">
                 <span class="now">￥{{item.sell_price}}</span>
                 <span class="old">￥{{item.market_price}}</span>
             </p>
             <p class="sell">
                 <span>热卖中</span>
                 <span>剩{{item.stock_quantity}}件</span>
             </p>
        </div>
        </div>
        <mt-button type="danger" size="large" @click="goDetail">加载更多</mt-button>
        
</div>
</template>
<script>
import {Toast} from "mint-ui";
export default{
  data(){
      return{
          pageindex:1,
          goodslist:[]
      }
  },
  created(){
      this.getGoodsList();
    
  },
  methods:{
        getGoodsList(){
            //获取商品列表
            this.$http.get("api/getgoods?pageindex="+this.pageindex).then(result=>{
                    if(result.body.status===0){
                        this.goodslist=this.goodslist.concat(result.body.message)
                    }
                    else{
                        Toast('获取商品列表失败')
                    }
                    
                }
            )
        },
        getMore(){
            this.pageindex++,
            this.getGoodsList()
        },
       
        goDetail(id){
                    //使用js形式进行路由导航
                    //注意：一定要区分this.$route和this.$router这两个对象
                    //其中：this.route是路由参数对象。所有路由参数，params,query都属于他
                    //其中：this.$router是一个路由对象（导航对象），用它可以方便的使用js代码，实现路由的前进后退，跳转到新的URL地址
                    //1最简单
                   // this.$router.push("/home/goodsinfo/"+id)
                    //2传递对象
                 // this.$router.push({path:"/home/goodsinfo/"+id})
                 ////3传递命名的路由
                 this.$router.push({name:'goodsinfo',params:{id}})
                         }

  }
}
</script>
<style lang='scss' scoped>
.goods-list{
    display:flex;
    flex-wrap: wrap;
    padding:7px;
    justify-content: space-between;
    .goods-item{
        width:49%;
        border: 1px solid #ccc;
        box-shadow:0 0 0 8px #ccc;
        margin:3px 0;
        padding:2px;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        min-height:293px;
        img{
            width:100%;
        }
        .title{
            font-size:14px;
        }
        .info{
           background:#ddd;
           p{
               margin:0;
               padding:5px;
           }
           .price{
               .now{
                   color:red;
                   font-weight:bold;
                    font-size:15px;
               }
               .old{
                   text-decoration:line-through;
                   font-size:12px;
                 margin-left:10px;
               }
           }
           .sell{
               display:flex;
               justify-content: space-between;
               font-size:12px;
           }
        }
    }
}
</style>