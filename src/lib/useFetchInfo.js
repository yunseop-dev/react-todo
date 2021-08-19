import { useSelector } from 'react-redux'
import { FETCH_STATUS } from '../constants'

export default function useFetchInfo(actionType) {
    return useSelector(state => ({
        fetchStatus: state.fetchStatus[actionType],
        isFetching: state.fetchStatus[actionType] === FETCH_STATUS.REQUEST,
        isFetched: [FETCH_STATUS.SUCCESS, FETCH_STATUS.FAIL].includes(state.fetchStatus[actionType]),
    }))
}
