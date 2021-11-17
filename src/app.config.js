/** @format */

module.exports = {
  pages: ['pages/weather/index', 'pages/counter/index'],
  window: {
    navigationBarTitleText: '百宝箱',
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#ffffff',
    backgroundColor: '#eeeeee',
    backgroundTextStyle: 'light',
  },
  tabBar: {
    color: '#D5D5D5',
    selectedColor: '#000000',
    borderStyle: 'white',
    backgroundColor: '#fefefe',
    list: [
      {
        pagePath: 'pages/weather/index',
        text: '天气',
      },
      {
        pagePath: 'pages/counter/index',
        text: '计算器',
      },
    ],
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序',
    },
  },
}
