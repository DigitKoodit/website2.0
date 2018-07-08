import * as types from '../actions/actionTypes'

const initialState = {
  userId: '',
  userName: ',',
  isLoggedIn: false
}

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        userName: action.userName,
        isLoggedIn: true
      }
    case types.LOGIN_FAIL:
    case types.REQUEST_LOGOUT:
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        userId: '',
        userName: '',
        isLoggedIn: false
      }
    case types.REQUEST_LOGIN:
      return {
        ...state,
        initialState
      }
    default:
      return state
  }
}
