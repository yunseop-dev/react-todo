const ME = 'user/ME'

export const me = (user) => ({ type: ME, user })

const initialState = {
    user: null
}

function user(state = initialState, action) {
    switch (action.type) {
        case ME:
            return { ...state, user: action.user }
        default:
            return state
    }
}

export default user