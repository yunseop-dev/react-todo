import { useHistory } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { logout } from '../modules/user'

const Logout = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        onLogout()
    })
    const onLogout = async () => {
        try {
            dispatch(logout())
            history.push('/')
        } catch (error) {
            alert(error)
        }
    }
    return <></>
}

export default Logout