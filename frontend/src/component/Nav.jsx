import React, { useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5"
import { FaCircleUser } from "react-icons/fa6"
import { MdOutlineShoppingCart, MdContacts } from "react-icons/md"
import { IoMdHome } from "react-icons/io"
import { HiOutlineCollection } from "react-icons/hi"
import axios from 'axios'
import { authDataContext } from '../context/authContext'
import { userDataContext } from '../context/UserContext'
import { shopDataContext } from '../context/ShopContext'
import logo from '../assets/logo.png'

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
            window.location.reload() // clear userData state
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header className='w-full h-16 bg-navy border-b border-navy-hover z-50 fixed top-0 shadow-md shadow-navy/20'>
            <div className='max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between'>

                {/* logo */}
                <div 
                    className='flex items-center gap-2.5 cursor-pointer group' 
                    onClick={() => navigate("/")}
                >
                    <div className='p-1 rounded-lg bg-teal/20 border border-teal/30 group-hover:bg-teal/30 transition-all'>
                        <img src={logo} alt="V-Cart" className='w-6 h-6 object-contain' />
                    </div>
                    <span className='text-xl font-bold tracking-tight text-white'>
                        V-Cart
                    </span>
                </div>

                {/* desktop nav links */}
                <nav className='hidden md:flex items-center gap-8'>
                    {[
                        { label: "HOME", path: "/" },
                        { label: "COLLECTIONS", path: "/collection" },
                        { label: "ABOUT", path: "/about" },
                        { label: "CONTACT", path: "/contact" },
                    ].map(({ label, path }) => {
                        const isActive = location.pathname === path;
                        return (
                            <button 
                                key={path}
                                className={`text-xs font-semibold tracking-widest relative py-1.5 transition-colors ${isActive ? 'text-white font-bold' : 'text-white/80 hover:text-white'}`}
                                onClick={() => navigate(path)}
                            >
                                {label}
                                {isActive && (
                                    <span className='absolute bottom-0 left-0 w-full h-[2.5px] bg-teal rounded-full shadow-[0_0_8px_rgba(0,122,120,0.8)]'></span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* right controls */}
                <div className='flex items-center gap-5 relative'>
                    {/* search toggle */}
                    {!showSearch
                        ? <IoSearchCircleOutline className='w-7 h-7 text-white/80 hover:text-white transition-all cursor-pointer' onClick={() => { setShowSearch(true); navigate("/collection") }} />
                        : <IoSearchCircleSharp className='w-7 h-7 text-teal transition-all cursor-pointer' onClick={() => setShowSearch(false)} />
                    }

                    {/* user avatar / profile dropdown toggle */}
                    {!userData
                        ? <FaCircleUser className='w-6 h-6 text-white/80 hover:text-white transition-all cursor-pointer' onClick={() => setShowProfile(p => !p)} />
                        : <div 
                            className='w-8 h-8 rounded-full bg-teal text-white font-bold text-xs flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-all border border-white/30'
                            onClick={() => setShowProfile(p => !p)}
                          >
                            {userData.name.slice(0, 1).toUpperCase()}
                          </div>
                    }

                    {/* cart icon + badge */}
                    <div className='relative hidden md:block cursor-pointer' onClick={() => navigate("/cart")}>
                        <MdOutlineShoppingCart className='w-6 h-6 text-white/80 hover:text-white transition-all' />
                        {getCartCount() > 0 && (
                            <span className='absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-teal text-white font-bold text-[10px] flex items-center justify-center shadow-md'>
                                {getCartCount()}
                            </span>
                        )}
                    </div>

                    {/* profile dropdown */}
                    {showProfile && (
                        <div className='absolute top-12 right-0 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-charcoal'>
                            <div className='px-4 py-2.5 border-b border-gray-100 text-xs text-gray-500 bg-gray-surface'>
                                Signed in as <p className='text-charcoal font-semibold truncate'>{userData?.name || 'Guest'}</p>
                            </div>
                            <ul className='flex flex-col text-sm text-charcoal font-medium'>
                                {!userData ? (
                                    <li className='px-4 py-2.5 hover:bg-gray-surface hover:text-teal cursor-pointer transition-colors' onClick={() => { navigate("/login"); setShowProfile(false) }}>Login</li>
                                ) : (
                                    <li className='px-4 py-2.5 hover:bg-gray-surface hover:text-teal cursor-pointer transition-colors' onClick={() => { handleLogout(); setShowProfile(false) }}>Log Out</li>
                                )}
                                <li className='px-4 py-2.5 hover:bg-gray-surface hover:text-teal cursor-pointer transition-colors' onClick={() => { navigate("/order"); setShowProfile(false) }}>My Orders</li>
                                <li className='px-4 py-2.5 hover:bg-gray-surface hover:text-teal cursor-pointer transition-colors' onClick={() => { navigate("/about"); setShowProfile(false) }}>About V-Cart</li>
                            </ul>
                        </div>
                    )}
                </div>

            </div>

            {/* search bar overlay */}
            {showSearch && (
                <div className='w-full py-3 bg-white/95 border-b border-gray-200 backdrop-blur-xl absolute top-16 left-0 flex items-center justify-center z-40 shadow-lg'>
                    <div className='w-full max-w-xl px-4 flex items-center gap-2'>
                        <input
                            type="text"
                            className='w-full h-11 bg-gray-surface border border-gray-300 rounded-full px-5 placeholder:text-gray-400 text-charcoal text-sm focus:outline-none focus:border-teal transition-all shadow-inner'
                            placeholder='Search products by name...'
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            autoFocus
                        />
                    </div>
                </div>
            )}

            {/* mobile bottom tab bar */}
            <div className='w-full h-16 flex items-center justify-around px-4 fixed bottom-0 left-0 bg-navy border-t border-navy-hover md:hidden z-50'>
                <button className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${location.pathname === '/' ? 'text-teal font-bold' : 'text-white/70'}`} onClick={() => navigate("/")}>
                    <IoMdHome className='w-6 h-6' />Home
                </button>
                <button className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${location.pathname === '/collection' ? 'text-teal font-bold' : 'text-white/70'}`} onClick={() => navigate("/collection")}>
                    <HiOutlineCollection className='w-6 h-6' />Collections
                </button>
                <button className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${location.pathname === '/contact' ? 'text-teal font-bold' : 'text-white/70'}`} onClick={() => navigate("/contact")}>
                    <MdContacts className='w-6 h-6' />Contact
                </button>
                <button className={`relative flex flex-col items-center gap-0.5 text-[10px] font-medium ${location.pathname === '/cart' ? 'text-teal font-bold' : 'text-white/70'}`} onClick={() => navigate("/cart")}>
                    <MdOutlineShoppingCart className='w-6 h-6' />Cart
                    {getCartCount() > 0 && (
                        <span className='absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-teal text-white font-bold text-[9px] flex items-center justify-center'>
                            {getCartCount()}
                        </span>
                    )}
                </button>
            </div>
        </header>
    )
}

export default Nav

