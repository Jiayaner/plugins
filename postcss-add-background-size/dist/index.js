const postcss = require("postcss");
const path = require("path");
const sizeOf = require("image-size");

let fileInfoSession = new Map();

module.exports = postcss.plugin("postcss-add-background-size", ({ cssPath = "" }) => {
  return (root) => {
    root.walkRules((rule) => {
      rule.walkDecls(/^background-?/, ({ value }) => {
        var resArr = value.match(/url\(("|')?([.\/a-z0-9A-Z_-]+)("|')?\)/);
        // 网络图片不加载
        if (resArr && resArr[2] && !/^http/.test(resArr[2])) {
          let fileInfo = null;
          if (fileInfoSession.has(resArr[2])) {
            fileInfo = fileInfoSession.get(resArr[2]);
          } else {
            try {
              var fileUrl = path.resolve(process.cwd(), cssPath, resArr[2]);
              fileInfo = sizeOf(fileUrl);
            } catch (error) {
              console.log("load image err");
              throw error;
            }
          }
          let { width, height } = fileInfo;
          if (width && height) {
            rule.append({
              prop: "width",
              value: `${width}px`,
            });
            rule.append({
              prop: "height",
              value: `${height}px`,
            });
            rule.append({
              prop: "background-size",
              value: "contain",
            });
            fileInfoSession.set(resArr[2], { width: width, height: height });
          } else {
            console.error(`set the width and height value err : ${resArr[2]}`);
          }
        }
      });
    });
  };
});
