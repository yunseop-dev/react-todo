const SET_STATUS = 'fetchStatus/SET_STATUS'
export const setFetchStatus = ({ requestType, status }) => ({
    type: SET_STATUS, payload: { requestType, status }
})

const initialState = {}

function fetchStatus(state = initialState, action) {
    switch (action.type) {
        case SET_STATUS:
            return {
                ...state,
                [action.payload.requestType]: action.payload.status
            }
        default:
            return state
    }
}

export default fetchStatus