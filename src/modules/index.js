import { combineReducers } from "redux"
import user, { LOGOUT_SUCCESS, REMOVE_USER_SUCCESS, userSaga } from "./user"
import todo, { todoSaga } from "./todo"
import loading from "./loading"
import { all } from 'redux-saga/effects'

const appReducer = combineReducers({
    user, todo, loading
})

const rootReducer = (state, action) => {
    if ([LOGOUT_SUCCESS, REMOVE_USER_SUCCESS].includes(action.type)) {
        window.localStorage.removeItem('token')

        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

export function* rootSaga() {
    yield all([userSaga(), todoSaga()])
}

export default rootReducer