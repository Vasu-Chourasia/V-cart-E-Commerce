import React, { useContext, useState } from "react"
import axios from "axios"
import { authDataContext } from "../context/AuthContext"
import { adminDataContext } from "../context/AdminContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

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
                serverUrl + "/api/auth/adminlogin",
                { email, password },
                { withCredentials: true }
            )
            toast.success("Login successful")
            getAdmin()
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-background font-body-md text-body-md text-on-surface min-h-screen flex flex-col justify-center items-center">
            <main className="w-full flex items-center justify-center">
                <div className="flex flex-col w-full items-center justify-center py-xl px-gutter">
                    {/* Subtle ambient decorative glow behind portal */}
                    <div className="relative w-full max-w-md flex flex-col items-center">
                        <div className="absolute -top-16 -left-16 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

                        {/* Security Tier Indicator */}
                        <div className="flex items-center gap-xs mb-md px-md py-xs bg-surface-container-high rounded-full shadow-sm text-secondary">
                            <span className="material-symbols-outlined text-[16px]">verified_user</span>
                            <span className="font-label-caps text-label-caps tracking-wider text-secondary">256-BIT ENCRYPTED CONSOLE</span>
                        </div>

                        {/* Main Card */}
                        <div className="w-full bg-surface-container-lowest rounded-xl shadow-xl p-xl flex flex-col relative z-10 transition-all duration-300">
                            {/* Brand & Admin Badge */}
                            <div className="flex flex-col items-center text-center mb-lg">
                                <div className="flex items-center gap-sm mb-xs">
                                    {/* Monogram / Icon mark */}
                                    <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg shadow-md text-on-primary">
                                        <span className="material-symbols-outlined text-[24px]">shield</span>
                                    </div>
                                    {/* Wordmark */}
                                    <span className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight font-bold">V-CART</span>
                                    <span className="inline-flex items-center px-sm py-0.5 bg-primary-container text-on-primary-container font-label-caps text-label-caps uppercase rounded">
                                        Admin Portal
                                    </span>
                                </div>
                                {/* Header & Subtitle */}
                                <h1 className="font-headline-md text-headline-md text-on-surface mt-sm tracking-tight">Admin Login</h1>
                                <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
                                    Sign in with your store administrator credentials
                                </p>
                            </div>

                            {/* Credential Form */}
                            <form className="flex flex-col gap-lg" id="admin-login-form" onSubmit={handleLogin}>
                                {/* Email Input Group */}
                                <div className="flex flex-col gap-xs text-left">
                                    <label className="font-label-caps text-label-caps text-on-surface-variant uppercase flex justify-between items-center" htmlFor="admin-email">
                                        <span>Corporate Email</span>
                                        <span className="text-secondary font-label-caps text-[10px] tracking-wider uppercase">Privileged Access</span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <span className="material-symbols-outlined absolute left-md text-outline pointer-events-none text-[20px]">
                                            mail
                                        </span>
                                        <input
                                            className="w-full pl-12 pr-md py-3.5 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg outline-none transition-all duration-200 focus:bg-surface-container-lowest focus:shadow-md"
                                            id="admin-email"
                                            name="email"
                                            placeholder="admin@vcart.com"
                                            required
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Password Input Group with Interactive Visibility Toggle */}
                                <div className="flex flex-col gap-xs text-left">
                                    <label className="font-label-caps text-label-caps text-on-surface-variant uppercase flex justify-between items-center" htmlFor="admin-password">
                                        <span>Passcode</span>
                                        <span className="text-outline font-label-caps text-[10px] tracking-wider uppercase">Master Key</span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <span className="material-symbols-outlined absolute left-md text-outline pointer-events-none text-[20px]">
                                            lock
                                        </span>
                                        <input
                                            className={`w-full pl-12 pr-12 py-3.5 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg outline-none transition-all duration-200 focus:bg-surface-container-lowest focus:shadow-md ${!show ? "tracking-wider font-mono text-sm" : ""}`}
                                            id="admin-password"
                                            name="password"
                                            placeholder="Enter administrator password"
                                            required
                                            type={show ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            aria-label="Toggle password visibility"
                                            className="absolute right-md p-1 rounded hover:bg-surface-container-high transition-colors flex items-center justify-center text-outline hover:text-on-surface cursor-pointer"
                                            id="toggle-password-btn"
                                            onClick={() => setShow(!show)}
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined text-[20px]" id="eye-icon">
                                                {show ? "visibility_off" : "visibility"}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Multi-Factor / Hardware Key Notice Notice banner */}
                                <div className="flex items-center gap-sm px-md py-sm bg-surface-container-low rounded-lg text-left">
                                    <span className="material-symbols-outlined text-secondary text-[20px] flex-shrink-0">key</span>
                                    <span className="font-label-caps text-[11px] leading-tight text-on-surface-variant">
                                        Session activity is monitored and cryptographically signed.
                                    </span>
                                </div>

                                {/* Submit Action */}
                                <button
                                    className="w-full bg-primary hover:bg-primary/90 active:scale-[0.99] text-on-primary font-headline-md text-body-lg font-semibold py-3.5 px-lg rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-sm cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
                                    id="submit-btn"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span id="btn-text">Authenticating...</span>
                                            <span className="material-symbols-outlined text-[20px] animate-spin" id="btn-icon">sync</span>
                                        </>
                                    ) : (
                                        <>
                                            <span id="btn-text">Sign In</span>
                                            <span className="material-symbols-outlined text-[20px]" id="btn-icon">arrow_forward</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Institutional Footer Lockup */}
                        <div className="mt-lg flex flex-col items-center text-center gap-xs text-outline font-label-caps text-label-caps">
                            <div className="flex items-center gap-xs">
                                <span className="material-symbols-outlined text-[14px]">policy</span>
                                <span>V-CART ENTERPRISE COMMERCE PLATFORM</span>
                            </div>
                            <p className="text-on-surface-variant text-[11px] tracking-normal font-body-md">
                                Authorized system operators only. Unauthorized connection attempts are logged.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login
