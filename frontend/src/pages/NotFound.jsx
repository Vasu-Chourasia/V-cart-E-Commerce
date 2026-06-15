import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()
    return (
        <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center justify-center gap-[20px] text-white'>
            <h1 className='text-[80px] font-bold text-[#56dbfc]'>404</h1>
            <p className='text-[22px]'>Page not found</p>
            <p className='text-slate-400'>The page you're looking for doesn't exist.</p>
            <button
                onClick={() => navigate("/")}
                className='mt-[10px] px-[30px] py-[12px] bg-[#6060f5] rounded-lg text-[16px] font-semibold hover:bg-[#4a4ad4]'
            >
                Go Home
            </button>
        </div>
    )
}

export default NotFound
