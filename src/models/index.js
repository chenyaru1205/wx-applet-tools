/** @format */

import { init } from '@rematch/core'
import mainList from './mainList'
import counter from './counter'
import location from './location'

const models = {
  mainList,
  counter,
  location,
}
export default init({
  models: {
    ...models,
  },
})
