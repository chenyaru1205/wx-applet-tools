/** @format */

import { getNowLocation } from '../utils/getlocation'
import request from '../utils/request'
import urls from '../contants/urls'

export default {
  state: {
    region: [],
    nowWeather: null,
    moreWeather: null,
    location: null,
  },
  reducers: {
    updateRegion: (state, region) => {
      return {
        ...state,
        region,
      }
    },
    updateLocation: (state, location) => {
      return {
        ...state,
        location,
      }
    },
    updateWeatherInfo: (state, nowWeather, moreWeather) => {
      return {
        ...state,
        nowWeather,
        moreWeather,
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
    async getWeatherInfo(type) {
      const locationInfo = await getNowLocation()
      dispatch.weather.updateLocation(locationInfo)
      const params = {
        location: `${locationInfo.longitude},${locationInfo.latitude}`,
        key: process.env.REMAX_APP_WEATHER_KEY,
      }
      const cityInfoData = await request.get(urls.cityUrl, params)
      const cityInfo = cityInfoData && cityInfoData.location && cityInfoData.location[0]
      if (cityInfo) dispatch.weather.updateRegion([cityInfo.adm1, cityInfo.adm2, cityInfo.name])
      if (type === 'now') {
        const weatherNowData = await request.get(urls.weatherNowUrl, params)
        dispatch.weather.updateNowWeather(weatherNowData.now)
      } else if (type === 'more') {
        const weatherMoreData = await request.get(urls.weather3dUrl, params)
        dispatch.weather.updateMoreWeather(weatherMoreData.daily)
      } else {
        const weatherNowData1 = await request.get(urls.weatherNowUrl, params)
        const weatherMoreData1 = await request.get(urls.weather3dUrl, params)
        dispatch.weather.updateWeatherInfo(weatherNowData1.now, weatherMoreData1.daily)
      }
    },
    async changeRegion(payload) {
      console.log('changeRegion', payload)
      dispatch.weather.updateRegion(payload.value)
      const params0 = {
        location: payload.code[2],
        key: process.env.REMAX_APP_WEATHER_KEY,
      }
      const cityInfoData = await request.get(urls.cityUrl, params0)
      const cityInfo = cityInfoData && cityInfoData.location && cityInfoData.location[0]
      if (!cityInfo) return
      const params = {
        location: `${cityInfo.lon},${cityInfo.lat}`,
        key: process.env.REMAX_APP_WEATHER_KEY,
      }
      if (payload.type === 'now') {
        const weatherNowData = await request.get(urls.weatherNowUrl, params)
        dispatch.weather.updateNowWeather(weatherNowData.now)
      } else if (payload.type === 'more') {
        const weatherMoreData = await request.get(urls.weather3dUrl, params)
        dispatch.weather.updateMoreWeather(weatherMoreData.daily)
      } else {
        const weatherNowData1 = await request.get(urls.weatherNowUrl, params)
        const weatherMoreData1 = await request.get(urls.weather3dUrl, params)
        dispatch.weather.updateWeatherInfo(weatherNowData1.now, weatherMoreData1.daily)
      }
    },
  }),
}
