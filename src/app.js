/** @format */

import './app.css'
import * as React from 'react'
// import { useAppEvent } from 'remax/macro'
import { setEnableDebug } from 'remax/wechat'
import T from 'prop-types'
import { Provider } from 'react-redux'
import models from './models'

// 方式一：生命周期可以直接写在组件上,只能再页面组件上
class App extends React.Component {
  static propType = {
    // eslint-disable-next-line react/forbid-prop-types
    children: T.any.isRequired,
  }

  componentDidMount() {
    setEnableDebug({
      enableDebug: true,
    })
    // no-console
    console.log('App launch')
  }

  onLaunch() {
    console.log('应用Launch：首次打开')
  }

  onShow(query) {
    console.log('应用onShow：监听显示', query)
  }

  onHide() {
    console.log('应用onHide：从前台进入后台')
  }

  render() {
    const { children } = this.props
    console.log(888, children)
    return <Provider store={models}>{children}</Provider>
  }
}
// 方式二：对于函数组件，可以用useAppEvent的hook来监听生命周期
/*
const App = (props) => {
  useAppEvent('componentDidMount', () => {
    console.log('componentDidMount')
  })
  useAppEvent('onShow', (query)=>{
    console.log('useAppEvent-onShow', query)
  })
  const { children } = props;
  return <Provider store={models}>{children}</Provider>
}
*/
export default App
