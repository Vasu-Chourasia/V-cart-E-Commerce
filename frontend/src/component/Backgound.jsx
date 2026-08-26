import React from 'react'
import back1 from '../assets/back1.jpg'
import back2 from '../assets/back2.jpg'
import back3 from '../assets/back3.jpg'
import back4 from '../assets/back4.jpg'

const images = [back1, back2, back3, back4]

// background image that switches in sync with Hero slideIndex
function Backgound({ slideIndex }) {
    return (
        <div className='w-full h-full absolute top-0 left-0 overflow-hidden'>
            {images.map((img, i) => (
                <img
                    key={i}
                    src={img}
                    alt="Hero background"
                    className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${i === slideIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'} transition-transform duration-[4000ms]`}
                />
            ))}
            {/* light subtle gradient overlay so images stay vibrant */}
            <div className='absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent'></div>
            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white'></div>
        </div>
    )
}

export default Backgound

