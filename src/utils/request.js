/** @format */
import { request as wxRequest, showToast } from 'remax/wechat'
import requestConst from './requestConst'

const defaultHeader = {
  'Content-Type': 'application/x-www-form-urlencoded',
}
const defaultBaseUrl = requestConst[process.env.NODE_ENV]

const request = (apiName, data, method, header = defaultHeader, baseurl = defaultBaseUrl) => {
  const url = apiName.indexOf('http') === -1 ? baseurl + apiName : apiName
  const requestConfig = {
    url,
    data,
    method,
    header,
  }
  return new Promise(resolve => {
    wxRequest({
      ...requestConfig,
      success: async res => {
        console.log('respone ======>', res)
        resolve(res.data)
      },
      fail: async err => {
        showToast({
          title: '数据请求失败',
          icon: 'error',
          duration: 2000,
        })
        resolve(err)
      },
    })
  })
}

export default {
  get: (url, params, header, baseurl) => {
    return request(url, params, 'get', header, baseurl)
  },
  post: (url, params, header, baseurl) => {
    return request(url, params, 'post', header, baseurl)
  },
}
