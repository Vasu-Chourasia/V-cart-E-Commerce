import React from 'react'
import { MdOutlineSwapHoriz, MdOutlineAssignmentReturn, MdSupportAgent } from "react-icons/md"

// static section showing store policies
function OurPolicy() {
    const policies = [
        {
            icon: <MdOutlineSwapHoriz className='w-[40px] h-[40px] text-[#56dbfc]' />,
            title: "Easy Exchange",
            desc: "We offer a hassle-free exchange policy"
        },
        {
            icon: <MdOutlineAssignmentReturn className='w-[40px] h-[40px] text-[#56dbfc]' />,
            title: "7 Day Returns",
            desc: "We provide 7 days free return policy"
        },
        {
            icon: <MdSupportAgent className='w-[40px] h-[40px] text-[#56dbfc]' />,
            title: "Customer Support",
            desc: "We provide 24/7 customer support"
        },
    ]

    return (
        <div className='w-[100%] flex items-center justify-center gap-[20px] flex-col md:flex-row py-[40px]'>
            {policies.map((policy) => (
                <div key={policy.title} className='flex flex-col items-center gap-[10px] text-center px-[20px]'>
                    {policy.icon}
                    <p className='text-white font-semibold text-[16px]'>{policy.title}</p>
                    <p className='text-slate-300 text-[14px]'>{policy.desc}</p>
                </div>
            ))}
        </div>
    )
}

export default OurPolicy
