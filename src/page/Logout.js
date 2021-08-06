import fetchPost from "../lib/fetchPost"
import { API_URL } from "../constants"
import useLocalStorage from "../lib/useLocalStorage"
import { useHistory } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { me } from '../modules/user'

const Logout = () => {
    const history = useHistory()
    const [token, setToken] = useLocalStorage('token', '')
    const dispatch = useDispatch()
    useEffect(() => {
        onLogout()
    })
    const onLogout = async () => {
        try {
            const result = await fetchPost(`${API_URL}/user/logout`, undefined, {
                Authorization: token
            })
            if (result.success) {
                setToken('')
                dispatch(me({
                    user: null
                }))
                history.push('/')
            }
        } catch (error) {
            alert(error)
        }
    }
    return <></>
}

export default Logout