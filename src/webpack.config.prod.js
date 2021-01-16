const path = require('path');

const {
    VueLoaderPlugin
} = require('vue-loader')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = env => {
    return {
        entry: ['@babel/polyfill', './app.js'],
        target: ['web', 'es2017'],
        mode: "production",
        module: {
            rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                // options...
                            }
                        }
                    ]
                }
            ]

        },
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
        },
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
            host: '0.0.0.0',
            port: 8000
        },
        plugins: [
            // make sure to include the plugin!
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/styles.css'
            }),
        ]
    }
};
