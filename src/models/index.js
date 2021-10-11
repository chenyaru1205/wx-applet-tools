/** @format */

import { init } from '@rematch/core'
import mainList from './mainList'
import counter from './counter'
import weather from './weather'

const models = {
  mainList,
  counter,
  weather,
}
export default init({
  models: {
    ...models,
  },
})
