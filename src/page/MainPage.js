import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import useLocalStorage from "../lib/useLocalStorage"
import { API_URL } from "../constants"
import { me } from '../modules/user'
const MainPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token] = useLocalStorage('token');
    const user = useSelector(state => state.user.user?.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (token) setIsLoggedIn(true)
    }, [token])

    useEffect(() => {
        if (token && (!isLoggedIn || !user)) {
            fetch(`${API_URL}/user/me`, {
                method: 'GET',
                headers: {
                    Authorization: token
                }
            })
                .then(res => res.json())
                .then(user => {
                    dispatch(me({
                        user
                    }))
                })
        }
    }, [isLoggedIn, user, dispatch, token])

    return <div>
        <h1>{user?.name || 'Guest'}'s MainPage</h1>
        <Link to={!isLoggedIn ? '/login' : '/logout'}>{!isLoggedIn ? '로그인' : '로그아웃'}</Link>
    </div>
}

export default MainPage