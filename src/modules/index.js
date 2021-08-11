import { combineReducers } from "redux"
import user from "./user"
import { all } from 'redux-saga/effects'

const rootReducer = combineReducers({
    user
})

export function* rootSaga() {
    yield all([])
}

export default rootReducer