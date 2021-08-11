const localStorageKey = 'token'
export default async function client(endpoint, { body, ...customConfig } = {}) {
    const token = window.localStorage.getItem(localStorageKey)
    const headers = { 'content-type': 'application/json' }
    if (token) {
        headers.Authorization = token.replace(/"/g, '')
    }
    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    }
    if (body) {
        if (body instanceof FormData) {
            config.body = body
            delete config.headers['content-type']
        } else {
            config.body = JSON.stringify(body)
        }
    }
    const response = await window
        .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    if (response.status === 401) {
        logout()
        window.location.assign(window.location)
        return
    }
    if (response.ok) {
        return response.json()
    } else {
        const errorMessage = await response.text()
        return Promise.reject(new Error(errorMessage))
    }
}
function logout() {
    window.localStorage.removeItem(localStorageKey)
}