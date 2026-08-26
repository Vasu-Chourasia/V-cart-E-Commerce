import React from 'react'
import { MdOutlineSwapHoriz, MdOutlineAssignmentReturn, MdSupportAgent } from "react-icons/md"

// static section showing store policies — glassmorphic cards
function OurPolicy() {
    const policies = [
        {
            icon: <MdOutlineSwapHoriz className='w-8 h-8 text-navy' />,
            title: "Easy exchange",
            desc: "Hassle-free 7-day item exchange policy"
        },
        {
            icon: <MdOutlineAssignmentReturn className='w-8 h-8 text-navy' />,
            title: "7 day returns",
            desc: "Free and effortless returns guarantee"
        },
        {
            icon: <MdSupportAgent className='w-8 h-8 text-navy' />,
            title: "24/7 support",
            desc: "Dedicated customer support anytime"
        },
    ]

    return (
        <section className='w-full bg-white py-16 md:py-20 px-4 md:px-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
                    {policies.map((policy) => (
                        <div 
                            key={policy.title} 
                            className='flex flex-col items-center text-center gap-4 p-8 bg-white border border-gray-200 rounded-2xl hover:border-teal transition-all duration-300 shadow-sm group'
                            style={{ padding: '32px' }}
                        >
                            <div className='w-16 h-16 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center text-navy'>
                                {policy.icon}
                            </div>
                            <h3 className='text-charcoal font-bold text-lg tracking-tight'>{policy.title}</h3>
                            <p className='text-gray-600 text-sm leading-relaxed max-w-xs'>{policy.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default OurPolicy
