import React from 'react'
import Title from '../component/Title'
import NewLetterBox from '../component/NewLetterBox'
import contact from '../assets/contact.jpg'
import { FiMapPin, FiPhone, FiMail, FiBriefcase } from "react-icons/fi"

function Contact() {
    // High-resolution premium modern store image fallback
    const storeImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"

    return (
        <div className='w-full min-h-screen bg-[#0a1520] pt-24 pb-32 py-12 px-4 md:py-24 md:px-6'>
            <div className='max-w-7xl mx-auto space-y-16 md:space-y-24'>

                
                <div className='border-b border-white/10 pb-4'>
                    <Title text1={'CONTACT'} text2={'US'} subtext={'Reach out to our dedicated store teams and support specialists'} />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>

                    {/* left column: premium store showcase photo */}
                    <div className='lg:col-span-5 flex justify-center sticky top-24'>
                        <div className='relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group max-w-md w-full aspect-[4/5] bg-[#12282e]'>
                            <img 
                                src={contact} 
                                onError={(e) => { e.target.src = storeImage }}
                                alt="V-Cart Flagship Store" 
                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' 
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-[#0c2025] via-transparent to-transparent opacity-80'></div>
                            <div className='absolute bottom-6 left-6 right-6 p-4 bg-[#0c2025]/90 backdrop-blur-md rounded-xl border border-white/10'>
                                <p className='text-xs font-bold uppercase tracking-wider text-[#56dbfc]'>Flagship Location</p>
                                <p className='text-sm font-semibold text-white mt-0.5'>V-Cart Experience Center</p>
                            </div>
                        </div>
                    </div>

                    {/* right column: 2-column grid of 4 distinct cards */}
                    <div className='lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6'>
                        
                        {/* Card 1: Store Information */}
                        <div className='bg-[#0e2328] border border-white/15 rounded-xl p-6 sm:p-7 shadow-xl space-y-4 flex flex-col justify-between hover:border-[#56dbfc]/40 transition-all'>
                            <div className='space-y-3'>
                                <div className='w-12 h-12 rounded-lg bg-[#56dbfc]/10 border border-[#56dbfc]/20 flex items-center justify-center text-[#56dbfc]'>
                                    <FiMapPin className='w-6 h-6' />
                                </div>
                                <h3 className='text-base font-bold text-white tracking-tight'>Store Information</h3>
                                <p className='text-xs text-slate-300 leading-relaxed'>
                                    12345 Station Road, Commerce Tech Park<br />
                                    Random City, State, India - 400001
                                </p>
                            </div>
                            <div className='pt-2 border-t border-white/10 text-[11px] text-slate-400'>
                                Open Mon - Sat: 9:00 AM - 8:00 PM
                            </div>
                        </div>

                        {/* Card 2: Phone Support */}
                        <div className='bg-[#0e2328] border border-white/15 rounded-xl p-6 sm:p-7 shadow-xl space-y-4 flex flex-col justify-between hover:border-[#56dbfc]/40 transition-all'>
                            <div className='space-y-3'>
                                <div className='w-12 h-12 rounded-lg bg-[#56dbfc]/10 border border-[#56dbfc]/20 flex items-center justify-center text-[#56dbfc]'>
                                    <FiPhone className='w-6 h-6' />
                                </div>
                                <h3 className='text-base font-bold text-white tracking-tight'>Phone Support</h3>
                                <p className='text-sm font-bold text-[#56dbfc] tracking-tight'>
                                    +91-9131755102
                                </p>
                                <p className='text-xs text-slate-300 leading-relaxed'>
                                    Direct line for order tracking, payment confirmation, and general assistance.
                                </p>
                            </div>
                            <div className='pt-2 border-t border-white/10 text-[11px] text-slate-400'>
                                Toll-Free / 24/7 Helpline
                            </div>
                        </div>

                        {/* Card 3: Email Inquiry */}
                        <div className='bg-[#0e2328] border border-white/15 rounded-xl p-6 sm:p-7 shadow-xl space-y-4 flex flex-col justify-between hover:border-[#56dbfc]/40 transition-all'>
                            <div className='space-y-3'>
                                <div className='w-12 h-12 rounded-lg bg-[#56dbfc]/10 border border-[#56dbfc]/20 flex items-center justify-center text-[#56dbfc]'>
                                    <FiMail className='w-6 h-6' />
                                </div>
                                <h3 className='text-base font-bold text-white tracking-tight'>Email Inquiry</h3>
                                <p className='text-xs sm:text-sm font-bold text-[#56dbfc] truncate'>
                                    vdevwork1906@gmail.com
                                </p>
                                <p className='text-xs text-slate-300 leading-relaxed'>
                                    Send us your feedback, commercial queries, or return requests.
                                </p>
                            </div>
                            <div className='pt-2 border-t border-white/10 text-[11px] text-slate-400'>
                                Average response time: 2 hours
                            </div>
                        </div>

                        {/* Card 4: Careers at V-Cart (Spans full width of 2-col grid) */}
                        <div className='md:col-span-2 bg-[#0e2328] border border-white/15 rounded-xl p-6 sm:p-8 shadow-xl space-y-4 hover:border-[#56dbfc]/40 transition-all'>
                            <div className='flex items-center gap-3'>
                                <div className='w-12 h-12 rounded-lg bg-[#56dbfc]/10 border border-[#56dbfc]/20 flex items-center justify-center text-[#56dbfc] flex-shrink-0'>
                                    <FiBriefcase className='w-6 h-6' />
                                </div>
                                <div>
                                    <h3 className='text-base font-bold text-white tracking-tight'>Careers at V-Cart</h3>
                                    <p className='text-xs text-slate-400'>Build the future of digital retail with us</p>
                                </div>
                            </div>
                            <p className='text-xs sm:text-sm text-slate-300 leading-relaxed'>
                                We are always looking for passionate engineers, designers, and e-commerce strategists to join our team. Explore open roles and build modern shopping experiences.
                            </p>
                            <div className='pt-2'>
                                <button 
                                    className='px-6 py-3 bg-[#56dbfc] text-slate-950 text-xs font-bold rounded-lg hover:bg-[#7ce2fc] active:scale-95 transition-all shadow-[0_0_15px_rgba(86,219,252,0.3)] inline-flex items-center justify-center'
                                    style={{ padding: '12px 24px', borderRadius: '8px' }}
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


