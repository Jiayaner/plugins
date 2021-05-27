webpack配置:
module.exports = {
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "px2vwh-loader",
                        options: {
                           width: 1000,
                           height: 600
                        }
                    }
                ]
            }]
    }
}