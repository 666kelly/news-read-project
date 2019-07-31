<template>
<div >
<div id="slider" class="mui-slider">
	<!--顶部滑动条-->
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll" >
						<a :class="['mui-control-item',item.id==0? 'mui-active' : '']" 
						v-for='item in category'
						:key="item.id"
						@click="getPhotoListByCateId(item.id)">
							{{item.title}}
						</a >
					</div>
				</div>

			</div>
<!--图片列表-->
			<ul class='photo-list'>
                <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag='li'>
                  <img v-lazy="item.img_url">
				  <div class='info'>
					  <h1 class="title">{{item.title}}</h1>
					  <div class="body">{{item.zhaiyao}}</div>
				  </div>
                </router-link >
                </ul>
</div>
</template>
<script>
//导入mui的js文件
import mui from '../../lib/mui/js/mui.min.js'
import {Toast} from "mint-ui"
export default{
    data(){
        return{
			category:[], //所有分类的列表数据
			list:[]//图片列表的数据
		};
	},
	created(){
		this.getCategory()
		this.getPhotoListByCateId(0)
	},
    mounted(){
        //当组件中的dom结构被渲染好并放到页面中后，会执行这个钩子函数
        //如果要操作dom元素，最好在mounted里面，这时候的dom元素是最新的
         //2初始化滑动控件
       mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
    },
    methods:{
		//获取图片分类列表
		getCategory(){
              this.$http.get("api/getimgcategory").then(
				  result=>{
					  if(result.body.status===0){
						  result.body.message.unshift({title:'全部',id:0})
						  this.category=result.body.message
					  }
					  else{
                       Toast('获取图片列表失败')
					  }
				  }
			  )
		},
		getPhotoListByCateId(catId){
			this.$http.get("api/getimages/"+catId).then(
				  result=>{
					  if(result.body.status===0){
						  this.list=result.body.message
					  }
					  else{
                       Toast('获取图片失败')
					  }
				  }
			  )
		}
	}
    
}
</script>
<style lang='scss' scoped>
  *{
      touch-action: pan-y;
  }
 
  .photo-list{
	  	 margin:0;
		  padding:10px;
		  padding-bottom:0;
	  li{
		  background-color: #ccc;
		  list-style: none;
		  text-align: center;
		   margin-bottom:10px;
		   box-shadow: 0 0 6px #999;
		   position:relative;

         img{
	     width:100%;
		  vertical-align: middle;
		 
         }
         
		 img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.info{
position:absolute;
color:white;
text-align:left;
bottom: 0px;
background-color: rgba(0,0,0,0.4);
max-height:84px;
	.title{
           font-size:14px;
	}
	.body{
         font-size:13px;
	}
}
	  }
  }
  
</style>