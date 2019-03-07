const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const cssPlugin = new MiniCssExtractPlugin({
    filename: '[name].min.css'
});
const optimizeCssPlugin = new OptimizeCSSAssetsPlugin({});

const isProd = process.env.NODE_ENV === 'production';

const config = {
    entry: {
        main: './index.js',
        icon: './static/style/icon.css'
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'build'),
        library: 'react-components',
        libraryTarget: 'umd'
    },
    plugins: [cssPlugin],
    optimization: {
        minimizer: [optimizeCssPlugin]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: [path.join(__dirname, 'node_modules')]
            },
            {
                test: /static\/style\/icon\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /.(svg|eot|ttf|woff)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            utils: path.join(__dirname, 'src/utils'),
            components: path.join(__dirname, 'src/components'),
            interfaces: path.join(__dirname, 'src/interfaces'),
            style: path.join(__dirname, 'src/style'),
            decorators: path.join(__dirname, 'src/decorators'),
            stores: path.join(__dirname, 'src/stores'),
            config: path.join(__dirname, 'src/config.js'),
            tests: path.join(__dirname, 'tests'),
            src: path.join(__dirname, 'src')
        }
    },
    externals: {
        react: {
            root: 'React',
            amd: 'react',
            commonjs: 'react',
            commonjs2: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            amd: 'react-dom',
            commonjs: 'react-dom',
            commonjs2: 'react-dom'
        },
        'styled-components': {
            root: 'StyledComponents',
            amd: 'styled-components',
            commonjs: 'styled-components',
            commonjs2: 'styled-components'
        },
        moment: {
            root: 'moment',
            amd: 'moment',
            commonjs: 'moment',
            commonjs2: 'moment'
        }
    },
    devtool: isProd ? false : 'eval-source-map'
};

if (isProd) {
    config.devtool = false;
    if (!config.plugins) {
        config.plugins = [];
    }
    config.plugins.push(
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                    pure_funcs: ['console.log']
                }
            }
        })
    );
}

module.exports = config;
