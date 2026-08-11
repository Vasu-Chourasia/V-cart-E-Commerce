import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'

// single product card — responsive glassmorphic card
function Card({ id, image, name, price }) {
    const { currency } = useContext(shopDataContext)
    const navigate = useNavigate()

    return (
        <div
            className='group w-full cursor-pointer flex flex-col bg-[#13282e]/60 backdrop-blur-md border border-white/10 hover:border-[#56dbfc]/40 rounded-xl p-3 shadow-sm hover:shadow-[0_8px_20px_rgba(86,219,252,0.15)] hover:-translate-y-1.5 transition-all duration-300'
            onClick={() => navigate(`/productdetail/${id}`)}
        >
            {/* thumbnail container */}
            <div className='w-full aspect-[4/5] overflow-hidden rounded-lg bg-[#1a353c] relative mb-3'>
                <img
                    src={image}
                    alt={name}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    loading="lazy"
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </div>

            {/* info */}
            <div className='flex flex-col justify-between flex-1 gap-1 px-1'>
                <p className='text-slate-100 text-sm font-medium tracking-tight truncate group-hover:text-[#56dbfc] transition-colors'>
                    {name}
                </p>
                <div className='flex items-center justify-between mt-1'>
                    <p className='text-[#56dbfc] text-sm font-bold tracking-tight'>
                        {currency} {price}
                    </p>
                    <span className='text-[11px] text-slate-400 font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#56dbfc]/10 group-hover:text-[#56dbfc] transition-all'>
                        View
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Card

