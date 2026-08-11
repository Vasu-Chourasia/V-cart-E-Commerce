import React, { useState } from 'react'
import Hero from '../component/Hero'
import Backgound from '../component/Backgound'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

function Home() {
    const [slideIndex, setSlideIndex] = useState(0)

    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-[#141414] via-[#0c2025] to-[#0c2025] text-white overflow-hidden'>

            {/* hero banner section */}
            <div className='w-full h-screen relative flex items-center justify-center overflow-hidden border-b border-white/10'>
                <Backgound slideIndex={slideIndex} />
                <Hero slideIndex={slideIndex} setSlideIndex={setSlideIndex} />
            </div>

            {/* product & feature sections */}
            <div className='space-y-6'>
                <LatestCollection />
                <BestSeller />
                <OurPolicy />
                <NewLetterBox />
            </div>

            <Footer />
        </div>
    )
}

export default Home

