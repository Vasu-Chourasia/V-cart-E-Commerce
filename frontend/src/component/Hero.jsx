import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight } from "react-icons/fi"

const slides = [
    { heading: "New Season Arrivals", sub: "Discover the latest trends in modern fashion and lifestyle essentials." },
    { heading: "Curated Best Sellers", sub: "Shop our most highly rated products loved by thousands." },
    { heading: "Exclusive Digital Deals", sub: "Unbeatable seasonal offers on premium collections." },
    { heading: "Lightning Fast Delivery", sub: "Dispatched direct to your doorstep in 2-3 business days." },
]

// auto-rotating hero text overlay — synced with Background component via slideIndex
function Hero({ slideIndex, setSlideIndex }) {
    const navigate = useNavigate()

    // auto-advance every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex(prev => (prev + 1) % slides.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [setSlideIndex])

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col justify-center h-full pt-16'>
            <div className='max-w-2xl flex flex-col gap-5 items-start'>
                
                {/* badge */}
                <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#56dbfc]/10 border border-[#56dbfc]/30 backdrop-blur-md'>
                    <span className='w-2 h-2 rounded-full bg-[#56dbfc] animate-ping'></span>
                    <span className='text-[#56dbfc] text-xs font-bold tracking-widest uppercase'>V-Cart Exclusive</span>
                </div>

                {/* main headline */}
                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] min-h-[120px] md:min-h-[140px]'>
                    {slides[slideIndex].heading}
                </h1>

                {/* subtitle */}
                <p className='text-slate-300 text-base md:text-lg max-w-lg leading-relaxed font-normal min-h-[50px]'>
                    {slides[slideIndex].sub}
                </p>

                {/* action buttons */}
                <div className='flex items-center gap-4 mt-2'>
                    <button
                        onClick={() => navigate("/collection")}
                        className='px-6 py-3.5 bg-[#56dbfc] text-slate-950 font-bold text-sm rounded-xl hover:bg-[#7be2fc] active:scale-95 transition-all shadow-[0_0_20px_rgba(86,219,252,0.35)] flex items-center gap-2'
                    >
                        Explore Collection <FiArrowRight className='w-4 h-4' />
                    </button>
                    <button
                        onClick={() => navigate("/about")}
                        className='px-6 py-3.5 bg-white/5 border border-white/15 text-white font-semibold text-sm rounded-xl hover:bg-white/10 transition-all backdrop-blur-md'
                    >
                        Learn More
                    </button>
                </div>

                {/* dot / pill indicators */}
                <div className='flex items-center gap-2 mt-6'>
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setSlideIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${i === slideIndex ? 'bg-[#56dbfc] w-8' : 'bg-slate-600 hover:bg-slate-400 w-2'}`}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Hero

