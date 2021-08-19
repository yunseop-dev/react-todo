import { combineReducers } from "redux"
import user, { Types, userSaga } from "./user"
import todo, { todoSaga } from "./todo"
import loading from "./loading"
import fetchStatus from "./fetchStatus"
import { all } from 'redux-saga/effects'

const appReducer = combineReducers({
    user, todo, loading, fetchStatus
})

const rootReducer = (state, action) => {
    if ([Types.LOGOUT_SUCCESS, Types.REMOVE_USER_SUCCESS].includes(action.type)) {
        window.localStorage.removeItem('token')

        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

export function* rootSaga() {
    yield all([userSaga(), todoSaga()])
}

export default rootReducer