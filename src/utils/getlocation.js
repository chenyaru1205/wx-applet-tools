/** @format */

import { getLocation, getStorageSync, setStorage } from '@remax/wechat'

export const getNowLocation = async () => {
  let location = getStorageSync('location')
  if (!location || location === '') {
    location = await getLocation()
    try {
      setStorage({
        key: 'location',
        data: location,
      })
    } catch (err) {
      console.log('err', err)
    }
  }
  return location
}

export const reloadLocation = async () => {
  const location = await getLocation()
  try {
    setStorage({
      key: 'location',
      data: location,
    })
  } catch (err) {
    console.log('err', err)
  }

  return location
}
