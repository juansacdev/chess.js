const HTMLWebpackPlugin =  require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: `${__dirname}/public`,
        filename: 'bundle.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ]
}