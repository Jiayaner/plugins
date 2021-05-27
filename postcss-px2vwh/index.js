'use strict';

var postcss = require('postcss');
var Px2vwh = require('px2vwh');

module.exports = postcss.plugin('postcss-px2vwh', function(options) {
    return function(css, result) {

        var newCssObj = css;
        if (options.reg && options.reg.test) {
            options.reg.lastIndex = 0;

            if (options.reg.test(css.source.input.file)) {
                var oldCssText = css.toString();
                var px2vwhInit = new Px2vwh(options);
                var newCssText = px2vwhInit.generateValue(oldCssText);
                newCssObj = postcss.parse(newCssText);
            }
        }


        result.root = newCssObj;
    };
});