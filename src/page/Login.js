import useInput from "../lib/useInput"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login, Types } from '../modules/user'
import React, { useCallback, useEffect } from "react"
import useFetchInfo from "../lib/useFetchInfo"
import Input from "../components/Input"
import InputItem from "../components/InputItem"
import Label from "../components/Label"
import { SquareButton } from "../components/Button"
import Wrapper from '../components/Wrapper'
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

    return <Wrapper>
        <form onSubmit={onSubmit}>
            <ul>
                <InputItem>
                    <Label htmlFor='email'>
                        email
                    </Label>
                    <Input id='email' type='email' onChange={onChangeEmail} value={email} required />
                </InputItem>
                <InputItem>
                    <Label htmlFor='password'>
                        password
                    </Label>
                    <Input id='password' type='password' onChange={onChangePassword} value={password} required />
                </InputItem>
            </ul>
            <SquareButton type='submit'>Login</SquareButton>
        </form>
    </Wrapper>

}

export default React.memo(Login)