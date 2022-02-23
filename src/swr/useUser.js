import useSWR from 'swr'
import client from '../lib/client'

const useUser = () => {
    const { data, mutate, error } = useSWR(`user/me`, client)

    return {
        user: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}

export default useUser;
