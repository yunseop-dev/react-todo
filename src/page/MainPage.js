import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import useLocalStorage from "../lib/useLocalStorage"
import { getUser } from '../modules/user'
const MainPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token] = useLocalStorage('token');
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (token) setIsLoggedIn(true)
    }, [token])

    useEffect(() => {
        if (!user && token) {
            dispatch(getUser())
        }
    }, [dispatch, user, token])

    return <div>
        <h1>{user?.name || 'Guest'}'s MainPage</h1>
        <Link to='/register'>회원가입</Link>
        <Link to={!isLoggedIn ? '/login' : '/logout'}>
            {!isLoggedIn ? '로그인' : '로그아웃'}
        </Link>
    </div>
}

export default MainPage