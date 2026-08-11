import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import { FiTrash2 } from "react-icons/fi"

function Cart() {
    const { products, cartItem, updateQuantity, currency } = useContext(shopDataContext)
    const navigate = useNavigate()

    // build a flat list of cart entries for rendering
    const cartEntries = []
    for (const itemId in cartItem) {
        for (const size in cartItem[itemId]) {
            if (cartItem[itemId][size] > 0) {
                const product = products.find(p => p._id === itemId)
                if (product) {
                    cartEntries.push({ product, size, quantity: cartItem[itemId][size] })
                }
            }
        }
    }

    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-[#141414] via-[#0c2025] to-[#0c2025] pt-24 pb-32'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
                
                <div className='border-b border-white/10 pb-4'>
                    <Title text1={'YOUR'} text2={'CART'} subtext={'Review item details before proceeding to checkout'} />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>

                    {/* cart items list (8 cols) */}
                    <div className='lg:col-span-8 space-y-4'>
                        {cartEntries.length === 0 && (
                            <div className='w-full py-20 flex flex-col items-center justify-center text-center bg-[#12282e]/40 border border-white/10 rounded-2xl p-8 space-y-4'>
                                <p className='text-lg font-semibold text-slate-200'>Your cart is currently empty</p>
                                <p className='text-xs text-slate-400'>Discover our latest collections and add your favorite items to cart.</p>
                                <button
                                    onClick={() => navigate("/collection")}
                                    className='px-6 py-3 bg-[#56dbfc] text-slate-950 text-xs font-bold rounded-lg hover:bg-[#7be2fc] transition-all'
                                    style={{ padding: '12px 24px', borderRadius: '8px' }}
                                >
                                    Explore Store
                                </button>
                            </div>
                        )}

                        {cartEntries.map(({ product, size, quantity }) => (
                            <div 
                                key={`${product._id}-${size}`}
                                className='flex items-center gap-4 bg-[#12282e]/60 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-2xl p-4 shadow-md transition-all'
                            >
                                {/* product thumbnail */}
                                <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#1a353c] flex-shrink-0 border border-white/10'>
                                    <img src={product.image1} alt={product.name} className='w-full h-full object-cover' />
                                </div>

                                {/* product info */}
                                <div className='flex-1 min-w-0 space-y-1'>
                                    <h4 className='text-white font-semibold text-sm sm:text-base tracking-tight truncate'>
                                        {product.name}
                                    </h4>
                                    <div className='flex items-center gap-2 text-xs text-slate-300'>
                                        <span>Size: <strong className='text-white font-bold px-2 py-0.5 bg-white/10 rounded border border-white/10'>{size}</strong></span>
                                    </div>
                                    <p className='text-[#56dbfc] font-bold text-sm sm:text-base'>
                                        {currency} {product.price}
                                    </p>
                                </div>

                                {/* quantity modifier input */}
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="number"
                                        min={1}
                                        value={quantity}
                                        onChange={(e) => updateQuantity(product._id, size, Number(e.target.value))}
                                        className='w-14 h-10 bg-[#0c2025] text-white text-center text-sm font-semibold rounded-xl border border-white/15 focus:outline-none focus:border-[#56dbfc] transition-all'
                                    />

                                    {/* remove button */}
                                    <button
                                        onClick={() => updateQuantity(product._id, size, 0)}
                                        className='p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all'
                                        title="Remove item"
                                    >
                                        <FiTrash2 className='w-5 h-5' />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* cart summary side box (4 cols) */}
                    <div className='lg:col-span-4 bg-[#12282e]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl space-y-6'>
                        <CartTotal />
                        {cartEntries.length > 0 && (
                            <button
                                onClick={() => navigate("/placeorder")}
                                className='w-full px-6 py-3 bg-[#56dbfc] text-slate-950 text-sm font-bold rounded-lg hover:bg-[#7be2fc] active:scale-95 transition-all shadow-[0_0_20px_rgba(86,219,252,0.3)]'
                                style={{ padding: '12px 24px', borderRadius: '8px' }}
                            >
                                Proceed to Checkout
                            </button>
                        )}
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Cart

