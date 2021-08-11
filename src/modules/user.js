import { put, takeLatest, call } from 'redux-saga/effects'
import * as api from '../lib/api'
import { push } from '../lib/historyUtils'

const GET_USER = 'user/GET_USER'
const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS'
const GET_USER_FAILED = 'user/GET_USER_FAILED'
export const getUser = () => ({ type: GET_USER })
export function* getUserSaga() {
    try {
        const user = yield call(api.getUser);
        yield put({ type: GET_USER_SUCCESS, user })
    } catch (error) {
        yield put({ type: GET_USER_FAILED, message: error.message });
    }
}

const LOGIN = 'user/LOGIN'
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS'
const LOGIN_FAILED = 'user/LOGIN_FAILED'
export const login = ({ email, password }) => ({ type: LOGIN, payload: { email, password } })
export function* loginSaga(action) {
    try {
        const { token, user } = yield call(api.login, action.payload)
        window.localStorage.setItem('token', `Bearer ${token}`)
        yield put({ type: LOGIN_SUCCESS, user })
        yield call(push, '/')
    } catch (error) {
        yield put({ type: LOGIN_FAILED, message: error.message });
    }
}

const LOGOUT = 'user/LOGOUT'
const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS'
const LOGOUT_FAILED = 'user/LOGOUT_FAILED'
export const logout = () => ({ type: LOGOUT })
export function* logoutSaga() {
    try {
        const result = yield call(api.logout)
        if (result.success) {
            window.localStorage.setItem('token', '')
            yield put({ type: LOGOUT_SUCCESS })
        }
    } catch (error) {
        yield put({ type: LOGOUT_FAILED, message: error.message });
    }
}

const REGISTER = 'user/REGISTER'
const REGISTER_SUCCESS = 'user/REGISTER_SUCCESS'
const REGISTER_FAILED = 'user/REGISTER_FAILED'
export const register = ({ name, email, password, age }) => ({ type: REGISTER, payload: { name, email, password, age } })
export function* registerSaga(action) {
    try {
        const { token, user } = yield call(api.register, action.payload)
        window.localStorage.setItem('token', `Bearer ${token}`)
        yield put({ type: REGISTER_SUCCESS, user })
    } catch (error) {
        yield put({ type: REGISTER_FAILED, message: error.message });
    }
}

const UPDATE_USER = 'user/UPDATE_USER'
const UPDATE_USER_SUCCESS = 'user/UPDATE_USER_SUCCESS'
const UPDATE_USER_FAILED = 'user/UPDATE_USER_FAILED'
export const updateUser = ({ name, password, age }) => ({ type: UPDATE_USER, payload: { name, password, age } })
export function* updateUserSaga(action) {
    try {
        const { success, data: user } = yield call(api.updateUser, action.payload)
        if (success) {
            yield put({ type: UPDATE_USER_SUCCESS, user })
        }
    } catch (error) {
        yield put({ type: UPDATE_USER_FAILED, message: error.message });
    }
}

const UPLOAD_AVATAR = 'user/UPLOAD_AVATAR'
const UPLOAD_AVATAR_SUCCESS = 'user/UPLOAD_AVATAR_SUCCESS'
const UPLOAD_AVATAR_FAILED = 'user/UPLOAD_AVATAR_FAILED'
export const uploadAvatar = (formData) => ({ type: UPLOAD_AVATAR, payload: formData })
export function* uploadAvatarSaga(action) {
    try {
        const { succes: success } = yield call(api.uploadAvatar, action.payload)
        if (success) yield put({ type: UPLOAD_AVATAR_SUCCESS })
    } catch (error) {
        yield put({ type: UPLOAD_AVATAR_FAILED, message: error.message });
    }
}

const REMOVE_USER = 'user/REMOVE_USER'
const REMOVE_USER_SUCCESS = 'user/REMOVE_USER_SUCCESS'
const REMOVE_USER_FAILED = 'user/REMOVE_USER_FAILED'
export const removeUser = () => ({ type: REMOVE_USER })
export function* removeUserSaga(action) {
    try {
        const data = yield call(api.removeUser, action.payload)
        if (data) {
            window.localStorage.setItem('token', '')
            yield put({ type: REMOVE_USER_SUCCESS })
            yield call(push, '/')
        }
    } catch (error) {
        yield put({ type: REMOVE_USER_FAILED, message: error.message });
    }
}

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
        case LOGIN_SUCCESS:
        case GET_USER_SUCCESS:
        case REGISTER_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return { ...state, user: { ...action.user, avatar: `${process.env.REACT_APP_API_URL}/user/${action.user._id}/avatar?d=${new Date().getTime()}` } }
        case UPLOAD_AVATAR_SUCCESS:
            return { ...state, user: { ...state.user, avatar: `${process.env.REACT_APP_API_URL}/user/${state.user._id}/avatar?d=${new Date().getTime()}` } }
        case REMOVE_USER_SUCCESS:
        case LOGOUT_SUCCESS:
            return { ...state, user: null }
        default:
            return state
    }
}

export default user