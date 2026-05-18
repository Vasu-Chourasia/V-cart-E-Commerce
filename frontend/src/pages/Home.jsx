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
        <div className='w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025]'>

            {/* hero banner */}
            <div className='w-[100%] h-[100vh] relative flex items-center'>
                <Backgound slideIndex={slideIndex} />
                <Hero slideIndex={slideIndex} setSlideIndex={setSlideIndex} />
            </div>

            {/* product sections */}
            <LatestCollection />
            <BestSeller />
            <OurPolicy />
            <NewLetterBox />
            <Footer />
        </div>
    )
}

export default Home
