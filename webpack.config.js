var path = require("path")

module.exports = {
    entry: path.resolve(__dirname, "app/app.js"),
    output: {
        path: path.resolve(__dirname, "public/js"),
        filename: "bundle.js"
    },
    watch: true,
    target: "electron-renderer",
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                loader: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
}