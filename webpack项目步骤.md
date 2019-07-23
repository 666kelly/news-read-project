创建项目文件夹



用npm的包管理工具管理起来 `npm init -y`  其中`-y`是`yes`，表示跳过提问阶段直接生成`package`文件
npm i jquery -S

如果创建的项目名称是中文则不能加`-y`，需要回答问题

创建`dist`文件夹， 是项目打包之后输出的文件夹

创建`src`文件夹

创建`/src/index.html`这是项目的首页

创建`/src/main.js`  项目的入口文件

然后 `
npx webpack .\src\main.js -o .\dist\bundle.js --mode development`命令
然后在项目的根目录中新建一个 `webpack.config.js` 

先配置config文件中的path，然后用webpack命令执行，
```js
const path = require('path')
module.exports = {

  entry: path.join(__dirname, './src/main.js'),// 入口，表示，要使用 webpack 打包哪个文件
  output: { // 输出文件相关的配置
    path: path.join(__dirname, './dist'), // 指定 打包好的文件，输出到哪个目录中去
    filename: 'bundle.js' // 这是指定 输出的文件的名称
  }
```

因为`webpack`打包命令每次都要输入十分麻烦，所以需要安装  `webpack-dev-server`
:先用cmdanzhuang webpack4.0.0
npm i webpack@^4.0.0 -g

`cnpm i webpack-dev-server -D`,同时根据提示需要同时在项目本地中安装`webpack`,


为了用`webpack-dev-server`,需要在`package.json`中添加脚本:

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot",
  }
  
```

然后使用`npm run dev`删包，然后执行cnpm i,接着安装   npm i webpack -D  npm i webpack-cli -D



`webpack-dev-server`会帮我们托管资源此时`script`标签中`../dist/bundle.js`路径是错误的，正确的应该是`/bundle.js`,

这时候我们使用`html-webpack-plugin`插件解决这个问题  `npm i html-webpack-plugin -D`

可以在内存中根据指定的模板页面生成一份内存中的首页，同时自动把打包好的bundle注入到页面的底部，

同时如果要配置插件，需要在导出的对象中挂在一个plugins节点

```js
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), //制定模板文件路径
            filename: 'index.html'   //指定生成页面的名称
        })
    ],
}
```





添加css,在/css中创建css文件

在`main.js`中添加

```js
import './css/index.css'
```

这样会报错，因为webpack处理不了非JS文件

安装`style-loader`和`css-loader`------>`cnpm i style-loader css-loader -D`

在webpack中添加module，配置所有第三方loader模块

module中的rules是第三方模块的匹配规则

```js
module:{
        rules: [
          
            {test: /\.css$/, use:['style-loader', 'css-loader']}, //配置.css文件的第三方loader规则
            {test: /\.less$/, use:['style-loader', 'css-loader' ,'less-loader']}, //配置处理.less文件的第三方loader规则 
            {test: /\.scss/, use:['style-loader', 'css-loader', 'less-loader']}
        ]
    }
```

其中use中的使用顺序是从右往左    5. npm i less-loader -D     npm i less -D    
    6. cnpm i sass-loader node-sass -D

    url地址

    cnpm i url-loader file-loader -D
    修改{ test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }, 
     处理文字，cnpm i bootstrap -S
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }
   webpack中使用vueS
    cnpm i vue -S

vue和webpack结合
1cnpm i vue -S
1.装包cnpm i vue-loader vue-template-compiler -D

3，在main.js中导入vue模块import Vue from 'vue'
4.定义一个。vue结尾的组件，template
5 导入这个组件
6 创建vm实例
7 创建app的div


在配置文件中配置文件 {test:/\.vue$/,use:'vue-loader'}
和
*/const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    devtool: "sourcemap",
    entry: './js/entry.js', // 入口文件
    output: {
        filename: 'bundle.js' // 打包出来的文件
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ],
    module : {
        ...
    }
}



/路由
cnpm i vue-router -S
2手动安装vue-Router Vue.use()
项目名称第一个字母必须大写
mint使用
cnpm i mint-ui -S


mui:不能使用npm下载，从Git上下载，