import { put, takeLatest, call } from 'redux-saga/effects'
import * as api from '../lib/api'

const GET_TASKS = 'user/GET_TASKS'
const GET_TASKS_SUCCESS = 'user/GET_TASKS_SUCCESS'
const GET_TASKS_FAILED = 'user/GET_TASKS_FAILED'
export const getTasks = () => ({ type: GET_TASKS })
export function* getTasksSaga() {
    try {
        const { count, data: tasks } = yield call(api.getTasks);
        yield put({ type: GET_TASKS_SUCCESS, tasks, count })
    } catch (error) {
        yield put({ type: GET_TASKS_FAILED, message: error.message });
    }
}

export function* todoSaga() {
    yield takeLatest(GET_TASKS, getTasksSaga)
}

const initialState = {
    count: 0,
    tasks: []
}

function todo(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS_SUCCESS:
            return { ...state, tasks: action.tasks, count: action.count }
        default:
            return state
    }
}

export default todo