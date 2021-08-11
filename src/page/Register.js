import useInput from '../lib/useInput'
import { useDispatch } from "react-redux"
import { register } from '../modules/user'

const Register = () => {
    const name = useInput('')
    const email = useInput('')
    const password = useInput('')
    const age = useInput(20)

    const dispatch = useDispatch()

    async function onSubmit(e) {
        e.preventDefault();
        try {
            dispatch(register({
                name, email, password, age
            }))
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
                    <input id="name" type="text" {...name} required />
                </label>
            </p>

            <p>
                <label htmlFor="email">
                    email
                    <input id="email" type="email" {...email} required />
                </label>
            </p>

            <p>
                <label htmlFor="password">
                    password
                    <input id="password" type="password" minLength="7" {...password} required />
                </label>
            </p>

            <p>
                <label htmlFor="age">
                    age
                    <input id="age" type="number" {...age} required />
                </label>
            </p>

            <button type="submit">Register</button>
        </form>
    </div>
}

export default Register