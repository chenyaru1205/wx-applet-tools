/** @format */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as T from 'prop-types'
import { View, Image, Picker } from 'remax/wechat'
import styles from './index.less'
import urls from '../../contants/urls'
import functions from '../../utils/functions'

const initNowData = {
  updatetime: '',
  nowTemp: '',
  nowText: '',
  nowIconUrl: '',
  nowWindInfo: '',
}

class weatherInfo extends Component {
  static propTypes = {}

  static defaultProps = {}

  onLoad() {}

  onShow() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getWeatherInfo()
  }

  bindRegionChange(e) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.changeRegion(e.detail)
  }

  dealNowWeather(data) {
    let nowData = { ...initNowData }
    if (data) {
      nowData = { ...data, ...initNowData }
      nowData.updatetime = data.obsTime ? `${functions.updateDateYMDHM(data.obsTime, 'YYYY-MM-DD hh:mm')} 更新` : ''
      nowData.nowTemp = data.temp || ''
      nowData.nowText = data.text || ''
      // eslint-disable-next-line no-param-reassign
      nowData.nowIconUrl = data.icon
        ? `${urls.staticPreUrl}/weather/icons/${(data.icon = 154 ? 153 : data.icon)}.svg`
        : ''
      nowData.nowWindInfo = (data.windDir || '') + (data.windScale ? `${data.windScale}级` : '')
    }
    return nowData
  }

  nowDetailRender(nowData) {
    const detailArr = [
      [
        { fname: 'feelsLike', text: '体感温度', unit: '℃' },
        { fname: 'windSpeed', text: '风速', unit: 'km/h' },
        { fname: 'humidity', text: '相对湿度', unit: '%' },
        { fname: 'precip', text: '降雨量', unit: 'mm/h' },
      ],
      [
        { fname: 'pressure', text: '大气压强', unit: '百帕' },
        { fname: 'vis', text: '能见度', unit: 'km' },
        { fname: 'cloud', text: '云量', unit: '%' },
        { fname: 'dew', text: '露点温度', unit: '℃' },
      ],
    ]
    return (
      <View className={styles.nowDetail}>
        {detailArr.map((row, i) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <View className={styles.detailRow} key={`${i}row`}>
              {row.map((column, j) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <View className={styles.detailItem} key={`${j}column`}>
                    <Image
                      style={{ width: '20px', height: '20px' }}
                      src={`${urls.staticPreUrl}/weather/${column.fname}.png`}
                    />
                    <View className={styles.itemValue}>{`${nowData[column.fname] || '-'}${column.unit}`}</View>
                    <View className={styles.itemName}>{column.text}</View>
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
    const { nowWeather, moreWeather, region } = this.props
    const nowData = this.dealNowWeather(nowWeather)
    console.log(555, nowData, moreWeather, region)
    return (
      <View className={styles.weatherMain}>
        <Image className={styles.bgImage} src={`${urls.staticPreUrl}/weather/bg1.png`} mode="aspectFill" />
        <View className={styles.container}>
          <View className={styles.top}>
            <Picker mode="region" bindchange={e => this.bindRegionChange(e)} value={region}>
              <View className={styles.location}>
                <View className={styles.address}>{region[2]}</View>
                <Image style={{ width: '20px', height: '20px' }} src={`${urls.staticPreUrl}/weather/location.png`} />
              </View>
            </Picker>
            <View className={styles.time}>{nowData.updatetime}</View>
          </View>
          <View className={styles.content}>
            <View className={styles.contentInfo}>
              <View className={styles.temperature}>
                {nowData.nowTemp}
                {nowData.nowTemp !== '' && (
                  <text style={{ fontSize: '50rpx', position: 'relative', top: '20px' }}>℃</text>
                )}
                <View className={styles.weather}>
                  <Image style={{ width: '20px', height: '20px', color: '#fff' }} src={nowData.nowIconUrl} />
                  <View>{nowData.nowText}</View>
                </View>
              </View>
              <View className={styles.wind}>{nowData.nowWindInfo}</View>
            </View>
            {this.nowDetailRender(nowData)}
          </View>
          <View className={styles.bottom}>
            <View className={styles.title}>3天预报</View>
            <View className={styles.guides}>
              {moreWeather &&
                moreWeather.map((daily, key) => {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <View className={styles.item} key={`${key}daily`}>
                      <View className={styles.dateItem}>{`${daily.fxDate || '-'}`}</View>
                      <View className={styles.temperatureItem}>
                        {`${daily.tempMin || '-'}℃/${daily.tempMax || '-'}℃`}
                      </View>
                      <Image
                        style={{ width: '15px', height: '15px' }}
                        src={`${urls.staticPreUrl}/weather/icons/${daily.iconDay}.svg`}
                      />
                      <View className={styles.weatherItem}>{`${daily.textDay || '-'}`}</View>
                      <View className={styles.windItem}>
                        {`${daily.windDirDay || ''}${daily.windScaleDay ? `${daily.windScaleDay}级` : '-'}`}
                      </View>
                    </View>
                  )
                })}
            </View>
          </View>
        </View>
      </View>
    )
  }
}
const mapState = ({ weather }) => ({ ...weather })
const mapDispatch = ({ weather: { getWeatherInfo, changeRegion } }) => ({ getWeatherInfo, changeRegion })
export default connect(mapState, mapDispatch, null, { forwardRef: true })(weatherInfo)
