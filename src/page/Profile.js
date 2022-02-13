import useInput from "../lib/useInput"
import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import Input from "../components/Input"
import Label from "../components/Label"
import Wrapper from "../components/Wrapper"
import InputItem from "../components/InputItem"
import { updateUser, removeUser } from "../lib/api"
import useLocalStorage from "../lib/useLocalStorage"
import { SquareButton } from "../components/Button"
import useUser from "../swr/useUser"


const Profile = () => {
    const [, setToken] = useLocalStorage("token", "");
    const { user, mutate } = useUser();
    const history = useHistory()

    const { value: name, onChange: onChangeName, setValue: setName } = useInput('')
    const { value: password, onChange: onChangePassword } = useInput('')
    const { value: age, onChange: onChangeAge, setValue: setAge } = useInput(0)

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = {
            ...user,
            name,
            age
        }
        await updateUser(data)
        await mutate(data)
    }

    const onRemoveUser = async () => {
        if (window.confirm('Do you want to remove this account?')) {
            await removeUser()
            await mutate(null)
            setToken('')
            history.push('/')
        }
    }

    useEffect(() => {
        if (user) {
            setName(user.name)
            setAge(user.age)
        }
    }, [user, setName, setAge])

    return <Wrapper>
        <h1>프로필 관리</h1>
        <form onSubmit={onSubmit}>
            <ul>
                <InputItem>
                    <Label htmlFor='email'>
                        email
                    </Label>
                    <Input id='email' type='email' value={user?.email ?? ''} disabled />
                </InputItem>
                <InputItem>
                    <Label htmlFor='name'>
                        name
                    </Label>
                    <Input id='name' type='text' onChange={onChangeName} value={name} />
                </InputItem>
                <InputItem>
                    <Label htmlFor='password'>
                        password
                    </Label>
                    <Input id='password' type='password' onChange={onChangePassword} value={password} minLength="7" />
                </InputItem>
                <InputItem>
                    <Label htmlFor='age'>
                        age
                    </Label>
                    <Input id='age' type='number' onChange={onChangeAge} value={age} />
                </InputItem>
            </ul>
            <SquareButton type="submit">수정</SquareButton>
            <SquareButton type="button" onClick={onRemoveUser}>회원 탈퇴</SquareButton>
        </form>
    </Wrapper>
}

export default React.memo(Profile)