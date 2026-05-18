import React, { useEffect, useState } from 'react'

const slides = [
    { heading: "New Arrivals", sub: "Discover the latest trends in fashion" },
    { heading: "Best Sellers", sub: "Shop our most loved products" },
    { heading: "Exclusive Deals", sub: "Unbeatable prices on top brands" },
    { heading: "Fast Delivery", sub: "Get your order in 2-3 business days" },
]

// auto-rotating hero text overlay — synced with Background component via slideIndex
function Hero({ slideIndex, setSlideIndex }) {

    // auto-advance every 3 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex(prev => (prev + 1) % slides.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className='absolute top-[30%] left-[5%] lg:left-[10%] flex flex-col gap-[15px] z-10'>
            <p className='text-[#56dbfc] text-[16px] font-semibold tracking-widest uppercase'>V-Cart Collection</p>
            <h1 className='text-white text-[40px] lg:text-[60px] font-bold leading-tight max-w-[500px]'>
                {slides[slideIndex].heading}
            </h1>
            <p className='text-slate-300 text-[16px] max-w-[350px]'>{slides[slideIndex].sub}</p>

            {/* dot indicators */}
            <div className='flex gap-[8px] mt-[10px]'>
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setSlideIndex(i)}
                        className={`w-[10px] h-[10px] rounded-full transition-all ${i === slideIndex ? 'bg-[#56dbfc] w-[25px]' : 'bg-slate-500'}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Hero
