const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
    devtool: 'source-map',
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.svg'],
    },
    module: {
        rules: [
            { test: /\.(ts|tsx)?$/, loader: 'awesome-typescript-loader' },
            { test : /\.css$/, use:['style-loader', 'css-loader'] },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            hash: true,
            filename: "index.html",  //target html
            template: "./src/index.html" //source html
        })
    ]
}
