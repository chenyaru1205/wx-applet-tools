const cwd = process.cwd()
const path = require('path')
const less = require('@remax/plugin-less')
const webpackCopyPlugin = require('copy-webpack-plugin')
const dotenv = require('dotenv')

const configs = dotenv.config()

module.exports = {
  // 是否进行压缩
  compressTemplate: process.env.NODE_ENV === 'production',
  pxToRpx: false,
  plugins: [
    // less()
  ],
  configWebpack ({config, webpack, addCSSRule}) {
    if (config) {
      // config.plugin('clean').use(new CleanWebpackPlugin(), [['dist']])
      const replacement = Object.keys(configs.parsed).reduce((acc, key) => {
        acc[`process.config.${key}`] = JSON.stringify(configs.parsed[key])
        return acc
      }, {})
      config.plugin('definePlugin').use(require.resolve('webpack/lib/DefinePlugin'), [replacement])
    }
    // config
    //   .plugin('copyPlugin')
    //   .use(webpackCopyPlugin, [
    //     [{ from: path.join(cwd, 'src/assets/images'), to: path.join(cwd, this.output || 'dist', 'assets/images') }],
    //   ])
    config.resolve.alias
      .merge({
        '@components': path.resolve(cwd, 'src/components'),
      })
      .end()
    // 引用 less
    addCSSRule({
      name: 'less',
      test: /\.less(\?.*)?$/,
    });
  }
};
