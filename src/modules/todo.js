import { all, takeLatest } from 'redux-saga/effects'
import * as api from '../lib/api'
import createRequestSaga from '../lib/createRequestSaga'

export const Types = {
    GET_TASKS: 'user/GET_TASKS',
    GET_TASKS_SUCCESS: 'user/GET_TASKS_SUCCESS',
    ADD_TASK: 'user/ADD_TASK',
    ADD_TASK_SUCCESS: 'user/ADD_TASK_SUCCESS',
    UPDATE_TASK: 'user/UPDATE_TASK',
    UPDATE_TASK_SUCCESS: 'user/UPDATE_TASK_SUCCESS',
    REMOVE_TASK: 'user/REMOVE_TASK',
    REMOVE_TASK_SUCCESS: 'user/REMOVE_TASK_SUCCESS',
}

export const getTasks = () => ({ type: Types.GET_TASKS })
export const getTasksSaga = createRequestSaga(Types.GET_TASKS, api.getTasks)

export const addTask = ({ description }) => ({ type: Types.ADD_TASK, payload: { description } })
export const addTaskSaga = createRequestSaga(Types.ADD_TASK, api.addTask)

export const updateTask = (data) => ({ type: Types.UPDATE_TASK, payload: data })
export const updateTaskSaga = createRequestSaga(Types.UPDATE_TASK, api.updateTask)

export const removeTask = (id) => ({ type: Types.REMOVE_TASK, payload: id })
export const removeTaskSaga = createRequestSaga(Types.REMOVE_TASK, api.removeTask)

export function* todoSaga() {
    yield all([
        takeLatest(Types.GET_TASKS, getTasksSaga),
        takeLatest(Types.ADD_TASK, addTaskSaga),
        takeLatest(Types.UPDATE_TASK, updateTaskSaga),
        takeLatest(Types.REMOVE_TASK, removeTaskSaga),
    ])
}

const initialState = {
    count: 0,
    tasks: []
}

function todo(state = initialState, action) {
    switch (action.type) {
        case Types.GET_TASKS_SUCCESS:
            return { ...state, tasks: action.payload.data, count: action.payload.count }
        case Types.ADD_TASK_SUCCESS:
            return { ...state, tasks: [...state.tasks, action.payload.data], count: state.count + 1 }
        case Types.UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => (task._id === action.payload.id) ? Object.assign(task, action.payload) : task)
            }
        case Types.UPDATE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === action.payload.data._id ? action.payload.data : task)
            }
        case Types.REMOVE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.params)
            }
        default:
            return state
    }
}

export default todo