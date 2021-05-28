# postcss-add-background-size
识别css样式中url（）加载的本地图片,为元素自动添加width和height。支持px、vh、vw、rem。同名文件变更需重启服务

插件可配置参数:
| key |type  |  info|
| --- | --- |--- |
| cssPath | string |  css、scss文件的位置，以项目跟目录为基准|
| width | object |  见options，不设默认px|
| height | object |  见options，不设默认px|
| exclude | array |  排除图片|

options：
| key |type  |  info|
| --- | --- |--- |
| unit | string | 单位，可选px、vw、vh、rem|
| value | number |  基准值，不设默认0|


### 例子

./src/testProject/scss/test.scss
./src/testProject/img/button1.png (100*60)
./src/testProject/img/button2.png (100*60)

```css
  
.button1{
  background:url(../img/button1.png);
}
.button2{
  background:url(../img/button2.png);
}

```

##### 案例1

webpack.config.js:
```js
{
  loader: "postcss-loader",
  options: {
  plugins: () => [require("postcss-add-background-size")({ 
    cssPath: "src/testProject/scss" 
   })],
  },
}

```
最终效果：
```css
.button1{
  background:url(../img/button1.png);
  width:100px;
  height:60px;
  background-size:contain;
}
.button2{
  background:url(../img/button2.png);
  width:100px;
  height:60px;
  background-size:contain;
}

```


##### 案例2

webpack.config.js:
```js
{
  loader: "postcss-loader",
  options: {
  plugins: () => [require("postcss-add-background-size")({ 
    cssPath: "src/testProject/scss",
    width:{
      unit:"vw",
      value:1920
    },
    height:{
      unit:"vw",
      value:1920
    }
   })],
  },
}

```
最终效果：
```css
.button1{
  background:url(../img/button1.png);
  width:5.20vw;
  height:3.12vw;
  background-size:contain;
}
.button2{
  background:url(../img/button2.png);
  width:5.20vw;
  height:3.12vw;
  background-size:contain;
}

```

##### 案例3

webpack.config.js:
```js
{
  loader: "postcss-loader",
  options: {
  plugins: () => [require("postcss-add-background-size")({ 
    cssPath: "src/testProject/scss",
    exclude:["2"]
   })],
  },
}

```
最终效果：
```css
.button1{
  background:url(../img/button1.png);
  width:100px;
  height:60px;
  background-size:contain;
}
.button2{
  background:url(../img/button2.png);
}

```
