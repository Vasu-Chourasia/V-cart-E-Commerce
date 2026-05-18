import { createContext } from "react"

export const authDataContext = createContext()

function AuthContext({ children }) {
    // uses env var in production, falls back to localhost in development
    const serverUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"

    return (
        <authDataContext.Provider value={{ serverUrl }}>
            {children}
        </authDataContext.Provider>
    )
}

export default AuthContext
