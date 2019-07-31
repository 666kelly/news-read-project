<template>
<div class='goodsdesc-container'>
    <h3 class="title">{{desc.title}}</h3>
       <hr>
    <div class="content" v-html="desc.content">
    </div>
</div>
</template>
<script>
import {Toast} from "mint-ui"
export default{
  data(){
      return{
          id:this.$route.params.id,
          desc:{}
      }
  },
  created(){
      this.getGoodsDesc()
  },
  methods:{
    //获取商品图文详情
      getGoodsDesc(){
          this.$http.get("api/goods/getdesc/"+this.id).then(result=>{
              if(result.body.status===0){
                  this.desc=result.body.message[0];
              }else{
                  Toast('获取商品图文详情失败')
              }
          })
      }
  }
}
</script>
<style lang='scss' >
.goodsdesc-container{
    h3{
      font-size: 16px;
      color:#226aff;
      text-align:center;
      margin:15px 0;
    }
    .content{
        img{
            width:100%;
        }
    }
}
</style>