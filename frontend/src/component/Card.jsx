import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'

// single product card — responsive glassmorphic card
function Card({ id, image, name, price }) {
    const { currency } = useContext(shopDataContext)
    const navigate = useNavigate()

    return (
        <div
            className='group w-full cursor-pointer flex flex-col bg-white border border-gray-200 hover:border-teal rounded-xl p-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300'
            onClick={() => navigate(`/productdetail/${id}`)}
        >
            {/* thumbnail container */}
            <div className='w-full aspect-[4/5] overflow-hidden rounded-lg bg-gray-surface relative mb-3 border border-gray-100'>
                <img
                    src={image}
                    alt={name}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    loading="lazy"
                />
            </div>

            {/* info */}
            <div className='flex flex-col justify-between flex-1 gap-1 px-1'>
                <p className='text-charcoal text-sm font-medium tracking-tight truncate group-hover:text-teal transition-colors'>
                    {name}
                </p>
                <div className='flex items-center justify-between mt-1'>
                    <p className='text-navy text-sm font-bold tracking-tight'>
                        {currency} {price}
                    </p>
                    <span className='text-[11px] text-gray-500 font-medium px-2.5 py-0.5 rounded-full bg-gray-surface border border-gray-200 group-hover:bg-teal group-hover:text-white group-hover:border-teal transition-all'>
                        View
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Card

