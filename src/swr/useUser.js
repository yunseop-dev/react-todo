import useSWR from 'swr'
import { getUser } from '../lib/api'

const useUser = () => {
    const { data, mutate, error } = useSWR('user/me', getUser)
    return {
        user: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}

export default useUser;
