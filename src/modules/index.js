import { combineReducers } from "redux"
import user, { userSaga } from "./user"
import todo, { todoSaga } from "./todo"
import loading from "./loading"
import { all } from 'redux-saga/effects'

const rootReducer = combineReducers({
    user, todo, loading
})

export function* rootSaga() {
    yield all([userSaga(), todoSaga()])
}

export default rootReducer