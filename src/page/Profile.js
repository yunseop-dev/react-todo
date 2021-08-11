import useInput from "../lib/useInput"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import useLocalStorage from "../lib/useLocalStorage"
import { getUser } from '../modules/user'
import { updateUser } from '../modules/user'
const Profile = () => {
    const [token] = useLocalStorage('token');
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

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

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser({ name, password: password.length > 0 ? password : undefined, age }))
    }

    return <div>
        <h1>{user?.name || 'Guest'}'s Profile</h1>
        <form onSubmit={onSubmit}>
            <label htmlFor='email'>
                email
                <input id='email' type='email' value={email} disabled />
            </label>
            <label htmlFor='name'>
                name
                <input id='name' type='text' onChange={onChangeName} value={name} />
            </label>
            <label htmlFor='password'>
                password
                <input id='password' type='password' onChange={onChangePassword} value={password} minLength="7" />
            </label>
            <label htmlFor='age'>
                age
                <input id='age' type='text' onChange={onChangeAge} value={age} />
            </label>
            <button type="submit">Submit</button>
        </form>
    </div>
}

export default Profile