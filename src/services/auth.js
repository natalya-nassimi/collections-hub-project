import axios from 'axios'
import { setTokens, getAccessToken } from '../utils/token'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/auth`
})

export const signUpService = (formData) => {
    return api.post('/sign-up/', formData)
}

export const signInService = async (formData) => {
    const res = await api.post('/sign-in/', formData)
    setTokens(res.data.tokens)
    return res
}

export const getMeService = () => {
    return api.get('/me/', {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    })
}