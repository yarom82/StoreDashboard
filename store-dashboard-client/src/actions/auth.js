import { USER_LOGGED_IN } from '../types/types'

export const userLoggedIn = (sessionId) => ({
  type: USER_LOGGED_IN,
  sessionId
})

export const login = (credentials) => dispatch => fetch('/api/login', {
  method: 'POST',
  body: JSON.stringify(credentials),
  headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}).then(sessionId => dispatch(userLoggedIn(sessionId)))
