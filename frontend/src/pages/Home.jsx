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
        <div className='w-full min-h-screen bg-[#091520] text-white overflow-hidden pb-32'>

            {/* hero banner section */}
            <div className='w-full h-screen relative flex items-center justify-center overflow-hidden border-b border-white/10'>
                <Backgound slideIndex={slideIndex} />
                <Hero slideIndex={slideIndex} setSlideIndex={setSlideIndex} />
            </div>

            {/* full-width alternating background section blocks matching mockup 100% */}
            <div className='w-full'>
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

