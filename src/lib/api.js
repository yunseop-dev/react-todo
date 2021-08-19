import client from './client'
export const getUser = () => client('user/me')
export const login = ({ email, password }) => client('user/login', { body: { email, password } })
export const logout = () => client('user/logout', { method: 'POST' })
export const register = ({ name, email, password, age }) => client('user/register', { body: { name, email, password, age } })
export const updateUser = ({ name, password, age }) => client('user/me', { method: 'PUT', body: { name, password, age } })
export const uploadAvatar = (formData) => client('user/me/avatar', { body: formData })
export const removeUser = () => client('user/me', { method: 'DELETE' })

export const getTasks = (pageParams) => {
    const params = new URLSearchParams(pageParams)

    return client('task?' + params)
}
export const addTask = ({ description }) => client('task', { body: { description } })
export const updateTask = ({ id, description, completed }) => client(`task/${id}`, { method: 'PUT', body: { description, completed } })
export const removeTask = (id) => client(`task/${id}`, { method: 'DELETE' })