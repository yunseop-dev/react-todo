import client from './client'
export const getUser = () => client('user/me')
export const login = ({ email, password }) => client('user/login', { body: { email, password } })
export const logout = () => client('user/logout', { method: 'POST' })
export const register = ({ name, email, password, age }) => client('user/register', { body: { name, email, password, age } })
export const updateUser = ({ name, password, age }) => client('user/me', { method: 'PUT', body: { name, password, age } })
export const uploadAvatar = (formData) => client('user/me/avatar', { body: formData })