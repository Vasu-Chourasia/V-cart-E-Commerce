import React from 'react'
import Title from '../component/Title'
import NewLetterBox from '../component/NewLetterBox'
import about from '../assets/about.jpg'

function About() {
    const aboutImageFallback = "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop"

    return (
        <div className='w-full min-h-screen bg-white pt-24 pb-32 py-12 px-4 md:py-24 md:px-6 text-charcoal'>
            <div className='max-w-7xl mx-auto space-y-16 md:space-y-24'>
                
                <div className='border-b border-gray-200 pb-4'>
                    <Title text1={'ABOUT'} text2={'US'} subtext={'Learn more about our store mission and values'} />
                </div>

                {/* main story section */}
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-center'>
                    <div className='lg:col-span-5 flex justify-center'>
                        <div className='relative rounded-2xl overflow-hidden border border-gray-200 shadow-md group max-w-md w-full aspect-[4/5] bg-gray-surface'>
                            <img 
                                src={about} 
                                onError={(e) => { e.target.src = aboutImageFallback }}
                                alt="About V-Cart" 
                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                            />
                        </div>
                    </div>

                    <div 
                        className='lg:col-span-7 bg-gray-surface border border-gray-200 rounded-2xl shadow-sm space-y-6 text-gray-600 text-sm leading-relaxed'
                        style={{ padding: '32px' }}
                    >
                        <span className='px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal bg-teal/10 border border-teal/20 rounded-full inline-block'>
                            Our Story
                        </span>
                        <h3 className='text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight'>
                            Smart, Seamless Shopping Redefined
                        </h3>
                        <p className='text-sm sm:text-base text-gray-600 leading-relaxed font-normal'>
                            V-Cart was born out of a desire for smart, seamless shopping — created to deliver quality products, trending styles, and everyday essentials in one single place. With reliable service, fast delivery, and great value, V-Cart makes your online shopping experience simple, satisfying, and stress-free.
                        </p>
                        <p className='text-sm sm:text-base text-gray-600 leading-relaxed font-normal'>
                            Built for modern shoppers — combining style, convenience, and affordability. Whether it's fashion, essentials, or trends, we bring everything you need to one trusted platform.
                        </p>
                        
                        <div className='border-t border-gray-200 pt-5 space-y-2'>
                            <h4 className='text-charcoal font-bold text-base tracking-tight'>Our Mission</h4>
                            <p className='text-xs sm:text-sm text-gray-500 leading-relaxed'>
                                Our mission is to redefine online shopping by delivering quality, affordability, and convenience. V-Cart connects customers with trusted products and brands, offering a customer-focused experience that fits every lifestyle.
                            </p>
                        </div>
                    </div>
                </div>

                {/* why choose us cards */}
                <div className='space-y-10'>
                    <Title text1={'WHY'} text2={'CHOOSE US'} subtext={'Our core pillars of commitment and service'} />
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {[
                            { title: "Quality Assurance", desc: "We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction." },
                            { title: "Convenience", desc: "Shop easily with fast delivery, simple navigation, secure checkout, and everything in one place." },
                            { title: "Customer Service", desc: "Our dedicated support team ensures quick responses and a smooth shopping experience every time." },
                        ].map(item => (
                            <div 
                                key={item.title} 
                                className='bg-white border border-gray-200 hover:border-teal rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 justify-center text-center group'
                                style={{ padding: '32px' }}
                            >
                                <h4 className='text-lg font-bold text-navy tracking-tight'>{item.title}</h4>
                                <p className='text-sm text-gray-600 leading-relaxed font-normal'>{item.desc}</p>
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

