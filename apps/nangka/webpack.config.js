const path = require('path');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");


module.exports = {

    mode: 'production',

    bail: true,

    devtool: 'source-map',

    entry: {
    },

    output: {
        path: path.join(process.cwd(), `dist/nangka`),
        filename: "[name].js",
        chunkFilename:'[name].chunk.js',
        publicPath: `./nangka/`,
        jsonpFunction: "webpackJsonpModuleFederation",
        globalObject: "this",
        uniqueName: `module-federation-nangka`
    },

    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'all',
            name: false
        },
        // runtimeChunk: {
        //     name: ep => `runtime-${ep.name}`
        // }
    },

    resolve: {
        modules: ['node_modules'],

        extensions: ['.tsx', '.ts', '.jsx', '.js'],

        plugins: [
            PnpWebpackPlugin
        ],
    },

    resolveLoader: {
        plugins: [
            PnpWebpackPlugin.moduleLoader(module)
        ]
    },

    module: {
        strictExportPresence: true,
        rules: [
            {parser: {requireEnsure: false}},

            {
                oneOf: [
                    {
                        test: /\.(tsx|ts)/,
                        include: path.resolve(__dirname, 'src'),
                        loader: require.resolve('babel-loader'),
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
                            customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                            cacheDirectory: true,
                            cacheCompression: false,
                            compact: true,
                        }
                    },
                    {
                        test: /\.(scss|sass)$/,
                        use: [
                            {loader: require.resolve('css-loader'), options: {importLoaders: 3, sourceMap: true}},
                            {loader: require.resolve('sass-loader'), options: {sourceMap: true}}
                        ],
                        sideEffects: true,
                    }
                ]
            }
        ]
    },

    plugins: [

        new CleanWebpackPlugin(),

        new ModuleFederationPlugin({
            name: 'nangka',
            remotes: {
                tembin: "tembin@/tembin/tembin-remote-entry.js"
            },
            exposes: {
                "./Routes": "./apps/nangka/src/routes"
            },
            filename: 'nangka-remote-entry.js',
            shared: {
                react: {
                    singleton: true,
                    eager: true
                },
                "@shared/library": {
                    singleton: true,
                    eager: true,
                    import: "./apps/tembin/src/shared"
                }
            }
        })

    ].filter(Boolean)
}

