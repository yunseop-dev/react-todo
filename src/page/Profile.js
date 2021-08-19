import useInput from "../lib/useInput"
import useFile from "../lib/useFile"
import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUser, updateUser, uploadAvatar, removeUser, Types } from '../modules/user'
import { useHistory } from "react-router-dom"
import useFetchInfo from "../lib/useFetchInfo"

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

    return <div>
        <h1>{user?.name || 'Guest'}'s Profile</h1>
        <form onSubmit={onSubmit}>
            {user && <img src={user.avatar} width="100" height="100" alt="profile avatar" />}
            <ul>
                <li>
                    <label htmlFor='avatar'>
                        avatar
                        <input id='avatar' type='file' onChange={onChangeFile} />
                    </label>
                </li>
                <li>
                    <label htmlFor='email'>
                        email
                        <input id='email' type='email' value={email} disabled />
                    </label>
                </li>
                <li>
                    <label htmlFor='name'>
                        name
                        <input id='name' type='text' onChange={onChangeName} value={name} />
                    </label>
                </li>
                <li>
                    <label htmlFor='password'>
                        password
                        <input id='password' type='password' onChange={onChangePassword} value={password} minLength="7" />
                    </label>
                </li>
                <li>
                    <label htmlFor='age'>
                        age
                        <input id='age' type='text' onChange={onChangeAge} value={age} />
                    </label>
                </li>
            </ul>
            <button type="submit">Submit</button>
            <button type="button" onClick={onRemoveUser}>Remove User</button>
        </form>
    </div>
}

export default React.memo(Profile)