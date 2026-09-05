import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Backgound from './Backgound'

const slides = [
    { heading: "Elevate Your Style", sub: "Discover the new standard in structural minimalism and uncompromising quality." },
    { heading: "Modern Textures", sub: "Clean lines, natural fabrics, and lightweight premium layers designed for everyday utility." },
    { heading: "Stitch Essentials", sub: "An entry point to a refined capsule wardrobe. Uncompromised tailoring for the modern creative." },
    { heading: "Minimalist Comfort", sub: "Technical materials meet refined casual silhouettes. High versatility across seasons." }
]

function Hero({ slideIndex, setSlideIndex }) {
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex(prev => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [setSlideIndex])

    return (
        <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center overflow-hidden">
            <Backgound slideIndex={slideIndex} />

            {/* Container for alignment */}
            <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter flex justify-start items-center">
                
                {/* Minimal top-left styled card */}
                <div className="bg-surface-container-lowest/90 backdrop-blur-md p-md md:p-lg rounded-xl border border-outline-variant/30 shadow-lg max-w-md flex flex-col items-start text-left">

                    <h1 className="text-headline-md font-bold text-on-surface mb-xs leading-snug">
                        {slides[slideIndex].heading}
                    </h1>
                    
                    <p className="text-body-md text-on-surface-variant mb-sm leading-relaxed text-sm">
                        {slides[slideIndex].sub}
                    </p>

                    <button
                        onClick={() => navigate("/collection")}
                        className="bg-primary hover:bg-primary/90 text-on-primary rounded text-label-caps uppercase px-md py-xs transition-colors tracking-wider shadow-md cursor-pointer font-bold mb-sm"
                    >
                        Shop Collection
                    </button>

                    {/* Carousel Dots inside the card */}
                    <div className="flex items-center gap-xs">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setSlideIndex(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === slideIndex ? 'bg-primary w-6' : 'bg-outline/30 w-1.5'}`}
                            />
                        ))}
                    </div>
                </div>
                
            </div>
        </section>
    )
}

export default Hero
