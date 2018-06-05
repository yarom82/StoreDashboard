import { TOUCHPOINTS_RETRIEVED } from "../types/types";

export default function touchpoint(state = {}, action = {}) {
  switch(action.type) {
    case TOUCHPOINTS_RETRIEVED:
      return action.touchpoints
    default:
      return state
  }
}
