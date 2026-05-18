import React, { useContext, useState } from 'react'
import { IoEyeOutline, IoEye } from "react-icons/io5"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { serverUrl } = useContext(authDataContext)
    const { getAdmin } = useContext(adminDataContext)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.post(
                serverUrl + '/api/auth/adminlogin',
                { email, password },
                { withCredentials: true }
            )
            toast.success("Login successful")
            getAdmin()
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error("Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>

            {/* header */}
            <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px]'>
                <h1 className='text-[22px] font-sans'>V-Cart</h1>
            </div>

            {/* title */}
            <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
                <span className='text-[25px] font-semibold'>Admin Login</span>
                <span className='text-[16px]'>Welcome to V-Cart, Admin Panel</span>
            </div>

            {/* form */}
            <div className='max-w-[600px] w-[90%] bg-[#00000025] border-[1px] border-[#96969635] rounded-lg shadow-lg flex items-center justify-center py-[30px]'>
                <form onSubmit={handleLogin} className='w-[90%] flex flex-col items-center gap-[20px]'>
                    <div className='w-[90%] flex flex-col gap-[15px] relative'>
                        <input
                            type="text"
                            className='w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
                            placeholder='Email'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            type={show ? "text" : "password"}
                            className='w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
                            placeholder='Password'
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        {!show
                            ? <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[3%] bottom-[18px]' onClick={() => setShow(true)} />
                            : <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[3%] bottom-[18px]' onClick={() => setShow(false)} />
                        }
                        <button
                            type='submit'
                            className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg text-[17px] font-semibold mt-[10px]'
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login
