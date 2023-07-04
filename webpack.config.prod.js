// For info about this file refer to webpack and webpack-hot-middleware documentation
// For info on how we're generating bundles with hashed filenames for cache busting: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.w99i89nsz
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';
import path from 'path';
import config from './storefront/config.js';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false
};

export default {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    devtool: 'source-map', // more info:https://webpack.js.org/guides/production/#source-mapping and https://webpack.js.org/configuration/devtool/
    entry: path.resolve(__dirname, 'src/index'),
    target: 'web',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/' + config.directory,
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        // Hash the files using MD5 so that their names change when the content changes.
        new WebpackMd5Hash(),

        // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
        new webpack.DefinePlugin(GLOBALS),

        // Generate an external css file with a hash in the filename
        new ExtractTextPlugin('[name].[md5:contenthash:hex:20].css'),

        // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            title: config.title,
            favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            // Note that you can add custom options here if you need to handle other custom logic in index.html
            // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
            trackJSToken: '',
            appMountHtmlSnippet: '<div class="loader">Loading...</div>',
            headHtmlSnippet: '<link href="' + config.fontStylesheet + '" rel="stylesheet"><style>.loader,.loader:after{border-radius:50%;width:10em;height:10em}.loader{margin:60px auto;font-size:10px;position:relative;text-indent:-9999em;border-top:1.1em solid rgba(238,238,238,0.2);border-right:1.1em solid rgba(238,238,238,0.2);border-bottom:1.1em solid rgba(238,238,238,0.2);border-left:1.1em solid #eee;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);-webkit-animation:load8 1.1s infinite linear;animation:load8 1.1s infinite linear}.loader:after{content:""}@-webkit-keyframes load8{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes load8{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}</style>'
        }),

        // Copy the storefront and images to the dist directory.
        new CopyWebpackPlugin([
            {from: 'src/images', to: 'images'},
            {from: 'src/icons', to: 'icons'},
            {from: 'storefront/storefront.html', to: 'storefront.html'},
            {from: 'storefront/browserupdate.html', to: 'browserupdate.html'},
            {from: 'storefront/assets', to: 'assets'},
            {from: 'storefront/vendor', to: 'vendor'},
            {from: 'storefront/.htaccess', to: '.htaccess', toType: 'file'}
        ]),

        // Include CSS overrides
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [{ path: config.styleOverrides, type:'css' }],
            append: true
        })

    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/octet-stream',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'image/svg+xml',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /(\.css|\.scss|\.sass)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')
                                ],
                                sourceMap: true
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [path.resolve(__dirname, 'src', 'scss')],
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    }
};
