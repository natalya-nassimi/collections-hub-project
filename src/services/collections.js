import axios from 'axios'
import { getAccessToken } from '../utils/token'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/collections`
})

export const collectionsIndex = () => {
    return api.get('/')
}

export const collectionsShow = (collectionId) => {
    return api.get(`/${collectionId}/`)
}

export const collectionsCreate = (formData) => {
    return api.post('/', formData, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    })
}

export const collectionsUpdate = (collectionId, formData) => {
    return api.put(`/${collectionId}/`, formData, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    })
}

export const collectionsDelete = (collectionId) => {
    return api.delete(`/${collectionId}`, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
    }
})
}