import useInput from "../lib/useInput"
import useFile from "../lib/useFile"
import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUser, updateUser, uploadAvatar, removeUser, Types } from '../modules/user'
import { useHistory } from "react-router-dom"
import useFetchInfo from "../lib/useFetchInfo"
import Input from "../components/Input"
import Label from "../components/Label"
import Wrapper from "../components/Wrapper"
import InputItem from "../components/InputItem"
import styled from "styled-components"
import { SquareButton } from "../components/Button"

const Avatar = styled.img`
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    background: #eee;
`

const Profile = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const { isFetched } = useFetchInfo(Types.GET_USER)

    const { value: file, onChange: onChangeFile } = useFile(undefined)
    const { value: email, setValue: setEmail } = useInput('')
    const { value: name, onChange: onChangeName, setValue: setName } = useInput('')
    const { value: password, onChange: onChangePassword } = useInput('')
    const { value: age, onChange: onChangeAge, setValue: setAge } = useInput(0)

    const upload = useCallback((formData) => dispatch(uploadAvatar(formData)), [dispatch])
    const onLoadUser = useCallback(() => dispatch(getUser()), [dispatch])
    const onUpdateUser = useCallback((data) => dispatch(updateUser(data)), [dispatch])

    const onSubmit = (e) => {
        e.preventDefault()
        onUpdateUser({ name, password: password.length > 0 ? password : undefined, age })
    }

    const onRemoveUser = () => {
        if (window.confirm('Do you want to remove this account?')) {
            dispatch(removeUser())
            history.push('/')
        }
    }

    useEffect(() => {
        if (!isFetched) {
            onLoadUser()
        }
    }, [dispatch, onLoadUser, isFetched])

    useEffect(() => {
        if (user) {
            setEmail(user.email)
            setName(user.name)
            setAge(user.age)
        }
    }, [user, setEmail, setName, setAge])

    useEffect(() => {
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);
            upload(formData)
        }
    }, [file, upload])

    return <Wrapper>
        <h1>프로필 관리</h1>
        <form onSubmit={onSubmit}>
            {user && <Avatar src={user.avatar} alt="profile avatar" />}
            <ul>
                <InputItem>
                    <Label htmlFor='avatar'>
                        avatar
                    </Label>
                    <Input id='avatar' type='file' onChange={onChangeFile} />
                </InputItem>
                <InputItem>
                    <Label htmlFor='email'>
                        email
                    </Label>
                    <Input id='email' type='email' value={email} disabled />
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