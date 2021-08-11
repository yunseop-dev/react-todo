import useInput from "../lib/useInput"
import useFile from "../lib/useFile"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import useLocalStorage from "../lib/useLocalStorage"
import { getUser, updateUser, uploadAvatar, removeUser } from '../modules/user'

const Profile = () => {
    const [token] = useLocalStorage('token');
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const { value: file, onChange: onChangeFile } = useFile(undefined)
    const { value: email, onChange: onChangeEmail } = useInput('')
    const { value: name, onChange: onChangeName } = useInput('')
    const { value: password, onChange: onChangePassword } = useInput('')
    const { value: age, onChange: onChangeAge } = useInput(0)

    useEffect(() => {
        if (!user && token) {
            dispatch(getUser())
        }
        if (user) {
            onChangeEmail({ target: { value: user.email } })
            onChangeName({ target: { value: user.name } })
            onChangeAge({ target: { value: user.age } })
        }
    }, [dispatch, user, token])

    useEffect(() => {
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);
            dispatch(uploadAvatar(formData))
        }
    }, [file])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser({ name, password: password.length > 0 ? password : undefined, age }))
    }

    const onRemoveUser = () => {
        if (window.confirm('Do you want to remove this account?')) dispatch(removeUser())
    }

    return <div>
        <h1>{user?.name || 'Guest'}'s Profile</h1>
        <form onSubmit={onSubmit}>
            {user && <img src={user.avatar} width="100" height="100" />}
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

export default Profile