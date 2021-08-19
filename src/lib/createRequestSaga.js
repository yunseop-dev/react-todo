import { call, put } from "redux-saga/effects"
import { finishLoading, startLoading } from "../modules/loading"
import { setFetchStatus } from "../modules/fetchStatus"
import { FETCH_STATUS } from '../constants'

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`
    const FAILURE = `${type}_FAILURE`
    return function* (action) {
        yield put(startLoading(type))
        yield put(setFetchStatus({ requestType: type, status: FETCH_STATUS.REQUEST }))
        try {
            const response = yield call(request, action.payload)
            yield put(setFetchStatus({ requestType: type, status: FETCH_STATUS.SUCCESS }))
            yield put({
                type: SUCCESS, payload: response, params: action.payload
            })
        } catch (e) {
            yield put(setFetchStatus({ requestType: type, status: FETCH_STATUS.FAIL }))
            yield put({
                type: FAILURE,
                payload: e,
                error: true
            })
        }
        yield put(finishLoading(type))
    }
}