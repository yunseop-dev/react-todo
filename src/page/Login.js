import useInput from "../lib/useInput"
import fetchPost from "../lib/fetchPost"
import { API_URL } from "../constants"
import useLocalStorage from "../lib/useLocalStorage"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { me } from '../modules/user'
const Login = () => {
    const history = useHistory()
    const [email, onChangeEmail] = useInput('')
    const [password, onChangePassword] = useInput('')
    const [, setToken] = useLocalStorage('token', '')
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await fetchPost(`${API_URL}/user/login`, { email, password })
            setToken(`Bearer ${result.token}`)
            dispatch(me({
                user: result.user
            }))
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

export default Login