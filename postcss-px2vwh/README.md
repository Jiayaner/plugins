# postcss-px2vwh
you can use this plugin to convert 'px' to 'vw' or 'vh'.

## how to use?
### vue-cli3 vue.config.js
```javascript
module.exports={
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2vwh')({
                        width: 1920,                    //your psd's width
                        height: 1080,                   //your psd's height
                        reg: /\/h5\/[a-zA-Z0-9]*.vue$/  //which file will you convert
                    }),
                ]
            }
        }
    }
}
```
### use
```css
div{
    width:192vw;
    height:108vh;
    border:1px solid grey;
}
```
after compile
```css
div{
    width:10vw;
    height:10vh;
    border:1px solid grey;
}
```
