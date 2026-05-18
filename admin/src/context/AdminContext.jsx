import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";

// provides admin auth state to the entire admin app
export const adminDataContext = createContext();

function AdminContext({ children }) {
    const [adminData, setAdminData] = useState(null);
    const { serverUrl } = useContext(authDataContext);

    // fetch current admin on mount — if cookie is valid, admin is logged in
    const getAdmin = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/user/getadmin", {
                withCredentials: true,
            });
            setAdminData(result.data);
        } catch (error) {
            setAdminData(null);
            console.log("getAdmin error", error);
        }
    };

    useEffect(() => {
        getAdmin();
    }, []);

    return (
        <adminDataContext.Provider value={{ adminData, setAdminData, getAdmin }}>
            {children}
        </adminDataContext.Provider>
    );
}

export default AdminContext;
