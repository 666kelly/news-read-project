<template>
<div class='photoinfo-container'>

<h3>{{photoinfo.title}}</h3>
<p class='subtitle'>
    <span>发表时间:{{photoinfo.add_time | dataFormate}}</span>
    <span>点击：{{photoinfo.click}}次</span>
</p>
<hr>
<!--缩略图区-->
    <div class="thumbs">
      <!-- 使用 v-for 循环渲染缩略图 -->
      <vue-preview :slides="photolist" @close="handleClose"></vue-preview>
    </div>
<!--图片内容区-->
<div class="content" v-html='photoinfo.content'>

</div>
<!--评论区-->
<cmt-box :id='id'></cmt-box>
</div>
</template>
<script>
import {Toast} from "mint-ui"
import comment from '../subcomponents/Comment.vue'
export default{
         data(){
             return{
                 id: this.$route.params.id,
                 photoinfo:[],
                 photolist:[]   //缩略图数组
             }
         },
         created(){
             this.getPhotoInfo()
             this.getHumImag()
         },
         methods:{
             //获取图片详情
             getPhotoInfo(){
                 this.$http.get("api/getimageInfo/"+this.id).then(result=>{
                     if(result.body.status===0){
                         this.photoinfo=result.body.message[0]
                     }
                     else{
                         Toast('获取图片详情失败')
                     }
                 })
             },
             getHumImag(){
                 //获取图片缩略图
                 this.$http.get("api/getthumimages/"+this.id).then(result=>{
                     if(result.body.status===0){
                         result.body.message.forEach(item=>{
                             //循环每个图片数据，补全图片的宽高
                             item.w=600;
                             item.h=400;
                             item.msrc=item.src;
                         })
                         //把完整的数据放到list中
                         this.photolist=result.body.message;
                     }
                     else{
                         Toast('获取图片缩略图失败')
                     }
                 })
             }
         },
         components:{
             'cmt-box':comment
         }
}
</script>
<style lang='scss' scoped>
.photoinfo-container{
    padding:3px;
    h3{
        color:#26A2ff;
        font-size:15px;
        text-align: center;
        margin:15px;
    }
    .subtitle{
        display:flex;
        justify-content: space-between;
        font-size:13px;
    }
    .content{
        font-size:13px;
        line-height:30px;
    }
  .thumbs{
    display: flex;
  }

}
</style>