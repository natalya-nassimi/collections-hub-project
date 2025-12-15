const access_token = 'accessToken'
const refresh_token = 'refreshToken'

export const setTokens = (tokens) => {
    if (tokens.access) {
        localStorage.setItem(access_token, tokens.access)
    }
    if (tokens.refresh) {
        localStorage.setItem(refresh_token, tokens.refresh)
    }
}

export const getAccessToken = () => {
    return localStorage.getItem(access_token)
}

export const getRefreshToken = () => {
    return localStorage.getItem(refresh_token)
}

export const removeTokens = () => {
    localStorage.removeItem(access_token)
    localStorage.removeItem(refresh_token)
}

export const getUserFromToken = () => {
    const token = getAccessToken()
    if (!token) return null

try {
    const payloadString = token.split('.')[1]
    const payloadJSON = atob(payloadString)
    const { user, exp } = JSON.parse(payloadJSON)

    if (exp < Date.now() / 1000) {
        removeTokens()
        return null
    }
    return user
    } catch {
    removeTokens()
    return null
    }
}