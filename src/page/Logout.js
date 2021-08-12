import { useHistory } from "react-router-dom"
import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { logout } from '../modules/user'

const Logout = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const onLogout = useCallback(() => dispatch(logout()), [dispatch])
    useEffect(() => {
        const fn = async () => {
            try {
                onLogout()
                history.push('/')
            } catch (error) {
                alert(error)
            }
        }
        fn()
    })
    return <></>
}

export default Logout