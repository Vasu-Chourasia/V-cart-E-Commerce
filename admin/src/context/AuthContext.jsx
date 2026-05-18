import { createContext } from "react";

// provides the backend URL to all components
export const authDataContext = createContext();

function AuthContext({ children }) {
    const serverUrl = "http://localhost:8000";

    return (
        <authDataContext.Provider value={{ serverUrl }}>
            {children}
        </authDataContext.Provider>
    );
}

export default AuthContext;
