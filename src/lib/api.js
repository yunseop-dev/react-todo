import client from './client'
export const getUser = () => client('user/me')
export const login = ({ email, password }) => client('user/login', { body: { email, password } })
export const logout = () => client('user/logout', { method: 'POST' })
export const register = ({ name, email, password, age }) => client('user/register', { body: { name, email, password, age } })