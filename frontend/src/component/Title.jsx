import React from 'react'

// reusable two-tone section heading — text1 is plain, text2 is highlighted
function Title({ text1, text2 }) {
    return (
        <div className='flex items-center gap-[10px]'>
            <p className='text-[white] text-[28px] font-semibold'>{text1}</p>
            <p className='text-[#56dbfc] text-[28px] font-semibold'>{text2}</p>
        </div>
    )
}

export default Title
