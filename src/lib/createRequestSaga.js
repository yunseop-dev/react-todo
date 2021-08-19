import { call, put } from "redux-saga/effects"
import { setFetchStatus } from "../modules/fetchStatus"
import { FETCH_STATUS } from '../constants'
import lruCache from 'lru-cache';

const apiCache = new lruCache({
    max: 500, maxAge: 1000 * 60 * 2
})

export function getApiCacheKey(actionType, { params }) {
    const prefix = `${actionType}_`;
    const keys = new URLSearchParams(params);
    return prefix + keys;
}

export function deleteApiCache(actionType) {
    let keys = apiCache.keys();
    if (actionType) {
        keys = keys.filter(key => key.includes(actionType));
    }
    for (const key of keys) {
        apiCache.del(key);
    }
}

export default function createRequestSaga(type, request, cacheable = false) {
    const SUCCESS = `${type}_SUCCESS`
    const FAILURE = `${type}_FAILURE`
    return function* (action) {
        yield put(setFetchStatus({ requestType: type, status: FETCH_STATUS.REQUEST }))
        try {
            const cacheKey = getApiCacheKey(type, { params: action.payload })
            const isFromCache = apiCache.has(cacheKey)
            const response = (isFromCache && cacheable) ? apiCache.get(cacheKey) : yield call(request, action.payload)
            if (!isFromCache) {
                apiCache.set(cacheKey, response)
            }

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
    }
}