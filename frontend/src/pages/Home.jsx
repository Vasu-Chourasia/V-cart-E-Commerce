import React, { useState } from 'react'
import Nav from '../component/Nav'
import Hero from '../component/Hero'
import OurPolicy from '../component/OurPolicy'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

function Home() {
    const [slideIndex, setSlideIndex] = useState(0)

    return (
        <div className="bg-surface-container-lowest min-h-screen flex flex-col justify-between antialiased text-on-surface">

            <main className="flex-grow">
                <Hero slideIndex={slideIndex} setSlideIndex={setSlideIndex} />
                <OurPolicy />
                <LatestCollection />
                <BestSeller />
                <NewLetterBox />
            </main>

            <Footer />
        </div>
    )
}

export default Home
