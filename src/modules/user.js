import { put, takeLatest, call } from 'redux-saga/effects'
import * as api from '../lib/api'
import { push } from '../lib/historyUtils'
const GET_USER = 'user/GET_USER'
const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS'
const GET_USER_FAILED = 'user/GET_USER_FAILED'

const LOGIN = 'user/LOGIN'
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS'
const LOGIN_FAILED = 'user/LOGIN_FAILED'

const LOGOUT = 'user/LOGOUT'
const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS'
const LOGOUT_FAILED = 'user/LOGOUT_FAILED'

const REGISTER = 'user/REGISTER'
const REGISTER_SUCCESS = 'user/REGISTER_SUCCESS'
const REGISTER_FAILED = 'user/REGISTER_FAILED'

const UPDATE_USER = 'user/UPDATE_USER'
const UPDATE_USER_SUCCESS = 'user/UPDATE_USER_SUCCESS'
const UPDATE_USER_FAILED = 'user/UPDATE_USER_FAILED'

export const getUser = () => ({ type: GET_USER })
export const login = ({ email, password }) => ({ type: LOGIN, payload: { email, password } })
export const logout = () => ({ type: LOGOUT })
export const register = ({ name, email, password, age }) => ({ type: REGISTER, payload: { name, email, password, age } })
export const updateUser = ({ name, password, age }) => ({ type: UPDATE_USER, payload: { name, password, age } })

const initialState = {
    user: null
}

export function* getUserSaga() {
    try {
        const user = yield call(api.getUser);
        yield put({ type: GET_USER_SUCCESS, user })
    } catch (error) {
        yield put({ type: GET_USER_FAILED, message: error.message });
    }
}

export function* loginSaga(action) {
    try {
        const { token, user } = yield call(api.login, action.payload)
        window.localStorage.setItem('token', `Bearer ${token}`)
        yield call(push, '/')
        yield put({ type: LOGIN_SUCCESS, user })
    } catch (error) {
        yield put({ type: LOGIN_FAILED, message: error.message });
    }
}

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

export function* registerSaga(action) {
    try {
        const { token, user } = yield call(api.register, action.payload)
        window.localStorage.setItem('token', `Bearer ${token}`)
        yield put({ type: REGISTER_SUCCESS, user })
    } catch (error) {
        yield put({ type: REGISTER_FAILED, message: error.message });
    }
}

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

export function* userSaga() {
    yield takeLatest(GET_USER, getUserSaga)
    yield takeLatest(LOGIN, loginSaga)
    yield takeLatest(LOGOUT, logoutSaga)
    yield takeLatest(REGISTER, registerSaga)
    yield takeLatest(UPDATE_USER, updateUserSaga)
}

function user(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case GET_USER_SUCCESS:
        case REGISTER_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return { ...state, user: action.user }
        case LOGOUT_SUCCESS:
            return { ...state, user: null }
        default:
            return state
    }
}

export default user