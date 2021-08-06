import { useHistory } from 'react-router-dom'
import { API_URL } from '../constants'
import useInput from '../lib/useInput'
import useLocalStorage from '../lib/useLocalStorage'
const Register = () => {
    const history = useHistory()
    const { value: name, onChange: onChangeName } = useInput('')
    const { value: email, onChange: onChangeEmail } = useInput('')
    const { value: password, onChange: onChangePassword } = useInput('')
    const { value: age, onChange: onChangeAge } = useInput(20)

    const [token, setToken] = useLocalStorage('token', '')
    const [userInfo, setUserInfo] = useLocalStorage('userInfo', '')

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const result = await fetch(`${API_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, email, password, age
                })
            }).then(response => response.json())
            console.log(result)
            if (typeof result === 'string') throw new Error(result)
            setToken(`Bearer ${result.token}`)
            setUserInfo(result.user)
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