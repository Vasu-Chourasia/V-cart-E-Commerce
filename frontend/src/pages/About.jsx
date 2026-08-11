import React from 'react'
import Title from '../component/Title'
import NewLetterBox from '../component/NewLetterBox'
import about from '../assets/about.jpg'

function About() {
    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-[#141414] via-[#0c2025] to-[#0c2025] pt-24 pb-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16'>
                
                <div className='border-b border-white/10 pb-4'>
                    <Title text1={'ABOUT'} text2={'US'} subtext={'Learn more about our store mission and values'} />
                </div>

                {/* main story section */}
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-center'>
                    <div className='lg:col-span-5 flex justify-center'>
                        <div className='relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group max-w-md w-full'>
                            <img src={about} alt="About V-Cart" className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
                        </div>
                    </div>

                    <div className='lg:col-span-7 bg-[#12282e]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5 text-slate-300 text-sm leading-relaxed'>
                        <span className='px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#56dbfc] bg-[#56dbfc]/10 border border-[#56dbfc]/20 rounded-full inline-block'>
                            Our Story
                        </span>
                        <h3 className='text-2xl font-bold text-white tracking-tight'>
                            Smart, Seamless Shopping Redefined
                        </h3>
                        <p>
                            V-Cart was born out of a desire for smart, seamless shopping — created to deliver quality products, trending styles, and everyday essentials in one single place. With reliable service, fast delivery, and great value, V-Cart makes your online shopping experience simple, satisfying, and stress-free.
                        </p>
                        <p>
                            Built for modern shoppers — combining style, convenience, and affordability. Whether it's fashion, essentials, or trends, we bring everything you need to one trusted platform.
                        </p>
                        
                        <div className='border-t border-white/10 pt-4 space-y-2'>
                            <h4 className='text-white font-bold text-base'>Our Mission</h4>
                            <p className='text-xs text-slate-400'>
                                Our mission is to redefine online shopping by delivering quality, affordability, and convenience. V-Cart connects customers with trusted products and brands, offering a customer-focused experience that fits every lifestyle.
                            </p>
                        </div>
                    </div>
                </div>

                {/* why choose us cards */}
                <div className='space-y-8'>
                    <Title text1={'WHY'} text2={'CHOOSE US'} subtext={'Our core pillars of commitment and service'} />
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {[
                            { title: "Quality Assurance", desc: "We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction." },
                            { title: "Convenience", desc: "Shop easily with fast delivery, simple navigation, secure checkout, and everything in one place." },
                            { title: "Customer Service", desc: "Our dedicated support team ensures quick responses and a smooth shopping experience every time." },
                        ].map(item => (
                            <div 
                                key={item.title} 
                                className='bg-[#12282e]/60 backdrop-blur-md border border-white/10 hover:border-[#56dbfc]/40 rounded-2xl p-6 shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 justify-center text-center'
                            >
                                <h4 className='text-base font-bold text-[#56dbfc]'>{item.title}</h4>
                                <p className='text-xs text-slate-300 leading-relaxed'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <NewLetterBox />

            </div>
        </div>
    )
}

export default About

