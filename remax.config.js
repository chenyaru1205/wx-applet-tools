const cwd = process.cwd()
const path = require('path')
const less = require('@remax/plugin-less')
const webpackCopyPlugin = require('copy-webpack-plugin')

module.exports = {
  // 是否进行压缩
  compressTemplate: process.env.NODE_ENV === 'production',
  pxToRpx: true,
  plugins: [
    // less()
  ],
  configWebpack ({config, webpack, addCSSRule}) {
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
