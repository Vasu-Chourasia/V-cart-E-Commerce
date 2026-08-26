import React from 'react'
import Title from '../component/Title'
import NewLetterBox from '../component/NewLetterBox'
import contact from '../assets/contact.jpg'
import { FiMapPin, FiPhone, FiMail, FiBriefcase } from "react-icons/fi"

function Contact() {
    // High-resolution premium modern store image fallback
    const storeImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"

    return (
        <div className='w-full min-h-screen bg-white pt-24 pb-32 py-12 px-4 md:py-24 md:px-6 text-charcoal'>
            <div className='max-w-7xl mx-auto space-y-16 md:space-y-24'>
                
                <div className='border-b border-gray-200 pb-4'>
                    <Title text1={'CONTACT'} text2={'US'} subtext={'Reach out to our dedicated store teams and support specialists'} />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>

                    {/* left column: premium store showcase photo */}
                    <div className='lg:col-span-5 flex justify-center sticky top-24'>
                        <div className='relative rounded-2xl overflow-hidden border border-gray-200 shadow-md group max-w-md w-full aspect-[4/5] bg-gray-surface'>
                            <img 
                                src={contact} 
                                onError={(e) => { e.target.src = storeImage }}
                                alt="V-Cart Flagship Store" 
                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' 
                            />
                            <div className='absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-gray-200 shadow-md'>
                                <p className='text-xs font-bold uppercase tracking-wider text-teal'>Flagship Location</p>
                                <p className='text-sm font-semibold text-charcoal mt-0.5'>V-Cart Experience Center</p>
                            </div>
                        </div>
                    </div>

                    {/* right column: 2-column grid of 4 distinct cards */}
                    <div className='lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6'>
                        
                        {/* Card 1: Store Information */}
                        <div 
                            className='bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between hover:border-teal transition-all'
                            style={{ padding: '32px' }}
                        >
                            <div className='space-y-3'>
                                <div className='w-14 h-14 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center text-navy'>
                                    <FiMapPin className='w-7 h-7' />
                                </div>
                                <h3 className='text-lg font-bold text-charcoal tracking-tight'>Store Information</h3>
                                <p className='text-xs sm:text-sm text-gray-600 leading-relaxed font-normal'>
                                    12345 Station Road, Commerce Tech Park<br />
                                    Random City, State, India - 400001
                                </p>
                            </div>
                            <div className='pt-3 border-t border-gray-200 text-xs text-gray-500 font-medium'>
                                Open Mon - Sat: 9:00 AM - 8:00 PM
                            </div>
                        </div>

                        {/* Card 2: Phone Support */}
                        <div 
                            className='bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between hover:border-teal transition-all'
                            style={{ padding: '32px' }}
                        >
                            <div className='space-y-3'>
                                <div className='w-14 h-14 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center text-navy'>
                                    <FiPhone className='w-7 h-7' />
                                </div>
                                <h3 className='text-lg font-bold text-charcoal tracking-tight'>Phone Support</h3>
                                <p className='text-base font-extrabold text-navy tracking-tight'>
                                    +91-9131755102
                                </p>
                                <p className='text-xs sm:text-sm text-gray-600 leading-relaxed font-normal'>
                                    Direct line for order tracking, payment confirmation, and general assistance.
                                </p>
                            </div>
                            <div className='pt-3 border-t border-gray-200 text-xs text-gray-500 font-medium'>
                                Toll-Free / 24/7 Helpline
                            </div>
                        </div>

                        {/* Card 3: Email Inquiry */}
                        <div 
                            className='bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between hover:border-teal transition-all'
                            style={{ padding: '32px' }}
                        >
                            <div className='space-y-3'>
                                <div className='w-14 h-14 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center text-navy'>
                                    <FiMail className='w-7 h-7' />
                                </div>
                                <h3 className='text-lg font-bold text-charcoal tracking-tight'>Email Inquiry</h3>
                                <p className='text-xs sm:text-sm font-bold text-navy truncate'>
                                    vdevwork1906@gmail.com
                                </p>
                                <p className='text-xs sm:text-sm text-gray-600 leading-relaxed font-normal'>
                                    Send us your feedback, commercial queries, or return requests.
                                </p>
                            </div>
                            <div className='pt-3 border-t border-gray-200 text-xs text-gray-500 font-medium'>
                                Average response time: 2 hours
                            </div>
                        </div>

                        {/* Card 4: Careers at V-Cart (Spans full width of 2-col grid) */}
                        <div 
                            className='md:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-5 hover:border-teal transition-all'
                            style={{ padding: '32px' }}
                        >
                            <div className='flex items-center gap-4'>
                                <div className='w-14 h-14 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center text-navy flex-shrink-0'>
                                    <FiBriefcase className='w-7 h-7' />
                                </div>
                                <div>
                                    <h3 className='text-lg font-bold text-charcoal tracking-tight'>Careers at V-Cart</h3>
                                    <p className='text-xs text-gray-500 font-medium'>Build the future of digital retail with us</p>
                                </div>
                            </div>
                            <p className='text-xs sm:text-sm text-gray-600 leading-relaxed font-normal'>
                                We are always looking for passionate engineers, designers, and e-commerce strategists to join our team. Explore open roles and build modern shopping experiences.
                            </p>
                            <div className='pt-2'>
                                <button 
                                    className='bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy-hover active:scale-95 transition-all shadow-md shadow-navy/20 inline-flex items-center justify-center cursor-pointer'
                                    style={{ padding: '14px 32px', borderRadius: '8px', fontWeight: 600 }}
                                >
                                    Explore Jobs & Careers
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Newsletter banner section */}
                <NewLetterBox />

            </div>
        </div>
    )
}

export default Contact



