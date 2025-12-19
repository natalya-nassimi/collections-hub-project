import axios from 'axios'
import { getAccessToken } from '../utils/token'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/collections`
})

export const itemCreate = (collectionId, formData) => {
    return api.post(`/${collectionId}/items/`, formData, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    })
}

export const itemUpdate = (collectionId, itemId, formData) => {
    return api.put(`/${collectionId}/items/${itemId}/`, formData, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    })
}

export const itemDelete = (collectionId, itemId) => {
    return api.delete(`/${collectionId}/items/${itemId}/`, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    })
}

export const likeItem = (collectionId, itemId) => {
    return api.post(
        `/${collectionId}/items/${itemId}/like/`, {}, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        }
    )
}

export const unlikeItem = (collectionId, itemId) => {
    return api.delete(
        `/${collectionId}/items/${itemId}/like/`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        }
    )
}