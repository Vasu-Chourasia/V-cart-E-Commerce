import React from 'react'

const images = [
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1486308512493-ae6a1c5abfb5?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1600"
]

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
            {/* premium subtle dimming overlay */}
            <div className='absolute inset-0 bg-black/15'></div>
            <div className='absolute inset-0 bg-gradient-to-r from-black/10 to-transparent'></div>
        </div>
    )
}

export default Backgound


