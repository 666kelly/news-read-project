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

