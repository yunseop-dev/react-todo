import React from "react"
import useInput from "../lib/useInput"
import { useHistory } from "react-router-dom"
import Input from "../components/Input"
import InputItem from "../components/InputItem"
import Label from "../components/Label"
import { SquareButton } from "../components/Button"
import Wrapper from '../components/Wrapper'
import { login } from "../lib/api"
import useUser from "../swr/useUser"
import useLocalStorage from "../lib/useLocalStorage"

const Login = () => {
    const history = useHistory()
    const [_, setToken] = useLocalStorage('token', '');
    const { mutate } = useUser();
    const { value: email, onChange: onChangeEmail } = useInput('')
    const { value: password, onChange: onChangePassword } = useInput('')
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const { user, token } = await login({ email, password })
            setToken(token)
            await mutate(user)
            history.push('/')
        } catch (error) {
            alert(error)
        }
    }

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