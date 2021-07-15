const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const babelConfig = require('./.babelrc.json');

const cssPlugin = new MiniCssExtractPlugin({
    filename: '[name].min.css'
});

const isProd = process.env.NODE_ENV === 'production';
const isAnalyzer = !!process.env.ANALYZER;

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
    optimization: {},
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                use: {
                    loader: 'babel-loader',
                    options: babelConfig
                },
                exclude: /node_modules\/(?!(ansi-styles|strip-ansi|ansi-regex|react-dev-utils|chalk|regexpu-core|unicode-match-property-ecmascript|unicode-match-property-value-ecmascript|acorn-jsx|estree-walker|pretty-bytes)\/).*/
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
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            src: path.join(__dirname, 'src'),
            tests: path.join(__dirname, 'tests'),
            shared: path.join(__dirname, 'shared')
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
        moment: {
            root: 'moment',
            amd: 'moment',
            commonjs: 'moment',
            commonjs2: 'moment'
        }
    },
    devtool: 'eval-source-map'
};

if (isAnalyzer) {
    config.plugins.push(new BundleAnalyzerPlugin());
}

if (isProd) {
    config.devtool = false;
    config.optimization.minimize = true;
}

module.exports = config;
