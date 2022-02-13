import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json());

const useUser = (token) => {
    const headers = { 'content-type': 'application/json' }
    if (token) {
        headers.Authorization = token.replace(/"/g, '')
    }
    const { data, mutate, error } = useSWR([`${process.env.REACT_APP_API_URL}/user/me`, { headers }], fetcher)

    return {
        user: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}

export default useUser;
