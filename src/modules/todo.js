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

const ADD_TASK = 'user/ADD_TASK'
const ADD_TASK_SUCCESS = 'user/ADD_TASK_SUCCESS'
const ADD_TASK_FAILED = 'user/ADD_TASK_FAILED'
export const addTask = ({ description }) => ({ type: ADD_TASK, payload: { description } })
export function* addTaskSaga(action) {
    try {
        const { success, data: task } = yield call(api.addTask, action.payload);
        if (success) yield put({ type: ADD_TASK_SUCCESS, task })
    } catch (error) {
        yield put({ type: ADD_TASK_FAILED, message: error.message });
    }
}

export function* todoSaga() {
    yield takeLatest(GET_TASKS, getTasksSaga)
    yield takeLatest(ADD_TASK, addTaskSaga)
}

const initialState = {
    count: 0,
    tasks: []
}

function todo(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS_SUCCESS:
            return { ...state, tasks: action.tasks, count: action.count }
        case ADD_TASK_SUCCESS:
            return { ...state, tasks: [...state.tasks, action.task], count: state.count + 1 }
        default:
            return state
    }
}

export default todo