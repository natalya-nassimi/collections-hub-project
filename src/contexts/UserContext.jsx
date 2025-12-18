import { createContext, useState } from 'react'
import { getUserFromToken, removeTokens } from '../utils/token'

const UserContext = createContext()

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(getUserFromToken())

    const signOut = () => {
        removeTokens()
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ user, setUser, signOut }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }