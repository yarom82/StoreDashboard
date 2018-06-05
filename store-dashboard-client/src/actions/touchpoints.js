import { TOUCHPOINTS_RETRIEVED } from '../types/types'

export const touchpointsRetrieved = (touchpoints) => ({
  type: TOUCHPOINTS_RETRIEVED,
  touchpoints
})

export const getTouchpoints = (sessionId) => dispatch => fetch('/api/touchpoints', {
  method: 'GET',
  headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}).then(touchpoints => dispatch(touchpointsRetrieved(touchpoints)))
