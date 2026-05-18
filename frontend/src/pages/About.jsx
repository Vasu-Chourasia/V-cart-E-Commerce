import React from 'react'
import Title from '../component/Title'
import NewLetterBox from '../component/NewLetterBox'
import about from '../assets/about.jpg'

function About() {
    return (
        <div className='w-[99vw] min-h-[100vh] flex flex-col items-center bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[100px] pb-[50px]'>
            <Title text1={'ABOUT'} text2={'US'} />

            <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
                <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
                    <img src={about} alt="About V-Cart" className='lg:w-[65%] w-[80%] shadow-md shadow-black rounded-sm' />
                </div>
                <div className='lg:w-[50%] w-[80%] flex flex-col gap-[20px] mt-[20px] lg:mt-[0px]'>
                    <p className='lg:w-[80%] text-white md:text-[16px] text-[13px]'>
                        V-Cart was born for smart, seamless shopping — created to deliver quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, and great value, V-Cart makes your online shopping experience simple, satisfying, and stress-free.
                    </p>
                    <p className='lg:w-[80%] text-white md:text-[16px] text-[13px]'>
                        Built for modern shoppers — combining style, convenience, and affordability. Whether it's fashion, essentials, or trends, we bring everything you need to one trusted platform.
                    </p>
                    <p className='lg:w-[80%] text-white text-[18px] font-bold mt-[10px]'>Our Mission</p>
                    <p className='lg:w-[80%] text-white md:text-[16px] text-[13px]'>
                        Our mission is to redefine online shopping by delivering quality, affordability, and convenience. V-Cart connects customers with trusted products and brands, offering a seamless, customer-focused experience that saves time and fits every lifestyle.
                    </p>
                </div>
            </div>

            {/* why choose us */}
            <div className='w-[100%] flex flex-col items-center gap-[20px]'>
                <Title text1={'WHY'} text2={'CHOOSE US'} />
                <div className='w-[80%] flex items-center justify-center lg:flex-row flex-col py-[20px] gap-[0px]'>
                    {[
                        { title: "Quality Assurance", desc: "We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction." },
                        { title: "Convenience", desc: "Shop easily with fast delivery, simple navigation, secure checkout, and everything in one place." },
                        { title: "Customer Service", desc: "Our dedicated support team ensures quick responses and a smooth shopping experience every time." },
                    ].map(item => (
                        <div key={item.title} className='lg:w-[33%] w-[90%] h-[250px] border border-gray-100 flex flex-col items-center justify-center gap-[15px] px-[40px] text-white bg-[#ffffff0b]'>
                            <b className='text-[18px] font-semibold text-[#bff1f9] text-center'>{item.title}</b>
                            <p className='text-center text-[14px]'>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <NewLetterBox />
        </div>
    )
}

export default About
