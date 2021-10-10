/** @format */

import calCommonExp from '../utils/calCommonExp'

export default {
  state: {
    computeShow: '',
    isResult: false,
  },
  reducers: {
    handleShow(state, payload) {
      return {
        ...state,
        computeShow: payload,
      }
    },
    onResult(state, payload) {
      return {
        ...state,
        isResult: payload,
      }
    },
  },
  effects: dispatch => ({
    onTouchEvent(data, rootState) {
      const { isResult, computeShow } = rootState.counter
      if (!isResult) {
        let result = ''
        switch (data) {
          case '=':
            result = (computeShow && calCommonExp(computeShow)) || 0
            dispatch.counter.onResult(true)
            break
          case 'C':
            result = (computeShow.length && computeShow.slice(0, computeShow.length - 1)) || ''
            break
          default:
            result = computeShow + data
            break
        }
        dispatch.counter.handleShow(result)
      } else {
        switch (data) {
          case '=':
            break
          case 'C':
            dispatch.counter.handleShow('')
            dispatch.counter.onResult(false)
            break
          default:
            dispatch.counter.handleShow(data)
            dispatch.counter.onResult(false)
            break
        }
      }
    },
  }),
}
