/** @format */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as T from 'prop-types'
import { View } from 'remax/wechat'
import { getNowLocation } from '../../utils/getlocation'

class mainPage extends Component {
  static propTypes = {
    updateCount: T.func,
    updateCountAsyn: T.func,
  }

  static defaultProps = {
    updateCount: () => {},
    updateCountAsyn: () => {},
  }

  async componentDidMount() {
    const location = await getNowLocation()
    console.log('location', location)
  }

  onLoad() {
    console.log('页面Load：加载页面')
  }

  onShow(query) {
    console.log('页面onShow', query)
  }

  doCompute(e, data) {
    const type = e.target.dataset.type || ''
    const { updateCount } = this.props
    updateCount({
      type,
      data,
    })
  }

  doComputeAsyn(e, data) {
    const type = e.target.dataset.type || ''
    const { updateCountAsyn } = this.props
    updateCountAsyn({
      type,
      data,
    })
  }

  render() {
    return <View>111</View>
  }
}
const mapState = ({ mainList }) => ({
  ...mainList,
})
const mapDispatch = ({ mainList: { updateCount, updateCountAsyn } }) => ({
  updateCount,
  updateCountAsyn,
})
export default connect(mapState, mapDispatch, null, {
  forwardRef: true,
})(mainPage)
