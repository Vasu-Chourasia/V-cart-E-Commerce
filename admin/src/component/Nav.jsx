import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

function Nav() {
    const navigate = useNavigate()
    const { serverUrl } = useContext(authDataContext)
    const { getAdmin } = useContext(adminDataContext)

    const logOut = async () => {
        try {
            await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            toast.success("Logged out successfully")
            getAdmin() // re-fetches admin — will return null, showing Login
            navigate("/login")
        } catch (error) {
            console.log(error)
            toast.error("Logout failed")
        }
    }

    return (
        <div className='w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black'>
            <div className='flex items-center gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
                <h1 className='text-[25px] text-black font-sans'>V-Cart</h1>
            </div>
            <button
                className='text-[15px] border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white'
                onClick={logOut}
            >
                LogOut
            </button>
        </div>
    )
}

export default Nav
