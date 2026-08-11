import React from 'react'
import Title from '../component/Title'
import NewLetterBox from '../component/NewLetterBox'
import contact from '../assets/contact.jpg'

function Contact() {
    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-[#141414] via-[#0c2025] to-[#0c2025] pt-24 pb-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16'>
                
                <div className='border-b border-white/10 pb-4'>
                    <Title text1={'CONTACT'} text2={'US'} subtext={'Get in touch with our team for inquiries and support'} />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-center'>
                    <div className='lg:col-span-5 flex justify-center'>
                        <div className='relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group max-w-md w-full'>
                            <img src={contact} alt="Contact V-Cart" className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
                        </div>
                    </div>

                    <div className='lg:col-span-7 bg-[#12282e]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 text-slate-300 text-sm'>
                        <span className='px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#56dbfc] bg-[#56dbfc]/10 border border-[#56dbfc]/20 rounded-full inline-block'>
                            Store Information
                        </span>

                        <div className='space-y-2'>
                            <h4 className='text-white font-bold text-lg'>V-Cart Headquarters</h4>
                            <p className='text-slate-400 leading-relaxed'>12345 Station Road, Commerce Tech Park<br />Random City, State, India - 400001</p>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-white/10 py-4'>
                            <div>
                                <span className='text-xs text-slate-400 block font-medium uppercase tracking-wider'>Phone Support</span>
                                <span className='text-white font-bold text-sm'>+91-9131755102</span>
                            </div>
                            <div>
                                <span className='text-xs text-slate-400 block font-medium uppercase tracking-wider'>Email Inquiry</span>
                                <span className='text-[#56dbfc] font-bold text-sm'>vdevwork1906@gmail.com</span>
                            </div>
                        </div>

                        <div className='space-y-3 pt-2'>
                            <h4 className='text-white font-bold text-base'>Careers at V-Cart</h4>
                            <p className='text-xs text-slate-400'>
                                Interested in joining our team? Learn more about our engineering culture, design philosophy, and current open roles.
                            </p>
                            <button className='px-6 py-2.5 bg-white/10 border border-white/15 text-white text-xs font-bold rounded-xl hover:bg-[#56dbfc] hover:text-slate-950 transition-all'>
                                Explore Jobs & Careers
                            </button>
                        </div>
                    </div>
                </div>

                <NewLetterBox />

            </div>
        </div>
    )
}

export default Contact

