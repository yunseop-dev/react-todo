import useInput from "../lib/useInput"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login, Types } from '../modules/user'
import React, { useCallback, useEffect } from "react"
import useFetchInfo from "../lib/useFetchInfo"

const Login = () => {
    const history = useHistory()
    const { value: email, onChange: onChangeEmail } = useInput('')
    const { value: password, onChange: onChangePassword } = useInput('')
    const dispatch = useDispatch()
    const onLogin = useCallback((data) => dispatch(login(data)), [dispatch])
    const { isFetched } = useFetchInfo(Types.LOGIN)
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            onLogin({ email, password })
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        if (isFetched) {
            history.push('/')
        }
    }, [history, isFetched])

    return <form onSubmit={onSubmit}>
        <p>
            <label htmlFor='email'>
                email
                <input id='email' type='email' onChange={onChangeEmail} value={email} required />
            </label>
        </p>
        <p>
            <label htmlFor='password'>
                password
                <input id='password' type='password' onChange={onChangePassword} value={password} required />
            </label>
        </p>
        <button type='submit'>Login</button>
    </form>
}

export default React.memo(Login)