import { all, takeLatest } from 'redux-saga/effects'
import * as api from '../lib/api'
import createRequestSaga from '../lib/createRequestSaga'

export const Types = {
    LOGIN: 'user/LOGIN',
    LOGIN_SUCCESS: 'user/LOGIN_SUCCESS',
    LOGOUT: 'user/LOGOUT',
    LOGOUT_SUCCESS: 'user/LOGOUT_SUCCESS',
    REGISTER: 'user/REGISTER',
    REGISTER_SUCCESS: 'user/REGISTER_SUCCESS',
}

export const login = ({ email, password }) => ({ type: Types.LOGIN, payload: { email, password } })
export const loginSaga = createRequestSaga(Types.LOGIN, api.login, true)

export const logout = () => ({ type: Types.LOGOUT })
export const logoutSaga = createRequestSaga(Types.LOGOUT, api.logout)

export const register = ({ name, email, password, age }) => ({ type: Types.REGISTER, payload: { name, email, password, age } })
export const registerSaga = createRequestSaga(Types.REGISTER, api.register, true)

const initialState = {
    user: null
}

export function* userSaga() {
    yield all([
        takeLatest(Types.LOGIN, loginSaga),
        takeLatest(Types.LOGOUT, logoutSaga),
        takeLatest(Types.REGISTER, registerSaga),
    ])
}

function user(state = initialState, action) {
    switch (action.type) {
        case Types.LOGIN_SUCCESS:
        case Types.REGISTER_SUCCESS:
            const { token, user } = action.payload
            window.localStorage.setItem('token', `Bearer ${token}`)
            return {
                ...state,
                user: {
                    ...user,
                    avatar: `${process.env.REACT_APP_API_URL}/user/${user._id}/avatar?d=${new Date().getTime()}`
                }
            }
        case Types.LOGOUT_SUCCESS:
            window.localStorage.removeItem('token')
            return { ...state, user: null }
        default:
            return state
    }
}

export default user