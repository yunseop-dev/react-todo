import useInput from '../lib/useInput'
import { useDispatch } from "react-redux"
import { register } from '../modules/user'
import { useHistory } from 'react-router-dom'
import React, { useCallback } from 'react'
import Input from "../components/Input"
import Label from "../components/Label"
import Wrapper from "../components/Wrapper"
import InputItem from '../components/InputItem'
import { SquareButton } from "../components/Button"
const Register = () => {
    const { value: name, onChange: onChangeName } = useInput('')
    const { value: email, onChange: onChangeEmail } = useInput('')
    const { value: password, onChange: onChangePassword } = useInput('')
    const { value: age, onChange: onChangeAge } = useInput(20)

    const dispatch = useDispatch()
    const history = useHistory()
    const onRegister = useCallback(data => dispatch(register(data)), [dispatch])

    async function onSubmit(e) {
        e.preventDefault();
        try {
            onRegister({ name, email, password, age })
            history.push('/')
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return <Wrapper>
        <form onSubmit={onSubmit}>
            <ul>
                <InputItem>
                    <Label htmlFor="name">
                        name
                    </Label>
                    <Input id="name" type="text" onChange={onChangeName} value={name} required />
                </InputItem>
                <InputItem>
                    <Label htmlFor="email">
                        email
                    </Label>
                    <Input id="email" type="email" onChange={onChangeEmail} value={email} required />
                </InputItem>
                <InputItem>
                    <Label htmlFor="password">
                        password
                    </Label>
                    <Input id="password" type="password" minLength="7" onChange={onChangePassword} value={password} required />
                </InputItem>
                <InputItem>
                    <Label htmlFor="age">
                        age
                    </Label>
                    <Input id="age" type="number" onChange={onChangeAge} value={age} required />
                </InputItem>
            </ul>
            <SquareButton type="submit">Register</SquareButton>
        </form>
    </Wrapper>
}

export default React.memo(Register)