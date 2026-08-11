import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Footer() {
    return (
        <footer className='w-full bg-[#071418] border-t border-white/10 text-slate-300 pt-16 pb-32 mt-16'>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12'>
                
                {/* Brand info */}
                <div className='md:col-span-2 flex flex-col gap-4'>
                    <div className='flex items-center gap-2.5 cursor-pointer'>
                        <img src={logo} alt="V-Cart" className='w-8 h-8 object-contain' />
                        <span className='text-2xl font-bold text-white tracking-wide bg-gradient-to-r from-white to-[#56dbfc] bg-clip-text text-transparent'>
                            V-Cart
                        </span>
                    </div>
                    <p className='text-sm text-slate-400 max-w-md leading-relaxed'>
                        V-Cart is your premier online shopping destination, offering high-quality fashion, modern lifestyle essentials, fast delivery, and standard customer support.
                    </p>
                </div>

                {/* Quick links */}
                <div className='flex flex-col gap-3'>
                    <h4 className='text-white font-semibold text-base tracking-wider uppercase text-xs text-[#56dbfc]'>
                        Navigation
                    </h4>
                    <ul className='flex flex-col gap-2 text-sm text-slate-400'>
                        <li><Link to="/" className='hover:text-[#56dbfc] transition-colors'>Home</Link></li>
                        <li><Link to="/collection" className='hover:text-[#56dbfc] transition-colors'>Collections</Link></li>
                        <li><Link to="/about" className='hover:text-[#56dbfc] transition-colors'>About Us</Link></li>
                        <li><Link to="/contact" className='hover:text-[#56dbfc] transition-colors'>Contact</Link></li>
                    </ul>
                </div>

                {/* Contact info */}
                <div className='flex flex-col gap-3'>
                    <h4 className='text-white font-semibold text-base tracking-wider uppercase text-xs text-[#56dbfc]'>
                        Get In Touch
                    </h4>
                    <ul className='flex flex-col gap-2 text-sm text-slate-400'>
                        <li>Phone: +91-9131755102</li>
                        <li>Email: vdevwork1906@gmail.com</li>
                        <li>Location: Random City, State, India</li>
                    </ul>
                </div>

            </div>

            {/* Copyright divider line */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500'>
                <p>Copyright {new Date().getFullYear()} © V-Cart — All Rights Reserved</p>
                <p className='text-slate-400 font-medium'>Designed for Modern Commerce</p>
            </div>
        </footer>
    )
}

export default Footer

