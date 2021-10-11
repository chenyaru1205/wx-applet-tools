/** @format */

import { getNowLocation } from '../utils/getlocation'
import request from '../utils/request'
import urls from '../contants/urls'

export default {
  state: {
    nowWeather: null,
    moreWeather: null,
  },
  reducers: {
    updateLocation: (state, location) => {
      return {
        ...state,
        location,
      }
    },
    updateNowWeather: (state, nowWeather) => {
      return {
        ...state,
        nowWeather,
      }
    },
    updateMoreWeather: (state, moreWeather) => {
      return {
        ...state,
        moreWeather,
      }
    },
  },
  effects: dispatch => ({
    async getNowWeather() {
      const locationInfo = await getNowLocation()
      const params = {
        location: `${locationInfo.longitude},${locationInfo.latitude}`,
        key: process.env.REMAX_APP_WEATHER_KEY,
        city: 'shanghai',
      }
      const weatherNowData = await request.get(urls.weatherNowUrl, params)
      dispatch.weather.updateNowWeather(weatherNowData.now)
    },
    async getMoreWeather() {
      const locationInfo = await getNowLocation()
      const params = {
        location: `${locationInfo.longitude},${locationInfo.latitude}`,
        key: process.env.REMAX_APP_WEATHER_KEY,
        city: 'shanghai',
      }
      const weatherMoreData = await request.get(urls.weather3dUrl, params)
      dispatch.weather.updateMoreWeather(weatherMoreData)
    }
  }),
}
