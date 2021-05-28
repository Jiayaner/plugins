# postcss-add-background-size

### 功能
识别 css 样式中 url（）加载的本地图片,为元素自动添加 width 和 height。

### 说明
> 1、支持 px、vh、vw、rem。

> 2、width、height、background-size可在当前类名下重写。

> 3、同名文件变更需重启服务。


### 参数
插件参数:
| 属性 |值类型 | 说明|必选|
| --- | --- |--- |--- |
| width | object | 见 options，不设默认 px|否|
| height | object | 见 options，不设默认 px|否|
| exclude | array | 排除图片|否|

options：
| 属性 |值类型 | 说明|必选|
| --- | --- |--- |--- |
| unit | string | 单位，可选 px、vw、vh、rem|是|
| value | number | 基准值，不设默认 0|是|

### 例子

> ./src/testProject/scss/test.scss

> ./src/testProject/img/button1.png (100*60)

> ./src/testProject/img/button2.png (100*60)

```css
.button1 {
  background: url(../img/button1.png);
  color:black;
}
.button2 {
  background: url(../img/button2.png);
  color:black;
}
```

##### 案例 1

webpack.config.js:

```js
{
  loader: "postcss-loader",
  options: {
  plugins: () => [require("postcss-add-background-size")()],
  },
}

```

最终效果：

```css
.button1 {
  background: url(../img/button1.png);
  width: 100px;
  height: 60px;
  background-size: contain;
  color:black;
}
.button2 {
  background: url(../img/button2.png);
  width: 100px;
  height: 60px;
  background-size: contain;
  color:black;
}
```

##### 案例 2

webpack.config.js:

```js
{
  loader: "postcss-loader",
  options: {
  plugins: () => [require("postcss-add-background-size")({
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
.button1 {
  background: url(../img/button1.png);
  width: 5.2vw;
  height: 3.12vw;
  background-size: contain;
  color:black;
}
.button2 {
  background: url(../img/button2.png);
  width: 5.2vw;
  height: 3.12vw;
  background-size: contain;
  color:black;
}
```

##### 案例 3

webpack.config.js:

```js
{
  loader: "postcss-loader",
  options: {
  plugins: () => [require("postcss-add-background-size")({
    exclude:["2"]
   })],
  },
}

```

最终效果：

```css
.button1 {
  background: url(../img/button1.png);
  width: 100px;
  height: 60px;
  background-size: contain;
  color:black;
}
.button2 {
  background: url(../img/button2.png);
  color:black;
}
```
