import { all, takeLatest } from 'redux-saga/effects'
import * as api from '../lib/api'
import createRequestSaga from '../lib/createRequestSaga'

export const Types = {
    GET_USER: 'user/GET_USER',
    GET_USER_SUCCESS: 'user/GET_USER_SUCCESS',
    LOGIN: 'user/LOGIN',
    LOGIN_SUCCESS: 'user/LOGIN_SUCCESS',
    LOGOUT: 'user/LOGOUT',
    LOGOUT_SUCCESS: 'user/LOGOUT_SUCCESS',
    REGISTER: 'user/REGISTER',
    REGISTER_SUCCESS: 'user/REGISTER_SUCCESS',
    UPDATE_USER: 'user/UPDATE_USER',
    UPDATE_USER_SUCCESS: 'user/UPDATE_USER_SUCCESS',
    UPLOAD_AVATAR: 'user/UPLOAD_AVATAR',
    UPLOAD_AVATAR_SUCCESS: 'user/UPLOAD_AVATAR_SUCCESS',
    REMOVE_USER: 'user/REMOVE_USER',
    REMOVE_USER_SUCCESS: 'user/REMOVE_USER_SUCCESS',
}

export const getUser = () => ({ type: Types.GET_USER })
export const getUserSaga = createRequestSaga(Types.GET_USER, api.getUser)

export const login = ({ email, password }) => ({ type: Types.LOGIN, payload: { email, password } })
export const loginSaga = createRequestSaga(Types.LOGIN, api.login)

export const logout = () => ({ type: Types.LOGOUT })
export const logoutSaga = createRequestSaga(Types.LOGOUT, api.logout)

export const register = ({ name, email, password, age }) => ({ type: Types.REGISTER, payload: { name, email, password, age } })
export const registerSaga = createRequestSaga(Types.REGISTER, api.register)

export const updateUser = ({ name, password, age }) => ({ type: Types.UPDATE_USER, payload: { name, password, age } })
export const updateUserSaga = createRequestSaga(Types.UPDATE_USER, api.updateUser)

export const uploadAvatar = (formData) => ({ type: Types.UPLOAD_AVATAR, payload: formData })
export const uploadAvatarSaga = createRequestSaga(Types.UPLOAD_AVATAR, api.uploadAvatar)

export const removeUser = () => ({ type: Types.REMOVE_USER })
export const removeUserSaga = createRequestSaga(Types.REMOVE_USER, api.removeUser)

const initialState = {
    user: null
}

export function* userSaga() {
    yield all([
        takeLatest(Types.GET_USER, getUserSaga),
        takeLatest(Types.LOGIN, loginSaga),
        takeLatest(Types.LOGOUT, logoutSaga),
        takeLatest(Types.REGISTER, registerSaga),
        takeLatest(Types.UPDATE_USER, updateUserSaga),
        takeLatest(Types.UPLOAD_AVATAR, uploadAvatarSaga),
        takeLatest(Types.REMOVE_USER, removeUserSaga),
    ])
}

function user(state = initialState, action) {
    switch (action.type) {
        case Types.GET_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...action.payload,
                    avatar: `${process.env.REACT_APP_API_URL}/user/${action.payload._id}/avatar?d=${new Date().getTime()}`
                }
            }
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
        case Types.UPDATE_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...action.payload.data,
                    avatar: `${process.env.REACT_APP_API_URL}/user/${action.payload.data._id}/avatar?d=${new Date().getTime()}`
                }
            }
        case Types.UPLOAD_AVATAR_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    avatar: `${process.env.REACT_APP_API_URL}/user/${state.user._id}/avatar?d=${new Date().getTime()}`
                }
            }
        case Types.REMOVE_USER_SUCCESS:
        case Types.LOGOUT_SUCCESS:
            window.localStorage.removeItem('token')
            return { ...state, user: null }
        default:
            return state
    }
}

export default user