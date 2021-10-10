/** @format */

export default {
  state: {
    count: 0,
    showNewPage: false,
  },
  reducers: {
    updateCount: (state, payload) => {
      let { count } = state
      const { type, data } = payload
      switch (type) {
        case 'add':
          count += data
          break
        case 'minus':
          count -= data
          break
        default:
          break
      }
      return {
        ...state,
        count,
      }
    },
    initCount: (state, payload) => {
      return {
        ...state,
        count: payload,
      }
    },
    updateNewPageState: (state, payload) => {
      return {
        ...state,
        showNewPage: payload,
      }
    },
  },
  effects: dispatch => ({
    async updateCountAsyn(payload, rootState) {
      let { count } = rootState.mainList
      const { type, data } = payload
      switch (type) {
        case 'add':
          count += data
          break
        case 'minus':
          count -= data
          break
        default:
          break
      }
      dispatch.mainList.initCount(count)
    },
  }),
}
