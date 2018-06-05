import { combineReducers } from 'redux'

import user from './reducers/user'
import touchpoint from './reducers/touchpoint'

export default combineReducers({
  user,
  touchpoint
})
