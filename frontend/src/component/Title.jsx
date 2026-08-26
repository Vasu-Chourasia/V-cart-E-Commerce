import React from 'react'

// reusable section headline matching the mockup — bulleted title with cyan accent subtext
function Title({ text1, text2, subtext }) {
    return (
        <div className='flex flex-col items-center justify-center text-center gap-3 mb-10 md:mb-14 w-full'>
            <div className='inline-flex items-center gap-3'>
                <span className='text-navy text-lg font-bold'>•</span>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest text-charcoal uppercase'>
                    {text1} <span className='text-teal'>{text2}</span>
                </h2>
                <span className='text-navy text-lg font-bold'>•</span>
            </div>
            {subtext && (
                <p className='text-gray-600 text-sm sm:text-base font-medium max-w-xl leading-relaxed'>
                    {subtext}
                </p>
            )}
        </div>
    )
}

export default Title
