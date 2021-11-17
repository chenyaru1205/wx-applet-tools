/** @format */
const isAddZero = value => {
  return value < 10 ? `0${value}` : value
}
const updateDateYMDHM = (datetimeString, format) => {
  const datetime = new Date(datetimeString)
  const year = format.indexOf('YYYY') !== -1 ? `${datetime.getFullYear()}-` : ''
  const month = format.indexOf('MM') !== -1 ? `${isAddZero(datetime.getMonth() + 1)}-` : ''
  const day = format.indexOf('DD') !== -1 ? `${isAddZero(datetime.getDate())} ` : ''
  const hour = format.indexOf('hh') !== -1 ? `${isAddZero(datetime.getHours())}:` : ''
  const miniute = format.indexOf('mm') !== -1 ? `${isAddZero(datetime.getMinutes())}:` : ''
  const second = format.indexOf('ss') !== -1 ? `${isAddZero(datetime.getSeconds())}-` : ''
  const res = year + month + day + hour + miniute + second
  return res.substring(0, res.length - 1)
}

export default {
  updateDateYMDHM,
}
