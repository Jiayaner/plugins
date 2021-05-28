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
  let realExcludeArr = DEFAULT_EXCLUDE_IMAGE.concat(excludeArr);
  let excludeRegStr = realExcludeArr.join("|");
  let excludeReg = new RegExp(excludeRegStr);
  return !excludeReg.test(targetUrl);
};

module.exports = postcss.plugin("postcss-add-background-size", (options) => {
  return (root, result) => {
    root.walkRules((rule) => {
      rule.walkDecls(/^background-?/, (decl) => {
        let resArr = decl.value.match(/url\(("|')?([.\/\w-]+)("|')?\)/);
        let realExcludeArr = options && Object.prototype.toString.call(options.exclude) == "[object Array]" ? options.exclude : [];
        if (resArr && resArr[2] && canDealImage(realExcludeArr, resArr[2])) {
          let fileInfo;
          if (fileInfoSession.has(resArr[2])) {
            fileInfo = fileInfoSession.get(resArr[2]);
          } else {
            try {
              let fromUrl = decl.source.input.file || result.opts.from || "";
              let curFileUrl = fromUrl.replace(/[\w-]+\.[a-z]+$/, "");
              let fileUrl = path.resolve(curFileUrl, resArr[2]);
              fileInfo = sizeOf(fileUrl);
            } catch (error) {
              console.log("load image err");
            }
          }
          if (fileInfo && fileInfo.width && fileInfo.height) {
            let curWidthUnit = options && options.width && options.width.unit && options.width.unit != DEFAULT_UNIT && +options.width.value ? options.width.unit : DEFAULT_UNIT,
              curWidthValue = options && options.width && options.width.unit && options.width.unit != DEFAULT_UNIT && +options.width.value ? options.width.value : DEFAULT_VALUE,
              curHeightUnit = options && options.height && options.height.unit && options.height.unit != DEFAULT_UNIT && +options.height.value ? options.height.unit : DEFAULT_UNIT,
              curHeightValue = options && options.height && options.height.unit && options.height.unit != DEFAULT_UNIT && +options.height.value ? options.height.value : DEFAULT_VALUE;

            rule.insertAfter(decl, {
              prop: "width",
              value: getRealCssValue(fileInfo.width, curWidthUnit, curWidthValue),
            });
            rule.insertAfter(decl, {
              prop: "height",
              value: getRealCssValue(fileInfo.height, curHeightUnit, curHeightValue),
            });
            rule.insertAfter(decl, {
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
