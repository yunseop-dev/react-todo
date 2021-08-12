import { takeLatest } from 'redux-saga/effects'
import * as api from '../lib/api'
import createRequestSaga from '../lib/createRequestSaga'

const GET_USER = 'user/GET_USER'
const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS'
export const getUser = () => ({ type: GET_USER })
export const getUserSaga = createRequestSaga(GET_USER, api.getUser)

const LOGIN = 'user/LOGIN'
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS'
export const login = ({ email, password }) => ({ type: LOGIN, payload: { email, password } })
export const loginSaga = createRequestSaga(LOGIN, api.login)

const LOGOUT = 'user/LOGOUT'
const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS'
export const logout = () => ({ type: LOGOUT })
export const logoutSaga = createRequestSaga(LOGOUT, api.logout)

const REGISTER = 'user/REGISTER'
const REGISTER_SUCCESS = 'user/REGISTER_SUCCESS'
export const register = ({ name, email, password, age }) => ({ type: REGISTER, payload: { name, email, password, age } })
export const registerSaga = createRequestSaga(REGISTER, api.register)

const UPDATE_USER = 'user/UPDATE_USER'
const UPDATE_USER_SUCCESS = 'user/UPDATE_USER_SUCCESS'
export const updateUser = ({ name, password, age }) => ({ type: UPDATE_USER, payload: { name, password, age } })
export const updateUserSaga = createRequestSaga(UPDATE_USER, api.updateUser)

const UPLOAD_AVATAR = 'user/UPLOAD_AVATAR'
const UPLOAD_AVATAR_SUCCESS = 'user/UPLOAD_AVATAR_SUCCESS'
export const uploadAvatar = (formData) => ({ type: UPLOAD_AVATAR, payload: formData })
export const uploadAvatarSaga = createRequestSaga(UPLOAD_AVATAR, api.uploadAvatar)

const REMOVE_USER = 'user/REMOVE_USER'
const REMOVE_USER_SUCCESS = 'user/REMOVE_USER_SUCCESS'
export const removeUser = () => ({ type: REMOVE_USER })
export const removeUserSaga = createRequestSaga(REMOVE_USER, api.removeUser)

const initialState = {
    user: null
}

export function* userSaga() {
    yield takeLatest(GET_USER, getUserSaga)
    yield takeLatest(LOGIN, loginSaga)
    yield takeLatest(LOGOUT, logoutSaga)
    yield takeLatest(REGISTER, registerSaga)
    yield takeLatest(UPDATE_USER, updateUserSaga)
    yield takeLatest(UPLOAD_AVATAR, uploadAvatarSaga)
    yield takeLatest(REMOVE_USER, removeUserSaga)
}

function user(state = initialState, action) {
    switch (action.type) {
        case GET_USER_SUCCESS:
            return { ...state, user: { ...action.payload, avatar: `${process.env.REACT_APP_API_URL}/user/${action.payload._id}/avatar?d=${new Date().getTime()}` } }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            const { token, user } = action.payload
            window.localStorage.setItem('token', `Bearer ${token}`)
            return { ...state, user: { ...user, avatar: `${process.env.REACT_APP_API_URL}/user/${user._id}/avatar?d=${new Date().getTime()}` } }
        case UPDATE_USER_SUCCESS:
            return { ...state, user: { ...action.payload.data, avatar: `${process.env.REACT_APP_API_URL}/user/${action.payload.data._id}/avatar?d=${new Date().getTime()}` } }
        case UPLOAD_AVATAR_SUCCESS:
            return { ...state, user: { ...state.user, avatar: `${process.env.REACT_APP_API_URL}/user/${state.user._id}/avatar?d=${new Date().getTime()}` } }
        case REMOVE_USER_SUCCESS:
        case LOGOUT_SUCCESS:
            window.localStorage.setItem('token', '')
            return { ...state, user: null }
        default:
            return state
    }
}

export default user