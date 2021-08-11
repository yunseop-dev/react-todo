import { put, takeLatest, call } from 'redux-saga/effects'
import * as api from '../lib/api'
const GET_USER = 'user/GET_USER'
const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS'
const GET_USER_FAILED = 'user/GET_USER_FAILED'

export const getUser = () => ({ type: GET_USER })

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

export function* userSaga() {
    yield takeLatest(GET_USER, getUserSaga)
}

function user(state = initialState, action) {
    switch (action.type) {
        case GET_USER_SUCCESS:
            return { ...state, user: action.user }
        default:
            return state
    }
}

export default user