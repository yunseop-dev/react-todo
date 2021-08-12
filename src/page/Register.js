import useInput from '../lib/useInput'
import { useDispatch } from "react-redux"
import { register } from '../modules/user'

const Register = () => {
    const { value: name, onChange: onChangeName } = useInput('')
    const { value: email, onChange: onChangeEmail } = useInput('')
    const { value: password, onChange: onChangePassword } = useInput('')
    const { value: age, onChange: onChangeAge } = useInput(20)

    const dispatch = useDispatch()

    async function onSubmit(e) {
        e.preventDefault();
        try {
            dispatch(register({
                name: name, email: email, password: password, age: age
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