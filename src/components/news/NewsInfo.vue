<template>
<div class='newsinfo_container' >

<h3 class='title'>{{newsinfo.title}}</h3>
<p class='subtitle'>
    <span>发表时间:{{newsinfo.add_time | dateFormat}}</span>
    <span>点击：{{newsinfo.click}}次</span>
</p>
<hr>
<!--内容区域-->

<div class="content" v-html='newsinfo.content'></div>
<!--评论区子组件区域-->
<comment-box :id='this.id'> 
   
</comment-box>
</div>
</template>
<script>
///导入评论子组
import comment from '../subcomponents/Comment.vue'
import {Toast} from 'mint-ui'
 export default{
    data(){
        return{
            id: this.$route.params.id,//url中传递的ID值挂载到
            newsinfo:[]
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(
                result=>{
                if(result.body.status===0){
                  this.newsinfo=result.body.message[0]
                }
                else{
                    Toast('获取新闻失败')
                }
            }
            )
        }
    },
    components:{
        //用来注册子组件
        'comment-box':comment
    }
}
</script>
<style lang='scss' >
   .newsinfo_container{
       padding: 4px;
       .title{
           font-size: 16px;
           text-align: center;
           margin:15px 0;
           color:red;
       }
       .subtitle{
           font-size:13px;
           color:#226aff;
           display:flex;
           justify-content: space-between;
       }
   }
</style>