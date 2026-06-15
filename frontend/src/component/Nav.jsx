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
        <div className='w-full h-[70px] bg-[#0c2025e0] backdrop-blur-md border-b border-[#ffffff15] z-50 fixed top-0 flex items-center justify-between px-[30px] shadow-lg shadow-black/10'>

            {/* logo */}
            <div className='flex items-center gap-[10px] cursor-pointer hover:opacity-90 transition-opacity' onClick={() => navigate("/")}>
                <img src={logo} alt="V-Cart" className='w-[32px] h-[32px] object-contain hover:rotate-6 transition-transform duration-300' />
                <h1 className='text-[24px] text-white font-sans font-bold tracking-wide bg-gradient-to-r from-white via-slate-100 to-[#a5f3fc] bg-clip-text text-transparent'>V-Cart</h1>
            </div>

            {/* desktop nav links */}
            <div className='hidden md:flex items-center justify-center flex-1 mx-[40px]'>
                <ul className='flex items-center gap-[30px]'>
                    {[
                        { label: "HOME", path: "/" },
                        { label: "COLLECTIONS", path: "/collection" },
                        { label: "ABOUT", path: "/about" },
                        { label: "CONTACT", path: "/contact" },
                    ].map(({ label, path }) => {
                        const isActive = location.pathname === path;
                        return (
                            <li key={path}
                                className={`text-[14px] font-medium tracking-wider cursor-pointer relative py-[6px] transition-colors duration-200 ${isActive ? 'text-[#56dbfc]' : 'text-slate-300 hover:text-white'}`}
                                onClick={() => navigate(path)}>
                                {label}
                                {isActive && (
                                    <span className='absolute bottom-0 left-0 w-full h-[2px] bg-[#56dbfc] rounded-full shadow-[0_0_8px_rgba(86,219,252,0.8)]'></span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* right icons */}
            <div className='flex items-center gap-[22px]'>
                {!showSearch
                    ? <IoSearchCircleOutline className='w-[32px] h-[32px] text-slate-300 hover:text-[#56dbfc] hover:scale-105 transition-all cursor-pointer' onClick={() => { setShowSearch(true); navigate("/collection") }} />
                    : <IoSearchCircleSharp className='w-[32px] h-[32px] text-[#56dbfc] hover:scale-105 transition-all cursor-pointer' onClick={() => setShowSearch(false)} />
                }

                {/* user avatar / profile dropdown */}
                {!userData
                    ? <FaCircleUser className='w-[26px] h-[26px] text-slate-300 hover:text-[#56dbfc] hover:scale-105 transition-all cursor-pointer' onClick={() => setShowProfile(p => !p)} />
                    : <div className='w-[30px] h-[30px] bg-[#56dbfc] text-black rounded-full flex items-center justify-center cursor-pointer font-semibold text-[14px] hover:opacity-90 transition-opacity'
                        onClick={() => setShowProfile(p => !p)}>
                        {userData.name.slice(0, 1).toUpperCase()}
                    </div>
                }

                {/* cart icon + badge */}
                <div className='relative hidden md:block'>
                    <MdOutlineShoppingCart className='w-[26px] h-[26px] text-slate-300 hover:text-[#56dbfc] hover:scale-105 transition-all cursor-pointer' onClick={() => navigate("/cart")} />
                    <p className='absolute w-[17px] h-[17px] flex items-center justify-center bg-[#56dbfc] text-black font-bold rounded-full text-[9px] -top-[5px] -right-[5px]'>
                        {getCartCount()}
                    </p>
                </div>
            </div>

            {/* search bar dropdown */}
            {showSearch && (
                <div className='w-full h-[80px] bg-[#0c2025e6] border-b border-[#ffffff10] backdrop-blur-md absolute top-[100%] left-0 flex items-center justify-center z-40 transition-all duration-300'>
                    <input
                        type="text"
                        className='lg:w-[50%] w-[80%] h-[55%] bg-[#1a2f34] border border-[#ffffff15] rounded-[30px] px-[25px] placeholder:text-slate-400 text-white text-[16px] focus:outline-none focus:border-[#56dbfc] transition-colors shadow-inner'
                        placeholder='Search products...'
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </div>
            )}

            {/* profile dropdown */}
            {showProfile && (
                <div className='absolute w-[220px] bg-[#000000d7] top-[110%] right-[4%] border border-[#aaa9a9] rounded-[10px] z-10'>
                    <ul className='flex flex-col text-[17px] py-[10px] text-white'>
                        {!userData
                            ? <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/login"); setShowProfile(false) }}>Login</li>
                            : <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { handleLogout(); setShowProfile(false) }}>LogOut</li>
                        }
                        <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/order"); setShowProfile(false) }}>Orders</li>
                        <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/about"); setShowProfile(false) }}>About</li>
                    </ul>
                </div>
            )}

            {/* mobile bottom tab bar */}
            <div className='w-full h-[70px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[#191818] md:hidden'>
                <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/")}><IoMdHome className='w-[28px] h-[28px]' />Home</button>
                <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/collection")}><HiOutlineCollection className='w-[28px] h-[28px]' />Collections</button>
                <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/contact")}><MdContacts className='w-[28px] h-[28px]' />Contact</button>
                <div className='relative'>
                    <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/cart")}><MdOutlineShoppingCart className='w-[28px] h-[28px]' />Cart</button>
                    <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-white text-black font-semibold rounded-full text-[9px] -top-[5px] -right-[5px]'>{getCartCount()}</p>
                </div>
            </div>

        </div>
    )
}

export default Nav
