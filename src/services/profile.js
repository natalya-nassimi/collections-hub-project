import axios from 'axios'
import { getAccessToken } from '../utils/token'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/auth`
})

export const getMyProfile = () => {
    return api.get('/me/', {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    })
}