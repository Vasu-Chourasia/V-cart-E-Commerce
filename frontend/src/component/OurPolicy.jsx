import React from 'react'
import { MdOutlineSwapHoriz, MdOutlineAssignmentReturn, MdSupportAgent } from "react-icons/md"

// static section showing store policies — glassmorphic cards
function OurPolicy() {
    const policies = [
        {
            icon: <MdOutlineSwapHoriz className='w-8 h-8 text-[#56dbfc]' />,
            title: "Easy Exchange",
            desc: "Hassle-free 7-day item exchange policy"
        },
        {
            icon: <MdOutlineAssignmentReturn className='w-8 h-8 text-[#56dbfc]' />,
            title: "7 Day Returns",
            desc: "Free & effortless returns guarantee"
        },
        {
            icon: <MdSupportAgent className='w-8 h-8 text-[#56dbfc]' />,
            title: "24/7 Support",
            desc: "Dedicated customer support anytime"
        },
    ]

    return (
        <section className='w-full max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-6 my-12 md:my-20'>
            <div className='w-full'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
                    {policies.map((policy) => (
                        <div 
                            key={policy.title} 
                            className='flex flex-col items-center text-center gap-4 p-8 bg-[#0f1e2c] border border-white/15 rounded-2xl hover:border-[#56dbfc]/40 hover:-translate-y-1 transition-all duration-300 shadow-xl group'
                            style={{ padding: '32px' }}
                        >
                            <div className='w-16 h-16 rounded-2xl bg-[#56dbfc]/10 border border-[#56dbfc]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#56dbfc]/20 transition-all duration-300'>
                                {policy.icon}
                            </div>
                            <h3 className='text-white font-bold text-lg tracking-tight'>{policy.title}</h3>
                            <p className='text-slate-300 text-sm font-normal leading-relaxed max-w-xs'>{policy.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OurPolicy
