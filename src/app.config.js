/** @format */

module.exports = {
  pages: ['pages/weather/index', 'pages/index/index', 'pages/study/index', 'pages/counter/index'],
  window: {
    navigationBarTitleText: 'React微信小程序',
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
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/study/index',
        text: '学习',
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
