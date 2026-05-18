import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'

// single product card — used in grids across the app
function Card({ id, image, name, price }) {
    const { currency } = useContext(shopDataContext)
    const navigate = useNavigate()

    return (
        <div
            className='w-[160px] md:w-[200px] lg:w-[220px] cursor-pointer flex flex-col gap-[8px]'
            onClick={() => navigate(`/productdetail/${id}`)}
        >
            <div className='w-[100%] h-[200px] md:h-[250px] overflow-hidden rounded-lg bg-slate-700'>
                <img
                    src={image}
                    alt={name}
                    className='w-[100%] h-[100%] object-cover hover:scale-105 transition-transform duration-300'
                />
            </div>
            <p className='text-white text-[14px] font-semibold truncate'>{name}</p>
            <p className='text-[#56dbfc] text-[14px] font-bold'>{currency} {price}</p>
        </div>
    )
}

export default Card
