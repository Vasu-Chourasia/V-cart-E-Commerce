import { createContext } from "react"

// single source of truth for the backend URL
export const authDataContext = createContext()

function AuthContext({ children }) {
    const serverUrl = "http://localhost:8000"

    return (
        <authDataContext.Provider value={{ serverUrl }}>
            {children}
        </authDataContext.Provider>
    )
}

export default AuthContext
