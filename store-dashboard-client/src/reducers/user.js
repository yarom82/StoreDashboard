import { USER_LOGGED_IN } from "../types/types";

export default function user(state = {}, action = {}) {
  switch(action.type) {
    case USER_LOGGED_IN:
      return action.sessionId
    default:
      return state
  }
}
