 <template>
<div >
	<!--不知道什么时候能拿到max，但是总归有一刻，会得到一个真正的max值
	我们可以使用watch监听max监听父组件传递过来的max值，不管watch会被触发几次，但是最后一次，肯定是一个合法的max数值--->
					<div class="mui-numbox" data-numbox-min='1' data-numbox-max>
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
</div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js"
export default{
	//初始化数字选择框组件
	mounted(){
		mui('.mui-numbox').numbox();
	},
	methods:{
		countChanged(){
			//每当文本框的数据被修改的时候，立即把最新数据通过事件调用传递给父组件
         this.$emit('getcount',parseInt(this.$refs.numbox.value))
		}
	},
	props:["max"],
	watch:{
		//使用js的API设置numbox最大值
		'max':function(newVal,oldVal){
           mui('.mui-numbox').numbox().setOption('max',newVal)
		}
	}
		
	

}
</script>
<style lang='scss' scoped>

</style>