// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';
const TerserPlugin = require('terser-webpack-plugin');


const stylesHandler = 'style-loader';

const SRC_DIR = path.join(__dirname, './client/src');
const DSC_DIR = path.join(__dirname, './client/dist');

const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

const config = {
    entry: `${SRC_DIR}/index.jsx`,
    output: {
        path: DSC_DIR,
        filename: 'main.js'
    },
    plugins: [
        new ImageminPlugin({
            // imagemin-webp docs: https://github.com/imagemin/imagemin-webp
            plugins: [ImageminWebP({quality: 50})]
          }),
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ]
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false
        })]
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};
