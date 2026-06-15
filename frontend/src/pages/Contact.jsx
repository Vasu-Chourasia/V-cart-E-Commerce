import React from 'react'
import Title from '../component/Title'
import NewLetterBox from '../component/NewLetterBox'
import contact from '../assets/contact.jpg'

function Contact() {
    return (
        <div className='w-full min-h-[100vh] flex flex-col items-center bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[100px] pb-[50px]'>
            <Title text1={'CONTACT'} text2={'US'} />

            <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
                <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
                    <img src={contact} alt="Contact" className='lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm' />
                </div>
                <div className='lg:w-[50%] w-[80%] flex flex-col gap-[20px] mt-[20px] lg:mt-[0px]'>
                    <p className='lg:w-[80%] text-white font-bold lg:text-[18px] text-[15px]'>Our Store</p>
                    <div className='text-white md:text-[16px] text-[13px]'>
                        <p>12345 Random Station</p>
                        <p>Random City, State, India</p>
                    </div>
                    <div className='text-white md:text-[16px] text-[13px]'>
                        <p>Tel: +91-9131755102</p>
                        <p>Email: vdevwork1906@gmail.com</p>
                    </div>
                    <p className='lg:w-[80%] text-white text-[18px] font-bold mt-[10px]'>Careers at V-Cart</p>
                    <p className='lg:w-[80%] text-white md:text-[16px] text-[13px]'>Learn more about our teams and job openings</p>
                    <button className='px-[30px] py-[15px] text-white bg-transparent border rounded-md hover:bg-slate-600 w-fit'>
                        Explore Jobs
                    </button>
                </div>
            </div>

            <NewLetterBox />
        </div>
    )
}

export default Contact
