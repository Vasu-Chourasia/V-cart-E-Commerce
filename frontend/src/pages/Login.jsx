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

function Login() {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { serverUrl } = useContext(authDataContext)
    const { getCurrentUser } = useContext(userDataContext)
    const navigate = useNavigate()

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
        <div className="bg-surface-container-lowest min-h-screen flex flex-col justify-between antialiased text-on-surface">
            <Nav />

            <main className="flex-grow flex items-center justify-center py-xl px-gutter">
                <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-md p-xl overflow-hidden relative">
                    
                    <div className="text-center mb-lg">
                        <h1 className="text-display-lg-mobile text-on-surface mb-sm">Welcome Back</h1>
                        <p className="text-body-md text-on-surface-variant">Sign in to your V-Cart account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-md">
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
                                className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant/80 rounded focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none text-body-md text-on-surface"
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
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant/80 rounded focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none text-body-md text-on-surface pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShow(!show)}
                                    className="absolute right-3 top-3 text-outline hover:text-on-surface cursor-pointer"
                                >
                                    {show ? <IoEye className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
                                </button>
                            </div>
                            <div className="flex justify-end mt-sm">
                                <button
                                    type="button"
                                    onClick={() => toast.info("Password reset feature coming soon!")}
                                    className="text-label-caps text-secondary hover:text-secondary-fixed-dim transition-colors cursor-pointer"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-on-primary py-md rounded text-label-caps transition-colors shadow-sm cursor-pointer flex items-center justify-center"
                        >
                            {loading ? <Loading /> : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-lg relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-outline-variant/50"></div>
                        </div>
                        <div className="relative flex justify-center text-label-caps">
                            <span className="bg-surface-container-lowest px-md text-on-surface-variant">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-lg">
                        <button
                            type="button"
                            onClick={googleLogin}
                            className="w-full flex items-center justify-center px-md py-sm border border-outline-variant rounded hover:bg-surface-container-low transition-colors text-body-md text-on-surface shadow-sm cursor-pointer"
                        >
                            <svg className="h-5 w-5 mr-sm" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            </svg>
                            Continue with Google
                        </button>
                    </div>

                    <div className="mt-xl text-center text-body-md text-on-surface-variant">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/signup")}
                            className="text-secondary font-semibold hover:underline cursor-pointer ml-1"
                        >
                            Sign up
                        </button>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Login
