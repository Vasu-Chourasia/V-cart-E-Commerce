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
        <section className='w-full bg-[#0a1520] py-12 px-4 md:py-24 md:px-6'>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {policies.map((policy) => (
                        <div 
                            key={policy.title} 
                            className='flex flex-col items-center text-center gap-4 p-8 bg-[#0f1e2c]/90 backdrop-blur-md border border-white/10 rounded-2xl hover:border-[#56dbfc]/40 hover:-translate-y-1 transition-all duration-300 shadow-xl group'
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
