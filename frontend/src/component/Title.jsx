import React from 'react'

// reusable two-tone section heading — minimalistic with cyan accent
function Title({ text1, text2, subtext }) {
    return (
        <div className='flex flex-col items-center justify-center text-center gap-1.5 mb-2'>
            <div className='inline-flex items-center gap-2.5'>
                <span className='w-2 h-2 rounded-full bg-[#56dbfc] animate-pulse'></span>
                <h2 className='text-2xl md:text-3xl font-bold tracking-tight text-white'>
                    {text1} <span className='text-[#56dbfc]'>{text2}</span>
                </h2>
                <span className='w-2 h-2 rounded-full bg-[#56dbfc] animate-pulse'></span>
            </div>
            {subtext && (
                <p className='text-slate-400 text-xs md:text-sm max-w-md font-normal'>
                    {subtext}
                </p>
            )}
            <div className='w-12 h-0.5 bg-gradient-to-r from-transparent via-[#56dbfc] to-transparent mt-1 rounded-full opacity-80'></div>
        </div>
    )
}

export default Title

