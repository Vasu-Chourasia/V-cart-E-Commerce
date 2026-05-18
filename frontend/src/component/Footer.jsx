import React from 'react'
import logo from '../assets/logo.png'

function Footer() {
    return (
        <div className='w-[100%] md:h-[36vh] h-[21vh] mb-[77px] md:mb-[0px]'>
            <div className='w-[100%] md:h-[30vh] h-[15vh] bg-[#dbfcfcec] flex items-center justify-center md:px-[50px] px-[5px]'>

                {/* brand */}
                <div className='md:w-[30%] w-[35%] h-[100%] flex items-start justify-center flex-col gap-[5px]'>
                    <div className='flex items-center gap-[5px] mt-[10px] md:mt-[40px]'>
                        <img src={logo} alt="" className='md:w-[40px] md:h-[40px] w-[30px] h-[30px]' />
                        <p className='text-[19px] md:text-[20px] text-black'>V-Cart</p>
                    </div>
                    <p className='text-[15px] text-[#1e2223] hidden md:block'>
                        V-Cart is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery—all backed by trusted service.
                    </p>
                    <p className='text-[15px] text-[#1e2223] flex md:hidden'>Fast. Easy. Reliable. V-Cart Shopping</p>
                </div>

                {/* company links */}
                <div className='md:w-[25%] w-[30%] h-[100%] flex items-center justify-center flex-col text-center'>
                    <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans mt-[10px] md:mt-[40px]'>COMPANY</p>
                    <ul>
                        <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Home</li>
                        <li className='text-[15px] text-[#1e2223] cursor-pointer'>About us</li>
                        <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Delivery</li>
                        <li className='text-[15px] text-[#1e2223] cursor-pointer'>Privacy Policy</li>
                    </ul>
                </div>

                {/* contact */}
                <div className='md:w-[25%] w-[40%] h-[100%] flex items-center justify-center flex-col text-center'>
                    <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans mt-[10px] md:mt-[40px]'>GET IN TOUCH</p>
                    <ul>
                        <li className='text-[15px] text-[#1e2223]'>+91-9131755102</li>
                        <li className='text-[15px] text-[#1e2223]'>vdevwork1906@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div className='w-[100%] h-[1px] bg-slate-400'></div>
            <div className='w-[100%] h-[5vh] bg-[#dbfcfcec] flex items-center justify-center text-[14px]'>
                Copyright 2025 © V-Cart — All Rights Reserved
            </div>
        </div>
    )
}

export default Footer
