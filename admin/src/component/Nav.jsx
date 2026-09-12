import React, { useContext } from "react"
import axios from "axios"
import { authDataContext } from "../context/AuthContext"
import { adminDataContext } from "../context/AdminContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function Nav() {
    const navigate = useNavigate()
    const { serverUrl } = useContext(authDataContext)
    const { adminData, setAdminData } = useContext(adminDataContext)

    const logOut = async () => {
        try {
            await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            toast.success("Logged out successfully")
        } catch (error) {
            console.log("logout error", error)
            toast.error("Logout failed")
        } finally {
            // Direct state reset to immediately trigger App.jsx route guard
            setAdminData(null)
            navigate("/")
        }
    }

    const adminName = adminData?.email ? adminData.email.split("@")[0] : "Admin Ops"

    return (
        <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/20 z-40 flex items-center justify-between px-lg">
            <div className="flex items-center gap-sm">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Workspace</span>
                <span className="text-outline-variant font-body-md text-body-md">/</span>
                <span className="font-label-caps text-label-caps text-primary uppercase">E-Commerce Store</span>
            </div>
            <div className="flex items-center gap-lg">
                <div className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-label-caps text-label-caps text-on-surface leading-none">{adminName}</span>
                        <span className="font-label-caps text-label-caps text-secondary leading-none text-[10px]">Verified</span>
                    </div>
                </div>
                <button
                    onClick={logOut}
                    className="flex items-center gap-xs px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-error transition-all font-label-caps text-label-caps uppercase cursor-pointer"
                    type="button"
                >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    <span>Logout</span>
                </button>
            </div>
        </header>
    )
}

export default Nav
