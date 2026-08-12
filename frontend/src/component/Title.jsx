import React from 'react'

// reusable two-tone section heading — minimalistic with cyan accent
function Title({ text1, text2, subtext }) {
    return (
        <div className='flex flex-col items-center justify-center text-center gap-4 mb-10 md:mb-14 w-full'>
            <div className='inline-flex items-center gap-3'>
                <span className='w-2.5 h-2.5 rounded-full bg-[#56dbfc] animate-pulse'></span>
                <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white'>
                    {text1} <span className='text-[#56dbfc]'>{text2}</span>
                </h2>
                <span className='w-2.5 h-2.5 rounded-full bg-[#56dbfc] animate-pulse'></span>
            </div>
            {subtext && (
                <p className='text-slate-300 text-sm sm:text-base max-w-lg font-normal leading-relaxed'>
                    {subtext}
                </p>
            )}
            <div className='w-16 h-1 bg-gradient-to-r from-transparent via-[#56dbfc] to-transparent mt-1 rounded-full opacity-80'></div>
        </div>
    )
}


export default Title

