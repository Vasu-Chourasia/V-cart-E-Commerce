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
        <div className='w-full min-h-screen bg-gray-surface text-charcoal flex flex-col items-center justify-center p-4 py-12'>

            {/* header / logo */}
            <div 
                className='flex items-center gap-2.5 cursor-pointer mb-8 group' 
                onClick={() => navigate("/")}
            >
                <div className='p-1.5 rounded-xl bg-teal/10 border border-teal/20 group-hover:bg-teal/20 transition-all'>
                    <img className='w-8 h-8 object-contain' src={Logo} alt="V-Cart logo" />
                </div>
                <h1 className='text-2xl font-bold tracking-tight text-navy'>
                    V-Cart
                </h1>
            </div>

            {/* form card */}
            <div className='max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6'>
                <div className='text-center space-y-1.5'>
                    <h2 className='text-2xl font-bold text-charcoal tracking-tight'>Welcome Back</h2>
                    <p className='text-xs text-gray-500'>Log in to your account to manage orders and shopping cart</p>
                </div>

                <form onSubmit={handleLogin} className='space-y-4'>

                    {/* Google button */}
                    <button
                        type='button'
                        className='w-full px-6 py-3 bg-white border border-gray-300 hover:bg-gray-surface active:scale-[0.99] rounded-lg flex items-center justify-center gap-3 text-sm font-semibold text-charcoal transition-all shadow-sm cursor-pointer'
                        style={{ padding: '12px 24px', borderRadius: '8px' }}
                        onClick={googleLogin}
                    >
                        <img src={google} alt="Google" className='w-4 h-4 object-contain' />
                        Continue with Google
                    </button>

                    <div className='flex items-center gap-3 py-1'>
                        <div className='flex-1 h-px bg-gray-200'></div>
                        <span className='text-[11px] font-bold text-gray-400 uppercase tracking-widest'>or email</span>
                        <div className='flex-1 h-px bg-gray-200'></div>
                    </div>

                    {/* inputs */}
                    <div className='space-y-3.5'>
                        <div>
                            <label className='text-xs font-semibold text-gray-700 block mb-1'>Email Address</label>
                            <input
                                type="email" placeholder='name@example.com' required
                                className='w-full h-11 bg-white border border-gray-300 rounded-xl px-4 text-charcoal text-sm focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all placeholder:text-gray-400'
                                onChange={(e) => setEmail(e.target.value)} value={email}
                            />
                        </div>

                        <div>
                            <label className='text-xs font-semibold text-gray-700 block mb-1'>Password</label>
                            <div className='relative'>
                                <input
                                    type={show ? "text" : "password"} placeholder='••••••••' required
                                    className='w-full h-11 bg-white border border-gray-300 rounded-xl px-4 text-charcoal text-sm focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all placeholder:text-gray-400 pr-10'
                                    onChange={(e) => setPassword(e.target.value)} value={password}
                                />
                                <button
                                    type='button'
                                    className='absolute right-3 top-3 text-gray-400 hover:text-charcoal transition-colors'
                                    onClick={() => setShow(!show)}
                                >
                                    {!show ? <IoEyeOutline className='w-5 h-5' /> : <IoEye className='w-5 h-5' />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type='submit'
                            className='w-full px-6 py-3 bg-navy text-white rounded-lg text-sm font-bold flex items-center justify-center hover:bg-navy-hover active:scale-[0.99] transition-all shadow-md shadow-navy/20 mt-2 cursor-pointer'
                            style={{ padding: '12px 24px', borderRadius: '8px' }}
                        >
                            {loading ? <Loading /> : "Sign In"}
                        </button>

                    </div>
                </form>

                <div className='border-t border-gray-200 pt-4 text-center text-xs text-gray-500'>
                    Don't have an account?{' '}
                    <button 
                        className='text-teal font-bold hover:underline ml-1 cursor-pointer'
                        onClick={() => navigate("/signup")}
                    >
                        Create account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login

