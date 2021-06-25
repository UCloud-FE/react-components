const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HTMLWebpackPlugin = require('html-webpack-plugin');

const babelConfig = require('../.babelrc.json');

const isProd = process.env.NODE_ENV === 'production';
const isAnalyzer = !!process.env.ANALYZER;

const externals = {};
['moment', 'react', 'react-dom'].forEach(dep => {
    externals[dep] = ['__recodo_module_namespace__', dep];
});

const config = {
    entry: path.join(__dirname, './index.tsx'),
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'react-components-docs',
        libraryTarget: 'global'
    },
    plugins: [new HTMLWebpackPlugin({ template: path.join(__dirname, './index.html'), nodeModules: false })],
    optimization: {},
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                use: {
                    loader: 'babel-loader',
                    options: babelConfig
                }
            }
        ]
    },
    externals: {
        ...externals
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    devtool: 'eval-source-map',
    node: {
        fs: 'empty'
    }
};

if (isAnalyzer) {
    config.plugins.push(new BundleAnalyzerPlugin());
}

if (isProd) {
    config.devtool = false;
    config.optimization.minimize = true;
}

module.exports = config;
