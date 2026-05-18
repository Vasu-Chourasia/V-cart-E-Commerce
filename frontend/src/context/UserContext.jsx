import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { authDataContext } from "./authContext"

// provides current logged-in user data to the whole app
export const userDataContext = createContext()

function UserContext({ children }) {
    const [userData, setUserData] = useState(null)
    const { serverUrl } = useContext(authDataContext)

    // called after login/signup to populate userData
    const getCurrentUser = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
                withCredentials: true,
            })
            setUserData(result.data)
        } catch (error) {
            setUserData(null)
            console.log("getCurrentUser error", error)
        }
    }

    // check auth state on every page load
    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <userDataContext.Provider value={{ userData, setUserData, getCurrentUser }}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext
