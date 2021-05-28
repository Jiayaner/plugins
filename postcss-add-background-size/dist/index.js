const postcss = require("postcss");
const path = require("path");
const sizeOf = require("image-size");

const DEFAULT_UNIT = "px";
const DEFAULT_VALUE = 0;
const DEFAULT_EXCLUDE_IMAGE = ["http"];

let fileInfoSession = new Map();

const getRealCssValue = function (value, type, baseValue) {
  switch (type) {
    case "vw":
      return ((+value * 100) / +baseValue).toFixed(2) + type;
    case "vh":
      return ((+value * 100) / +baseValue).toFixed(2) + type;
    case "rem":
      return (+value / +baseValue / 10).toFixed(2) + type;
    default:
      return value + type;
  }
};

const canDealImage = function (excludeArr, targetUrl) {
  if (Object.prototype.toString.call(excludeArr) !== "[object Array]") {
    return true;
  }
  let realExcludeArr = DEFAULT_EXCLUDE_IMAGE.concat(excludeArr);
  let excludeRegStr = realExcludeArr.join("|");
  let excludeReg = new RegExp(excludeRegStr);
  return !excludeReg.test(targetUrl);
};

module.exports = postcss.plugin("postcss-add-background-size", ({ cssPath = "", width: widthConf, height: heightConf, exclude }) => {
  return (root) => {
    root.walkRules((rule) => {
      rule.walkDecls(/^background-?/, ({ value }) => {
        let resArr = value.match(/url\(("|')?([.\/a-z0-9A-Z_-]+)("|')?\)/);

        // 网络图片不加载
        if (resArr && resArr[2] && canDealImage(exclude, resArr[2])) {
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

          if (fileInfo.width && fileInfo.height) {
            let curWidthUnit = DEFAULT_UNIT,
              curWidthValue = DEFAULT_VALUE;
            let curHeightUnit = DEFAULT_UNIT,
              curHeightValue = DEFAULT_VALUE;

            if (widthConf && widthConf.unit && widthConf.unit != DEFAULT_UNIT && +widthConf.value) {
              curWidthUnit = widthConf.unit;
              curWidthValue = widthConf.value;
            }
            if (heightConf && heightConf.unit && heightConf.unit != DEFAULT_UNIT && +heightConf.value) {
              curHeightUnit = heightConf.unit;
              curHeightValue = heightConf.value;
            }
            rule.append({
              prop: "width",
              value: getRealCssValue(fileInfo.width, curWidthUnit, curWidthValue),
            });
            rule.append({
              prop: "height",
              value: getRealCssValue(fileInfo.height, curHeightUnit, curHeightValue),
            });
            rule.append({
              prop: "background-size",
              value: "contain",
            });
            fileInfoSession.set(resArr[2], { width: fileInfo.width, height: fileInfo.height });
          } else {
            console.error(`set the width and height value err : ${resArr[2]}`);
          }
        }
      });
    });
  };
});
