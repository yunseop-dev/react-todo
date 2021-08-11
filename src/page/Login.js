import useInput from "../lib/useInput"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from '../modules/user'

const Login = () => {
    const history = useHistory()
    const email = useInput('')
    const password = useInput('')
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(login({ email, password }))
            history.push('/')
        } catch (error) {
            alert(error)
        }
    }
    return <form onSubmit={onSubmit}>
        <p>
            <label htmlFor='email'>
                email
                <input id='email' type='email' {...email} required />
            </label>
        </p>
        <p>
            <label htmlFor='password'>
                password
                <input id='password' type='password' {...password} required />
            </label>
        </p>
        <button type='submit'>Login</button>
    </form>
}

export default Login