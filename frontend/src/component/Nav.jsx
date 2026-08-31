import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../context/authContext'
import { userDataContext } from '../context/UserContext'
import { shopDataContext } from '../context/ShopContext'

function Nav() {
    const { serverUrl } = useContext(authDataContext)
    const { userData } = useContext(userDataContext)
    const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
    const [showProfile, setShowProfile] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async () => {
        try {
            await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            navigate("/login")
            window.location.reload()
        } catch (error) {
            console.log("Logout error:", error)
        }
    }

    return (
        <>
            {/* Main Header Bar */}
            <header className="bg-primary text-on-primary shadow-md sticky top-0 w-full z-50">
                <div className="flex justify-between items-center w-full px-gutter py-md max-w-container-max mx-auto">
                    
                    {/* Brand & Desktop Navigation */}
                    <div className="flex items-center gap-lg">
                        <Link to="/" className="text-headline-md font-bold text-on-primary hover:opacity-80 transition-all tracking-tight">
                            V-Cart
                        </Link>
                        <nav className="hidden md:flex gap-lg">
                            {[
                                { label: 'Home', path: '/' },
                                { label: 'Collections', path: '/collection' },
                                { label: 'About', path: '/about' },
                                { label: 'Contact', path: '/contact' },
                            ].map(({ label, path }) => (
                                <NavLink
                                    key={path}
                                    to={path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-secondary-fixed font-bold border-b-2 border-secondary-fixed pb-1 text-label-caps uppercase transition-all"
                                            : "text-surface-variant hover:text-on-primary transition-colors text-label-caps uppercase hover:opacity-80"
                                    }
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    {/* Right Action Icons (Search, Cart, Profile) */}
                    <div className="flex items-center gap-md text-on-primary relative">
                        
                        {/* Search Icon Toggle */}
                        <button
                            aria-label="search"
                            onClick={() => {
                                setShowSearch(s => !s)
                                if (location.pathname !== '/collection') navigate('/collection')
                            }}
                            className="hover:opacity-80 transition-all p-xs rounded-full hover:bg-white/10 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-2xl">search</span>
                        </button>

                        {/* Cart Icon + Badge */}
                        <button
                            aria-label="shopping_cart"
                            onClick={() => navigate('/cart')}
                            className="hover:opacity-80 transition-all p-xs rounded-full hover:bg-white/10 relative cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary text-on-secondary font-bold text-[10px] flex items-center justify-center shadow-sm">
                                    {getCartCount()}
                                </span>
                            )}
                        </button>

                        {/* Profile Icon / User Avatar */}
                        {userData ? (
                            <div
                                onClick={() => setShowProfile(p => !p)}
                                className="w-8 h-8 rounded-full bg-secondary text-on-secondary font-bold text-xs flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-all border border-white/30"
                            >
                                {userData.name.slice(0, 1).toUpperCase()}
                            </div>
                        ) : (
                            <button
                                aria-label="account_circle"
                                onClick={() => setShowProfile(p => !p)}
                                className="hover:opacity-80 transition-all p-xs rounded-full hover:bg-white/10 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-2xl">account_circle</span>
                            </button>
                        )}

                        {/* Profile Dropdown */}
                        {showProfile && (
                            <div className="absolute top-12 right-0 w-52 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-2xl overflow-hidden py-1 z-50 text-on-surface">
                                <div className="px-md py-sm border-b border-outline-variant/30 text-xs text-on-surface-variant bg-surface-container-low">
                                    {userData ? (
                                        <>
                                            Signed in as <p className="text-on-surface font-semibold truncate">{userData.name}</p>
                                        </>
                                    ) : (
                                        <p className="text-on-surface font-semibold">Guest User</p>
                                    )}
                                </div>
                                <ul className="flex flex-col text-body-md text-on-surface font-medium">
                                    {!userData ? (
                                        <li
                                            className="px-md py-sm hover:bg-surface-container-low hover:text-secondary cursor-pointer transition-colors"
                                            onClick={() => { navigate("/login"); setShowProfile(false) }}
                                        >
                                            Sign In
                                        </li>
                                    ) : (
                                        <>
                                            <li
                                                className="px-md py-sm hover:bg-surface-container-low hover:text-secondary cursor-pointer transition-colors"
                                                onClick={() => { navigate("/order"); setShowProfile(false) }}
                                            >
                                                My Orders
                                            </li>
                                            <li
                                                className="px-md py-sm hover:bg-surface-container-low hover:text-secondary cursor-pointer transition-colors"
                                                onClick={() => { navigate("/about"); setShowProfile(false) }}
                                            >
                                                About V-Cart
                                            </li>
                                            <li
                                                className="px-md py-sm hover:bg-surface-container-low hover:text-secondary cursor-pointer transition-colors"
                                                onClick={() => { handleLogout(); setShowProfile(false) }}
                                            >
                                                Log Out
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Global Search Bar Input Overlay */}
                {showSearch && (
                    <div className="w-full py-sm bg-surface-container-lowest/95 border-b border-outline-variant/40 backdrop-blur-xl absolute top-full left-0 flex items-center justify-center z-40 shadow-md">
                        <div className="w-full max-w-xl px-gutter flex items-center gap-sm">
                            <input
                                type="text"
                                className="w-full h-10 bg-surface-container-low border border-outline-variant rounded-full px-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-secondary transition-all"
                                placeholder="Search products by name..."
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                autoFocus
                            />
                            <button
                                onClick={() => setShowSearch(false)}
                                className="text-label-caps text-on-surface-variant hover:text-on-surface p-xs cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile Bottom Navigation Bar (< 768px) - Sibling to <header> */}
            <nav className="border-t border-outline-variant bg-surface fixed bottom-0 left-0 w-full z-50 shadow-lg flex justify-around items-center py-sm md:hidden text-on-surface">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center text-label-caps ${isActive ? 'text-secondary font-bold' : 'text-on-surface-variant'}`
                    }
                >
                    <span className="material-symbols-outlined">home</span>
                    <span>Home</span>
                </NavLink>
                <NavLink
                    to="/collection"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center text-label-caps ${isActive ? 'text-secondary font-bold' : 'text-on-surface-variant'}`
                    }
                >
                    <span className="material-symbols-outlined">grid_view</span>
                    <span>Collections</span>
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center text-label-caps ${isActive ? 'text-secondary font-bold' : 'text-on-surface-variant'}`
                    }
                >
                    <span className="material-symbols-outlined">mail</span>
                    <span>Contact</span>
                </NavLink>
                <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center text-label-caps relative ${isActive ? 'text-secondary font-bold' : 'text-on-surface-variant'}`
                    }
                >
                    <span className="material-symbols-outlined">shopping_cart</span>
                    <span>Cart</span>
                    {getCartCount() > 0 && (
                        <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-secondary text-on-secondary font-bold text-[9px] flex items-center justify-center">
                            {getCartCount()}
                        </span>
                    )}
                </NavLink>
            </nav>
        </>
    )
}

export default Nav
