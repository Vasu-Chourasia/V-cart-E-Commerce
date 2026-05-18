import React from 'react'

// newsletter subscription UI — cosmetic for now
function NewLetterBox() {
    return (
        <div className='w-[100%] flex items-center justify-center flex-col gap-[15px] py-[50px] px-[20px]'>
            <p className='text-white text-[22px] font-semibold text-center'>Subscribe to get 20% off your first order</p>
            <p className='text-slate-300 text-[14px] text-center'>Stay updated with our latest collections and exclusive deals</p>
            <div className='flex items-center gap-[10px] w-[100%] max-w-[500px]'>
                <input
                    type="email"
                    placeholder='Enter your email'
                    className='flex-1 h-[50px] bg-[#1e3a40] rounded-lg px-[20px] text-white placeholder:text-slate-400'
                />
                <button className='h-[50px] px-[25px] bg-[#56dbfc] text-black font-semibold rounded-lg hover:bg-[#3bc8e8]'>
                    Subscribe
                </button>
            </div>
        </div>
    )
}

export default NewLetterBox
