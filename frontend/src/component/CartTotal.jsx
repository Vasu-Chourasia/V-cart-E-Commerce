import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

function CartTotal() {
    const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext)
    const navigate = useNavigate()
    const subtotal = getCartAmount()
    const total = subtotal === 0 ? 0 : subtotal + delivery_fee

    return (
        <aside className="md:col-span-4 mt-xl md:mt-0">
            <div className="bg-surface-bright rounded-xl border border-outline-variant/30 p-lg shadow-sm sticky top-28">
                <h2 className="text-headline-md font-bold mb-lg border-b border-outline-variant/30 pb-sm text-on-surface">
                    Order Summary
                </h2>

                <div className="space-y-sm text-body-md mb-lg">
                    <div className="flex justify-between">
                        <span className="text-on-surface-variant">Subtotal</span>
                        <span className="font-semibold text-on-surface">{currency} {subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-on-surface-variant">Delivery Fee</span>
                        <span className="font-semibold text-on-surface">{currency} {subtotal === 0 ? 0 : delivery_fee}</span>
                    </div>
                </div>

                <div className="border-t border-outline-variant/30 pt-md mb-lg">
                    <div className="flex justify-between items-center">
                        <span className="text-body-lg font-bold text-on-surface">Total</span>
                        <span className="text-headline-md font-bold text-primary">{currency} {total}</span>
                    </div>
                </div>

                <button
                    disabled={subtotal === 0}
                    onClick={() => navigate('/placeorder')}
                    className="w-full bg-primary hover:bg-primary/90 text-on-primary py-md rounded font-label-caps uppercase transition-colors shadow-md flex items-center justify-center gap-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Proceed to Checkout
                    <span className="material-symbols-outlined text-sm">lock</span>
                </button>

                <div className="mt-md text-center">
                    <span className="text-secondary text-label-caps flex items-center justify-center gap-xs">
                        <span className="material-symbols-outlined text-sm">verified_user</span>
                        Secure Bank-Grade Checkout
                    </span>
                </div>
            </div>
        </aside>
    )
}

export default CartTotal
