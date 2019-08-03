 <template>
<div >
	<!--不知道什么时候能拿到max，但是总归有一刻，会得到一个真正的max值
	我们可以使用watch监听max监听父组件传递过来的max值，不管watch会被触发几次，但是最后一次，肯定是一个合法的max数值--->
					<div class="mui-numbox" data-numbox-min='1' style="height:20px;">
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly/>
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
           // console.log(this.$refs.numbox.value)
            //每当数量值改变则把最新的数量同步到购物车的store中，覆盖之前的数量值
		this.$store.commit('updateGooodsInfo',{id:this.goodsid, count:this.$refs.numbox.value})
		}
    },
    props:['initcount','goodsid']
	

}
</script>
<style lang='scss' scoped>

</style>