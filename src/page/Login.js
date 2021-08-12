import useInput from "../lib/useInput"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from '../modules/user'
import React, { useCallback } from "react"

const Login = () => {
    const history = useHistory()
    const { value: email, onChange: onChangeEmail } = useInput('')
    const { value: password, onChange: onChangePassword } = useInput('')
    const dispatch = useDispatch()
    const onLogin = useCallback((data) => dispatch(login(data)), [dispatch])
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            onLogin({ email, password })
            history.push('/')
        } catch (error) {
            alert(error)
        }
    }
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