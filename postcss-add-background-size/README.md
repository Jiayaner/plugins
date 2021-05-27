# postcss-add-background-size
Set the width and height values ​​according to the width and height of the local image.

params:
| key | type | info |
| cssPath | string |  css file path which is based on pwd（）  |

webpack.config.js:
```js
  
 {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("postcss-add-background-size")({ cssPath: "src/" + ename + "/scss" })],
            },
          },
          "sass-loader",
        ],
      },

```

scss file:
```css
  
.button{
  background:url(../button.png);
}

```

output:
```css
  
.button{
  background:url(../button.png);
  width:100px;
  height:60px;
}

```
