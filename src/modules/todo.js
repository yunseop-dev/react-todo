import { put, takeLatest, call } from 'redux-saga/effects'
import * as api from '../lib/api'
import createRequestSaga from '../lib/createRequestSaga'

const GET_TASKS = 'user/GET_TASKS'
const GET_TASKS_SUCCESS = 'user/GET_TASKS_SUCCESS'
export const getTasks = () => ({ type: GET_TASKS })
export const getTasksSaga = createRequestSaga(GET_TASKS, api.getTasks)

const ADD_TASK = 'user/ADD_TASK'
const ADD_TASK_SUCCESS = 'user/ADD_TASK_SUCCESS'
export const addTask = ({ description }) => ({ type: ADD_TASK, payload: { description } })
export const addTaskSaga = createRequestSaga(ADD_TASK, api.addTask)

const UPDATE_TASK = 'user/UPDATE_TASK'
const UPDATE_TASK_SUCCESS = 'user/UPDATE_TASK_SUCCESS'
export const updateTask = ({ id, completed, description }) => ({ type: UPDATE_TASK, payload: { id, completed, description } })
export const updateTaskSaga = createRequestSaga(ADD_TASK, api.updateTask)

const REMOVE_TASK = 'user/REMOVE_TASK'
const REMOVE_TASK_SUCCESS = 'user/REMOVE_TASK_SUCCESS'
export const removeTask = (id) => ({ type: REMOVE_TASK, payload: id })
export const removeTaskSaga = createRequestSaga(REMOVE_TASK, api.removeTask)

export function* todoSaga() {
    yield takeLatest(GET_TASKS, getTasksSaga)
    yield takeLatest(ADD_TASK, addTaskSaga)
    yield takeLatest(UPDATE_TASK, updateTaskSaga)
    yield takeLatest(REMOVE_TASK, removeTaskSaga)
}

const initialState = {
    count: 0,
    tasks: []
}

function todo(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS_SUCCESS:
            return { ...state, tasks: action.payload.data, count: action.payload.count }
        case ADD_TASK_SUCCESS:
            return { ...state, tasks: [...state.tasks, action.payload.data], count: state.count + 1 }
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === action.payload.data._id ? action.payload.data : task)
            }
        case REMOVE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.params)
            }
        default:
            return state
    }
}

export default todo