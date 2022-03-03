import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import useUser from "../swr/useUser";
import useLocalStorage from "../lib/useLocalStorage";

const Logout = () => {
    const history = useHistory()
    const { mutate } = useUser();
    const [_, setToken] = useLocalStorage('token', '');

    useEffect(() => {
        mutate(null)
        setToken('')
        history.push('/')
    }, [history, mutate, setToken])
    return <></>
}

export default React.memo(Logout)