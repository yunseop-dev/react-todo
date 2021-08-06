import { useHistory } from 'react-router-dom'
import { API_URL } from '../constants'
import fetchPost from '../lib/fetchPost'
import useInput from '../lib/useInput'
import useLocalStorage from '../lib/useLocalStorage'

import { useDispatch } from "react-redux"
import { me } from '../modules/user'

const Register = () => {
    const history = useHistory()
    const [name, onChangeName] = useInput('')
    const [email, onChangeEmail] = useInput('')
    const [password, onChangePassword] = useInput('')
    const [age, onChangeAge] = useInput(20)

    const [, setToken] = useLocalStorage('token', '')

    const dispatch = useDispatch()

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const result = await fetchPost(`${API_URL}/user/register`, { name, email, password, age })
            setToken(`Bearer ${result.token}`)
            dispatch(me({
                user: result.user
            }))
            history.push('/')
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return <div>
        <form onSubmit={onSubmit}>
            <p>
                <label htmlFor="name">
                    name
                    <input id="name" type="text" onChange={onChangeName} value={name} required />
                </label>
            </p>

            <p>
                <label htmlFor="email">
                    email
                    <input id="email" type="email" onChange={onChangeEmail} value={email} required />
                </label>
            </p>

            <p>
                <label htmlFor="password">
                    password
                    <input id="password" type="password" minLength="7" onChange={onChangePassword} value={password} required />
                </label>
            </p>

            <p>
                <label htmlFor="age">
                    age
                    <input id="age" type="number" onChange={onChangeAge} value={age} required />
                </label>
            </p>

            <button type="submit">Register</button>
        </form>
    </div>
}

export default Register