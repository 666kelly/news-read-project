##制作首页App组件
1 完成Header区域，使用的mint-ui中的header组件
2 制作底部的Tabber区域，使用的是mui的Tabber.html
  *在只做购物车图标麻烦
  *先把扩展图标的css样式拷贝到项目
  *然后把.tff文件拷贝到项目中
  *为购物车添加如下样式
3 在中间区域放置一个router-view展示路由匹配的组件
##改造Tabber为router-link

##设置路由高亮

##点击tabber中的路由连接，展示对应的路由组件

##加载首页轮播图数据
1获取数据用,使用view-resource,

2使用vue-resource的this.$http.get 获取数据
3获取到的数据要保存到data身上
4使用v-for循环渲染到每个item上
##端口占用问题；修改package。json的接口为其他
##改造新闻资讯路由连接
##新闻页面制作
1.绘制页面,使用mui中的media-list
2.使用vue-resource绘制页面
3.渲染真实数据
##实现新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为router-link，同时在跳转的时候应该提供唯一的ID标志符
2. 创建新闻详情的组件页面，NewsInfo.vue
3. 在路由模块中，将新闻详情的路由地址和组件页面对应起来
##实现新闻详情的页面布局和数据渲染
##单独封装一个commet.vue评论子组件
1 先创建一个单独的comment.vue组件模板
2 在需要使用comment组件的页面中，先手动导入comment组件
  import comment from './comment.vue'
4 在父组件中，使用'components'属性，将刚才导入comment组件，注册为自己的组件
5 将注册子组件时候的注册名称，以标签形式，在页面中引用即可。
##获取所有的评论数据显示到页面中
##实现点击加载更多评论的功能
1 为加载更多按钮，绑定点击事件，在事件中请求下一页数据。
3 点击加载更多，让pageIndex++，然后重新调用this.getComments方法，重新获取最新一页的数据，
3 为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每当获取到新数据，应该让老数据调用数组的concat方法，拼接上新数据