<template>
<div class='shopcar-container'>
<div class="gooslist">
    <!--商品列表区-->
               <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
					<mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                     @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>	
                    <img :src='item.thumb_path'>
                   
                    <div class='info' >
                         <h1>{{item.title}}</h1>
                         <p>
                            <span class='price'>￥{{item.sell_price}}</span>
                            <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id" ></numbox>

                            <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                         </p>
                    </div>
					</div>
				</div>
			</div>
            <!--结算区-->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总价（不含运费）</p>
                            <p>已勾选商品 <span class='red'>{{$store.getters. getGoodsCountAndAmount.count}}</span> 件，总价 ￥<span class='red'>{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                        </div>
                        <mt-button type='danger'>去结算</mt-button>
					</div>
                    
				</div>
			</div>
           

</div>
</div>
</template>
<script>
import numbox from "../subcomponents/Shopcar_numbox.vue"
export default{
    data(){
        return{
          goodslist:[]  //购物车中所商品id
        }
    },
    created(){
          this.getShopcarId()
    },
    methods:{
       
        getShopcarId(){
             var idList=[]
            this.$store.state.car.forEach(element => {
                idList.push(element.id)//购物车中原有的商品ID
            })
            if(idList<=0){
                return
            }
             this.$http.get('api/goods/getshopcarlist/'+idList.join(',')).then(result=>{
                 if(result.body.status===0){
                     this.goodslist=result.body.message
                 }
                 else{
                     Toast('获取购物车商品失败')
                 }
             })
        },
        remove(id,index){
                   //点击删除，把商品从store中根据传递的ID删除，同时把当前组件中的goodslist中，对应要删除的那个商品使用index来删除
              this.goodslist.splice(index,1);
              this.$store.commit('removeFormCar',id)
       },
       selectedChanged(id,val){
        
             this.$store.commit('updateGoodsSeleted',{id,selected:val})
       }
    },
 
    components:{
        numbox
    }
}
</script>
<style lang='scss' scoped>
   .shopcar-container{
       background-color: #eee;
       overflow:hidden;
       .gooslist{
         
           img{
               height:60px;
               width:60px;
           }
           h1{
               font-size:13px;
               
           }
           .info{
              display:flex;
              flex-direction: column;
            justify-content: center;
               
                p{
                   display:flex;
                    justify-content: center;
                }
               .price{
                   color:red;
                   font-size:bold;
               }
             
           }
           .mui-card-content-inner{
               display:flex;
               align-items:center;
           }
       }
       .jiesuan{
           display:flex;
           justify-content: space-between;
           align-items: center;
           .red{
               color:red;
               font-weight:bold;
               font-size:16px;
           }
       }
   }
</style>