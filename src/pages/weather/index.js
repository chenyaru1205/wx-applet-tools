/** @format */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as T from 'prop-types'
import { View, Image } from 'remax/wechat'
import styles from './index.less'

class weatherInfo extends Component {
  static propTypes = {}

  static defaultProps = {}

  async componentDidMount() {}

  onLoad() {}

  onShow() {
    const { getNowWeather, getMoreWeather } = this.props
    getNowWeather()
    getMoreWeather()
  }

  render() {
    const {nowWeather, moreWeather} = this.props
    console.log(555, nowWeather, moreWeather)
    return (
      <View className={styles.weatherMain}>
        <Image className={styles.bgImage} src={'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.haote.com%2Fupload%2Fnews%2F20200206%2F158095876971652.jpg&refer=http%3A%2F%2Fimg.haote.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636549218&t=6b51f980599af93d4f11a8dbda3c6555'} mode='aspectFill'></Image>
        <View className={styles.container}>
          <View className={styles.top}>
            <View className={styles.address}>上海</View>
            <View className={styles.time}>2021-10-11 21:48 更新</View>
          </View>
          <View className={styles.content}>
            <View className={styles.temperature}>
              23<text style={'font-size:50rpx;position:relative;top:-20px;'}>℃</text>
            </View>
            <View className={styles.weather} style={'margin-top: 20px;'}>大雨</View>
            <View className={styles.weather}>能见度30</View>
          </View>
          <View className={styles.bottom}>
            <View className={styles.title}>3天预报</View>
            <View className={styles.guides}>
              <View className={styles.item} key={'key1'}>
                <View className={styles.dateItem}>2021-10-11</View>
                <View className={styles.temperatureItem}>23℃</View>
                <View className={styles.weatherItem}>晴</View>
                <View className={styles.windItem}>西北风4级</View>
              </View>
              <View className={styles.item} key={'key2'}>
                <View className={styles.dateItem}>2021-10-11</View>
                <View className={styles.temperatureItem}>23℃</View>
                <View className={styles.weatherItem}>晴</View>
                <View className={styles.windItem}>西北风4级</View>
              </View>
              <View className={styles.item} key={'key3'}>
                <View className={styles.dateItem}>2021-10-11</View>
                <View className={styles.temperatureItem}>23℃</View>
                <View className={styles.weatherItem}>晴</View>
                <View className={styles.windItem}>西北风4级</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
const mapState = ({ weather }) => ({ ...weather })
const mapDispatch = ({ weather: { getNowWeather, getMoreWeather } }) => ({ getNowWeather, getMoreWeather })
export default connect(mapState, mapDispatch, null, { forwardRef: true })(weatherInfo)
