const path = require('path');

module.exports = {
    mode: 'production',
    entry: './app.js',
    output: {
        filename: 'app.build.js',
        path: __dirname + ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    target: 'web',
    node: {
        console: true
    }
};