import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useLocalStorage from "../lib/useLocalStorage"

const MainPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useLocalStorage('token');

    useEffect(() => {
        if (token) setIsLoggedIn(true)
    }, [])
    return <div>
        <h1>MainPage</h1>
        <Link to={!isLoggedIn ? '/login' : '/logout'}>{!isLoggedIn ? '로그인' : '로그아웃'}</Link>
    </div>
}

export default MainPage