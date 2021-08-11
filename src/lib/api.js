import client from './client'
export const getUser = () => client('user/me')