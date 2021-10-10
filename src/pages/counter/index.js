/** @format */

import React, { Component } from 'react'
import * as T from 'prop-types'
import { connect } from 'react-redux'
import { View } from '@remax/wechat'
import classNames from 'classnames'
import styles from './index.less'

class counterPage extends Component {
  static propTypes = {
    onTouchEvent: T.func,
    computeShow: T.string,
  }

  static defaultProps = {
    onTouchEvent: () => {},
    computeShow: '',
  }

  constructor() {
    super()
    this.state = {}
  }

  onTouch(e) {
    const data = e.target.dataset.value || ''
    const { onTouchEvent } = this.props
    onTouchEvent(data)
  }

  contentData() {
    const arr = [
      ['(', ')', '%', 'C'],
      ['7', '8', '9', '/'],
      ['4', '5', '6', '*'],
      ['1', '2', '3', '-'],
      ['0', '.', '=', '+'],
    ]
    return (
      <View className={styles.content}>
        {arr.map((row, i) => {
          return (
            <View className={styles.row} key={`${i}row`}>
              {row.map((cloumn, j) => {
                return (
                  <View
                    className={classNames(styles.column, j === row.length - 1 ? styles.lastColumn : '')}
                    data-value={cloumn}
                    key={`${i + j}column`}
                    onClick={e => this.onTouch(e)}
                  >
                    {cloumn}
                  </View>
                )
              })}
            </View>
          )
        })}
      </View>
    )
  }

  render() {
    const { computeShow } = this.props
    return (
      <View className={styles.counterMain}>
        <View className={styles.top}>{computeShow}</View>
        {this.contentData()}
      </View>
    )
  }
}
const mapState = ({ counter }) => ({
  ...counter,
})
const mapDispatch = ({ counter: { onTouchEvent } }) => ({
  onTouchEvent,
})
export default connect(mapState, mapDispatch, null, {
  forwardRef: true,
})(counterPage)
