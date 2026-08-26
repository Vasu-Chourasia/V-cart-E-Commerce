import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'

// displays subtotal, delivery fee, and grand total
function CartTotal() {
    const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext)
    const subtotal = getCartAmount()

    return (
        <div className='w-full space-y-4 text-charcoal'>
            <h3 className='text-xl font-bold text-charcoal tracking-tight border-b border-gray-200 pb-3 flex items-center justify-between'>
                <span>Cart Summary</span>
                <span className='text-xs font-normal text-gray-500'>Standard Shipping</span>
            </h3>

            <div className='space-y-3 text-sm'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Subtotal</span>
                    <span className='font-semibold text-charcoal'>{currency} {subtotal}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Shipping Fee</span>
                    <span className='font-semibold text-charcoal'>{currency} {subtotal === 0 ? 0 : delivery_fee}</span>
                </div>
                <div className='border-t border-gray-200 pt-3 flex justify-between items-center text-base font-bold text-charcoal'>
                    <span>Total Amount</span>
                    <span className='text-navy text-xl font-extrabold'>{currency} {subtotal === 0 ? 0 : subtotal + delivery_fee}</span>
                </div>
            </div>
        </div>
    )
}

export default CartTotal

