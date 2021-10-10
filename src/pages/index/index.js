/** @format */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as T from 'prop-types'
import { View, Button, getLocation } from 'remax/wechat'
import styles from './index.css'
import { getNowLocation } from '../../utils/getlocation'

class mainPage extends Component {
  static propTypes = {
    updateCount: T.func,
    updateCountAsyn: T.func,
    count: T.number,
  }

  static defaultProps = {
    updateCount: () => {},
    updateCountAsyn: () => {},
    count: 0,
  }

  async componentDidMount() {
    // console.log(555555, getApp())
    console.log('page launch')
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
    console.log(999, this.context)
    const { count } = this.props
    return (
      <View className={styles.app}>
        <View className={styles.header}>
          <View>{count}</View>
          <Button size="mini" type="primary" data-type="add" onClick={e => this.doCompute(e, 2)}>
            增加
          </Button>
          <Button size="mini" data-type="minus" onClick={e => this.doCompute(e, 1)}>
            减少
          </Button>
          <Button size="mini" type="primary" data-type="add" onClick={e => this.doComputeAsyn(e, 2)}>
            增加(异步)
          </Button>
          <Button size="mini" data-type="minus" onClick={e => this.doComputeAsyn(e, 1)}>
            减少(异步)
          </Button>
        </View>
      </View>
    )
  }
}
const mapState = ({ mainList }) => ({
  ...mainList,
})
const mapDispatch = ({ mainList: { updateCount, updateCountAsyn } }) => ({
  updateCount,
  updateCountAsyn
})
export default connect(mapState, mapDispatch, null, {
  forwardRef: true,
})(mainPage)
