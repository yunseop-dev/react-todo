import client from './client'
export const getUser = () => client('user/me')
export const login = ({ email, password }) => client('user/login', { body: { email, password } })