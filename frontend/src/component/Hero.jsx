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
            <div className='max-w-2xl flex flex-col gap-5 items-start bg-white/85 backdrop-blur-md p-8 sm:p-10 md:p-12 rounded-3xl border border-white/60 shadow-2xl'>
                
                {/* badge */}
                <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy/10 border border-navy/20'>
                    <span className='w-2 h-2 rounded-full bg-teal animate-ping'></span>
                    <span className='text-navy text-xs font-bold tracking-widest uppercase'>V-Cart Exclusive</span>
                </div>

                {/* main headline */}
                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal tracking-tight leading-[1.15] min-h-[110px] md:min-h-[130px]'>
                    {slides[slideIndex].heading}
                </h1>

                {/* subtitle */}
                <p className='text-gray-600 text-base md:text-lg max-w-lg leading-relaxed font-normal min-h-[45px]'>
                    {slides[slideIndex].sub}
                </p>

                {/* action buttons */}
                <div className='flex items-center gap-4 mt-2'>
                    <button
                        onClick={() => navigate("/collection")}
                        className='bg-navy text-white font-semibold text-sm rounded-lg hover:bg-navy-hover active:scale-95 transition-all shadow-md shadow-navy/20 flex items-center gap-2'
                        style={{ padding: '14px 32px', borderRadius: '8px', fontWeight: 600 }}
                    >
                        Explore Collection <FiArrowRight className='w-4 h-4' />
                    </button>
                    <button
                        onClick={() => navigate("/about")}
                        className='bg-white border border-gray-300 text-charcoal font-semibold text-sm rounded-lg hover:bg-gray-surface transition-all shadow-sm'
                        style={{ padding: '14px 32px', borderRadius: '8px', fontWeight: 600 }}
                    >
                        Learn More
                    </button>
                </div>

                {/* dot / pill indicators */}
                <div className='flex items-center gap-2 mt-4'>
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setSlideIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${i === slideIndex ? 'bg-navy w-8' : 'bg-gray-300 hover:bg-gray-400 w-2'}`}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Hero

