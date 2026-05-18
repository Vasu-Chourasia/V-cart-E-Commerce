import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'

// displays subtotal, delivery fee, and grand total
function CartTotal() {
    const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext)
    const subtotal = getCartAmount()

    return (
        <div className='w-[100%] flex flex-col gap-[12px] text-white'>
            <h2 className='text-[22px] font-semibold text-[#56dbfc]'>Cart Total</h2>
            <div className='flex justify-between text-[15px]'>
                <span className='text-slate-300'>Subtotal</span>
                <span>{currency} {subtotal}</span>
            </div>
            <div className='w-[100%] h-[1px] bg-slate-600'></div>
            <div className='flex justify-between text-[15px]'>
                <span className='text-slate-300'>Delivery Fee</span>
                <span>{currency} {subtotal === 0 ? 0 : delivery_fee}</span>
            </div>
            <div className='w-[100%] h-[1px] bg-slate-600'></div>
            <div className='flex justify-between text-[18px] font-semibold'>
                <span>Total</span>
                <span>{currency} {subtotal === 0 ? 0 : subtotal + delivery_fee}</span>
            </div>
        </div>
    )
}

export default CartTotal
