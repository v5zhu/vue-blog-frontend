// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        sitEnv: require('./sit.env'),
        prodEnv: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',          //请根据自己路径配置更改
        staticPath: '/static/',          //请根据自己路径配置更改
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        staticPath: '/static/',
        proxyTable: {
            '/blog': {
                // target: 'http://blog.mofaxue.com',
                target: 'http://localhost:8866',
                changeOrigin: true,
                pathRewrite: {
                    '^/': ''
                }
            },
            '/thirdapi': {
                // target: 'http://blog.mofaxue.com',
                target: 'http://localhost:8800',
                changeOrigin: true,
                pathRewrite: {
                    '^/': ''
                }
            }
        },
        cssSourceMap: false
    }
}
