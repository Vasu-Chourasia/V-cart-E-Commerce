import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'

// displays subtotal, delivery fee, and grand total
function CartTotal() {
    const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext)
    const subtotal = getCartAmount()

    return (
        <div className='w-full space-y-4 text-slate-200'>
            <h3 className='text-xl font-bold text-white tracking-tight border-b border-white/10 pb-3 flex items-center justify-between'>
                <span>Cart Summary</span>
                <span className='text-xs font-normal text-slate-400'>Standard Shipping</span>
            </h3>

            <div className='space-y-3 text-sm'>
                <div className='flex justify-between items-center'>
                    <span className='text-slate-400'>Subtotal</span>
                    <span className='font-semibold text-white'>{currency} {subtotal}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='text-slate-400'>Shipping Fee</span>
                    <span className='font-semibold text-white'>{currency} {subtotal === 0 ? 0 : delivery_fee}</span>
                </div>
                <div className='border-t border-white/10 pt-3 flex justify-between items-center text-base font-bold text-white'>
                    <span>Total Amount</span>
                    <span className='text-[#56dbfc] text-xl font-extrabold'>{currency} {subtotal === 0 ? 0 : subtotal + delivery_fee}</span>
                </div>
            </div>
        </div>
    )
}

export default CartTotal

