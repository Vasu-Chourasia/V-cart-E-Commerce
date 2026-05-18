import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoEyeOutline, IoEye } from "react-icons/io5"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import axios from 'axios'
import { authDataContext } from '../context/authContext'
import { userDataContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import google from '../assets/google.png'
import Logo from '../assets/logo.png'

function Login() {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { serverUrl } = useContext(authDataContext)
    const { getCurrentUser } = useContext(userDataContext)
    const navigate = useNavigate()

    // email + password login
    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.post(serverUrl + '/api/auth/login', { email, password }, { withCredentials: true })
            await getCurrentUser()
            navigate("/")
            toast.success("Login successful")
        } catch (error) {
            console.log(error)
            toast.error("Login failed")
        } finally {
            setLoading(false)
        }
    }

    // Google OAuth login
    const googleLogin = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            const { displayName: name, email } = response.user
            await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true })
            await getCurrentUser()
            navigate("/")
            toast.success("Login successful")
        } catch (error) {
            console.log(error)
            toast.error("Google login failed")
        }
    }

    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start'>

            {/* header */}
            <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
                <img className='w-[40px]' src={Logo} alt="V-Cart logo" />
                <h1 className='text-[22px] font-sans'>V-Cart</h1>
            </div>

            {/* title */}
            <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
                <span className='text-[25px] font-semibold'>Login</span>
                <span className='text-[16px]'>Welcome to V-Cart, place your order</span>
            </div>

            {/* form card */}
            <div className='max-w-[600px] w-[90%] bg-[#00000025] border-[1px] border-[#96969635] rounded-lg shadow-lg flex items-center justify-center py-[30px]'>
                <form onSubmit={handleLogin} className='w-[90%] flex flex-col items-center gap-[20px]'>

                    {/* Google button */}
                    <div
                        className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] cursor-pointer'
                        onClick={googleLogin}
                    >
                        <img src={google} alt="Google" className='w-[20px]' />
                        Login with Google
                    </div>

                    <div className='w-[100%] flex items-center gap-[10px]'>
                        <div className='flex-1 h-[1px] bg-[#96969635]'></div>
                        <span>OR</span>
                        <div className='flex-1 h-[1px] bg-[#96969635]'></div>
                    </div>

                    {/* inputs */}
                    <div className='w-[90%] flex flex-col gap-[15px] relative'>
                        <input
                            type="text" placeholder='Email' required
                            className='w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
                            onChange={(e) => setEmail(e.target.value)} value={email}
                        />
                        <input
                            type={show ? "text" : "password"} placeholder='Password' required
                            className='w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
                            onChange={(e) => setPassword(e.target.value)} value={password}
                        />
                        {!show
                            ? <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[3%] bottom-[18px]' onClick={() => setShow(true)} />
                            : <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[3%] bottom-[18px]' onClick={() => setShow(false)} />
                        }
                        <button type='submit'
                            className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[10px] text-[17px] font-semibold'>
                            {loading ? <Loading /> : "Login"}
                        </button>
                        <p className='flex gap-[10px] justify-center'>
                            No account?
                            <span className='text-[#5555f6cf] font-semibold cursor-pointer' onClick={() => navigate("/signup")}>
                                Create one
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
