/** @format */
import { getLocation } from '@remax/wechat'

const initialLocation = {
  latitude: 0, //	number	纬度，范围为 -90~90，负数表示南纬
  longitude: 0, // number	经度，范围为 -180~180，负数表示西经
  speed: 0, //	number	速度，单位 m/s
  accuracy: 0, //	number	位置的精确度
  altitude: 0, //	number	高度，单位 m	1.2.0
  verticalAccuracy: 0, //	number	垂直精度，单位 m（Android 无法获取，返回 0）	1.2.0
  horizontalAccuracy: 0, //	number	水平精度，单位 m	1.2.0
}

export default {
  state: {
    cachedLocation: null,
    isGet: false,
  },
  reducers: {
    updateLocation: (state, payload) => ({
      ...state,
      ...payload,
    }),
  },
  effects: dispatch => ({
    async getLocation({}, rootState) {
      console.log(111, rootState)
      const {
        location: { isGet, cachedLocation },
      } = rootState
      let location = initialLocation
      if (isGet) {
        location = cachedLocation
      } else {
        location = await getLocation()
        dispatch.location.updateLocation({ cachedLocation: location, isGet: true })
      }
      return location
    },
  }),
}
