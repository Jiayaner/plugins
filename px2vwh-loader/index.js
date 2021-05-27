var loaderUtils = require('loader-utils');
var Px2vwh = require('px2vwh');

module.exports = function (source) {
  var options = loaderUtils.getOptions(this);
  var px2vwhInit = new Px2vwh(options);
  return px2vwhInit.generateValue(source);
};
