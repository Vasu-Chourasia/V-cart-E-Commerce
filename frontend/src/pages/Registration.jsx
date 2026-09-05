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
import Nav from '../component/Nav'
import Footer from '../component/Footer'

function Registration() {
    const [show, setShow] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { serverUrl } = useContext(authDataContext)
    const { getCurrentUser } = useContext(userDataContext)
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.post(serverUrl + '/api/auth/registration', { name, email, password }, { withCredentials: true })
            await getCurrentUser()
            navigate("/")
            toast.success("Account created successfully")
        } catch (error) {
            console.log(error)
            toast.error("Registration failed")
        } finally {
            setLoading(false)
        }
    }

    const googleSignup = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            const { displayName: name, email } = response.user
            await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true })
            await getCurrentUser()
            navigate("/")
            toast.success("Account created successfully")
        } catch (error) {
            console.log(error)
            toast.error("Google signup failed")
        }
    }

    return (
        <div className="bg-surface-container-lowest min-h-screen flex flex-col justify-between antialiased text-on-surface">
            <Nav />

            <main className="flex-grow flex items-center justify-center py-md px-gutter">
                <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-md p-lg overflow-hidden relative">
                    
                    <div className="text-center mb-md">
                        <h1 className="text-headline-md font-bold text-on-surface mb-xs">Create Account</h1>
                        <p className="text-body-md text-on-surface-variant text-sm">Join V-Cart today for a seamless shopping experience</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-xs">
                        <div>
                            <label className="block text-label-caps text-on-surface mb-xs" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-md py-xs bg-surface-container-lowest border border-outline-variant/80 rounded focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all outline-none text-body-md text-on-surface"
                            />
                        </div>

                        <div>
                            <label className="block text-label-caps text-on-surface mb-xs" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-md py-xs bg-surface-container-lowest border border-outline-variant/80 rounded focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all outline-none text-body-md text-on-surface"
                            />
                        </div>

                        <div>
                            <label className="block text-label-caps text-on-surface mb-xs" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={show ? "text" : "password"}
                                    placeholder="At least 8 characters"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-md py-xs bg-surface-container-lowest border border-outline-variant/80 rounded focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all outline-none text-body-md text-on-surface pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShow(!show)}
                                    className="absolute right-3 top-2.5 text-outline hover:text-on-surface cursor-pointer"
                                >
                                    {show ? <IoEye className="w-4 h-4" /> : <IoEyeOutline className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-on-primary py-sm rounded text-label-caps transition-colors shadow-sm cursor-pointer flex items-center justify-center font-bold mt-sm"
                        >
                            {loading ? <Loading /> : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-md relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-outline-variant/50"></div>
                        </div>
                        <div className="relative flex justify-center text-label-caps">
                            <span className="bg-surface-container-lowest px-sm text-on-surface-variant text-xs">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-md">
                        <button
                            type="button"
                            onClick={googleSignup}
                            className="w-full flex items-center justify-center px-md py-xs border border-outline-variant rounded hover:bg-surface-container-low transition-colors text-body-md text-on-surface shadow-sm cursor-pointer"
                        >
                            <svg className="h-4 w-4 mr-sm" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            </svg>
                            Continue with Google
                        </button>
                    </div>

                    <div className="mt-md text-center text-body-md text-on-surface-variant text-sm">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-secondary font-semibold hover:underline cursor-pointer ml-1"
                        >
                            Sign in
                        </button>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Registration
