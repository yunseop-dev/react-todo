import { put, takeLatest, call } from 'redux-saga/effects'
import * as api from '../lib/api'
const GET_USER = 'user/GET_USER'
const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS'
const GET_USER_FAILED = 'user/GET_USER_FAILED'

const LOGIN = 'user/LOGIN'
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS'
const LOGIN_FAILED = 'user/LOGIN_FAILED'

export const getUser = () => ({ type: GET_USER })
export const login = ({ email, password }) => ({ type: LOGIN, payload: { email, password } })

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
        yield put({ type: LOGIN_SUCCESS, user })
    } catch (error) {
        yield put({ type: LOGIN_FAILED, message: error.message });
    }
}

export function* userSaga() {
    yield takeLatest(GET_USER, getUserSaga)
    yield takeLatest(LOGIN, loginSaga)
}

function user(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case GET_USER_SUCCESS:
            return { ...state, user: action.user }
        default:
            return state
    }
}

export default user