import { combineReducers } from "redux"
import user, { userSaga } from "./user"
import todo, { todoSaga } from "./todo"
import { all } from 'redux-saga/effects'

const rootReducer = combineReducers({
    user, todo
})

export function* rootSaga() {
    yield all([userSaga(), todoSaga()])
}

export default rootReducer