import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()
    return (
        <div className='w-full min-h-screen bg-gray-surface flex flex-col items-center justify-center gap-5 text-charcoal p-4'>
            <h1 className='text-7xl sm:text-8xl font-extrabold text-navy tracking-tight'>404</h1>
            <p className='text-xl sm:text-2xl font-bold text-charcoal'>Page not found</p>
            <p className='text-sm text-gray-500 max-w-sm text-center'>The page you are looking for does not exist or has been moved.</p>
            <button
                onClick={() => navigate("/")}
                className='mt-2 px-8 py-3 bg-navy text-white text-sm font-bold rounded-lg hover:bg-navy-hover transition-all shadow-md shadow-navy/20 cursor-pointer'
            >
                Back to Home
            </button>
        </div>
    )
}

export default NotFound
