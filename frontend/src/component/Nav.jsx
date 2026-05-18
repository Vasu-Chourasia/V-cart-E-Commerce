import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
        <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black'>

            {/* logo */}
            <div className='w-[20%] lg:w-[30%] flex items-center gap-[10px]'>
                <img src={logo} alt="V-Cart" className='w-[30px]' />
                <h1 className='text-[25px] text-black font-sans'>V-Cart</h1>
            </div>

            {/* desktop nav links */}
            <div className='w-[50%] lg:w-[40%] hidden md:flex'>
                <ul className='flex items-center justify-center gap-[19px] text-white'>
                    {[
                        { label: "HOME", path: "/" },
                        { label: "COLLECTIONS", path: "/collection" },
                        { label: "ABOUT", path: "/about" },
                        { label: "CONTACT", path: "/contact" },
                    ].map(({ label, path }) => (
                        <li key={path}
                            className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl'
                            onClick={() => navigate(path)}>
                            {label}
                        </li>
                    ))}
                </ul>
            </div>

            {/* right icons */}
            <div className='w-[30%] flex items-center justify-end gap-[20px]'>
                {!showSearch
                    ? <IoSearchCircleOutline className='w-[38px] h-[38px] text-black cursor-pointer' onClick={() => { setShowSearch(true); navigate("/collection") }} />
                    : <IoSearchCircleSharp className='w-[38px] h-[38px] text-black cursor-pointer' onClick={() => setShowSearch(false)} />
                }

                {/* user avatar / profile dropdown */}
                {!userData
                    ? <FaCircleUser className='w-[29px] h-[29px] text-black cursor-pointer' onClick={() => setShowProfile(p => !p)} />
                    : <div className='w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center cursor-pointer font-semibold'
                        onClick={() => setShowProfile(p => !p)}>
                        {userData.name.slice(0, 1).toUpperCase()}
                    </div>
                }

                {/* cart icon + badge */}
                <div className='relative hidden md:block'>
                    <MdOutlineShoppingCart className='w-[30px] h-[30px] text-black cursor-pointer' onClick={() => navigate("/cart")} />
                    <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[9px] -top-[5px] -right-[5px]'>
                        {getCartCount()}
                    </p>
                </div>
            </div>

            {/* search bar dropdown */}
            {showSearch && (
                <div className='w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 flex items-center justify-center'>
                    <input
                        type="text"
                        className='lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-white text-[18px]'
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
            <div className='w-[100vw] h-[70px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[#191818] md:hidden'>
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
