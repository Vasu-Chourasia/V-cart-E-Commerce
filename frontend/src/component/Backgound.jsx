import React from 'react'
import back1 from '../assets/back1.jpg'
import back2 from '../assets/back2.jpg'
import back3 from '../assets/back3.jpg'
import back4 from '../assets/back4.jpg'

const images = [back1, back2, back3, back4]

// background image that switches in sync with Hero slideIndex
function Backgound({ slideIndex }) {
    return (
        <div className='w-[100%] h-[100%] absolute top-0 left-0 overflow-hidden'>
            {images.map((img, i) => (
                <img
                    key={i}
                    src={img}
                    alt=""
                    className={`w-[100%] h-[100%] object-cover absolute top-0 left-0 transition-opacity duration-700 ${i === slideIndex ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}
            {/* dark overlay so text is readable */}
            <div className='absolute top-0 left-0 w-[100%] h-[100%] bg-[#00000060]'></div>
        </div>
    )
}

export default Backgound
