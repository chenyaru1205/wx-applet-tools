import { getLocation, getStorageSync, setStorage } from "@remax/wechat";

export const getNowLocation = async () => {
  let location = getStorageSync('location')
  if(!location || location === "") {
    location = await getLocation();
    try{
      setStorage({
        key: 'location',
        data: location,
      })
    } catch(e) {
      console.log('err', err)
    }
  }
  return location
}

export const initLocation = async () => {
  let location = await getLocation();
  setStorage({
    key: 'location',
    data: location,
  })
  return location
}