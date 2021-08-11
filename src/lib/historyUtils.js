import { createBrowserHistory } from 'history'

export const HISTORY_ACTION_TYPE = {
    POP: 'POP',
    PUSH: 'PUSH',
}

const browserHistory = createBrowserHistory()

export function push(targetUrl) {
    browserHistory.push(targetUrl)
}

export function redirect(targetUrl) {
    browserHistory.replace(targetUrl)
}