import { combineReducers } from "redux"
import user, { Types, userSaga } from "./user"
import todo, { todoSaga } from "./todo"
import fetchStatus from "./fetchStatus"
import { all } from 'redux-saga/effects'
import { deleteApiCache } from "../lib/createRequestSaga"

const appReducer = combineReducers({
    user, todo, fetchStatus
})

const rootReducer = (state, action) => {
    if ([Types.LOGOUT_SUCCESS].includes(action.type)) {
        window.localStorage.removeItem('token')
        deleteApiCache()

        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

export function* rootSaga() {
    yield all([userSaga(), todoSaga()])
}

export default rootReducer