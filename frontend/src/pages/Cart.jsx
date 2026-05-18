import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'

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
        <div className='w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[100px] pb-[100px] md:pb-[40px] px-[20px] md:px-[50px]'>
            <Title text1={'YOUR'} text2={'CART'} />

            <div className='flex flex-col lg:flex-row gap-[50px] mt-[30px]'>

                {/* cart items list */}
                <div className='flex-1 flex flex-col gap-[20px]'>
                    {cartEntries.length === 0 && (
                        <p className='text-slate-400 text-[16px] mt-[20px]'>Your cart is empty</p>
                    )}

                    {cartEntries.map(({ product, size, quantity }) => (
                        <div key={`${product._id}-${size}`}
                            className='flex items-center gap-[15px] bg-[#1e3a40] p-[15px] rounded-lg'>

                            {/* product image */}
                            <img src={product.image1} alt={product.name}
                                className='w-[80px] h-[80px] object-cover rounded-md' />

                            {/* product info */}
                            <div className='flex-1'>
                                <p className='text-white font-semibold text-[15px]'>{product.name}</p>
                                <p className='text-slate-300 text-[13px]'>Size: {size}</p>
                                <p className='text-[#56dbfc] font-semibold'>{currency} {product.price}</p>
                            </div>

                            {/* quantity control */}
                            <input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) => updateQuantity(product._id, size, Number(e.target.value))}
                                className='w-[60px] h-[40px] bg-slate-700 text-white text-center rounded-md border border-slate-500'
                            />

                            {/* remove button — sets quantity to 0 */}
                            <button
                                onClick={() => updateQuantity(product._id, size, 0)}
                                className='text-red-400 hover:text-red-300 text-[13px] font-semibold ml-[5px]'
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* cart summary */}
                <div className='lg:w-[350px] flex flex-col gap-[20px]'>
                    <CartTotal />
                    {cartEntries.length > 0 && (
                        <button
                            onClick={() => navigate("/placeorder")}
                            className='w-[100%] h-[50px] bg-[#6060f5] text-white rounded-lg text-[16px] font-semibold hover:bg-[#4a4ad4]'
                        >
                            Proceed to Checkout
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cart
