import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import Loading from '../component/Loading'
import razorpayImg from '../assets/Razorpay.jpg'

function PlaceOrder() {
    const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext)
    const { serverUrl } = useContext(authDataContext)
    const navigate = useNavigate()
    const [method, setMethod] = useState('cod')
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '',
        street: '', city: '', state: '',
        pinCode: '', country: '', phone: ''
    })

    const onChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // open Razorpay checkout modal
    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'V-Cart',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(
                        serverUrl + '/api/order/verifyrazorpay',
                        response,
                        { withCredentials: true }
                    )
                    if (data) {
                        setCartItem({})
                        navigate("/order")
                    }
                } catch (error) {
                    console.log(error)
                    toast.error("Payment verification failed")
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // build order items array from cart
        const orderItems = []
        for (const itemId in cartItem) {
            for (const size in cartItem[itemId]) {
                if (cartItem[itemId][size] > 0) {
                    const product = structuredClone(products.find(p => p._id === itemId))
                    if (product) {
                        product.size = size
                        product.quantity = cartItem[itemId][size]
                        orderItems.push(product)
                    }
                }
            }
        }

        const orderData = {
            address: formData,
            items: orderItems,
            amount: getCartAmount() + delivery_fee,
        }

        try {
            if (method === 'cod') {
                await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
                setCartItem({})
                toast.success("Order placed successfully")
                navigate("/order")

            } else if (method === 'razorpay') {
                const result = await axios.post(serverUrl + "/api/order/razorpay", orderData, { withCredentials: true })
                if (result.data) {
                    initPay(result.data)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to place order")
        } finally {
            setLoading(false)
        }
    }

    const inputClasses = "w-full h-11 bg-[#0c2025] border border-white/15 rounded-xl px-4 text-white text-sm focus:outline-none focus:border-[#56dbfc] transition-all placeholder:text-slate-500 font-normal"

    return (
        <div className='w-full min-h-screen bg-[#0a1520] pt-24 pb-32 py-12 px-4 md:py-24 md:px-6'>
            <div className='max-w-7xl mx-auto space-y-16 md:space-y-24'>

                
                <div className='border-b border-white/10 pb-4'>
                    <Title text1={'CHECKOUT'} text2={'PROCESS'} subtext={'Complete your shipping details and choose payment method'} />
                </div>

                <form onSubmit={onSubmit} className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>

                    {/* delivery form (7 cols) */}
                    <div className='lg:col-span-7 bg-[#12282e]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5'>
                        <h3 className='text-lg font-bold text-white tracking-tight border-b border-white/10 pb-3'>
                            Delivery Address
                        </h3>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <input type="text" name='firstName' placeholder='First name' required
                                className={inputClasses} value={formData.firstName} onChange={onChange} />
                            <input type="text" name='lastName' placeholder='Last name' required
                                className={inputClasses} value={formData.lastName} onChange={onChange} />
                        </div>

                        <input type="email" name='email' placeholder='Email address' required
                            className={inputClasses} value={formData.email} onChange={onChange} />

                        <input type="text" name='street' placeholder='Street address' required
                            className={inputClasses} value={formData.street} onChange={onChange} />

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <input type="text" name='city' placeholder='City' required
                                className={inputClasses} value={formData.city} onChange={onChange} />
                            <input type="text" name='state' placeholder='State' required
                                className={inputClasses} value={formData.state} onChange={onChange} />
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <input type="text" name='pinCode' placeholder='Pincode' required
                                className={inputClasses} value={formData.pinCode} onChange={onChange} />
                            <input type="text" name='country' placeholder='Country' required
                                className={inputClasses} value={formData.country} onChange={onChange} />
                        </div>

                        <input type="text" name='phone' placeholder='Phone number' required
                            className={inputClasses} value={formData.phone} onChange={onChange} />

                        {/* payment method */}
                        <div className='space-y-3 border-t border-white/10 pt-5'>
                            <h3 className='text-lg font-bold text-white tracking-tight'>
                                Select Payment Method
                            </h3>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <button
                                    type='button'
                                    onClick={() => setMethod('razorpay')}
                                    className={`h-14 rounded-xl overflow-hidden border-2 flex items-center justify-center p-2 transition-all ${method === 'razorpay' ? 'border-[#56dbfc] bg-[#56dbfc]/10 shadow-[0_0_15px_rgba(86,219,252,0.3)]' : 'border-white/15 bg-[#0c2025] hover:border-white/30'}`}
                                >
                                    <img src={razorpayImg} className='h-8 object-contain rounded' alt="Razorpay" />
                                </button>
                                <button
                                    type='button'
                                    onClick={() => setMethod('cod')}
                                    className={`h-14 rounded-xl border-2 font-bold text-xs tracking-wider uppercase transition-all ${method === 'cod' ? 'border-[#56dbfc] bg-[#56dbfc] text-slate-950 shadow-[0_0_15px_rgba(86,219,252,0.3)]' : 'border-white/15 bg-[#0c2025] text-slate-200 hover:border-white/30'}`}
                                >
                                    Cash On Delivery
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* order summary & submit (5 cols) */}
                    <div className='lg:col-span-5 bg-[#12282e]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 sticky top-24'>
                        <CartTotal />

                        <button 
                            type='submit'
                            className='w-full px-6 py-3 bg-[#56dbfc] text-slate-950 font-bold text-sm rounded-lg hover:bg-[#7be2fc] active:scale-95 transition-all shadow-[0_0_20px_rgba(86,219,252,0.3)] flex items-center justify-center'
                            style={{ padding: '12px 24px', borderRadius: '8px' }}
                        >
                            {loading ? <Loading /> : "Complete Order"}
                        </button>
                    </div>


                </form>

            </div>
        </div>
    )
}

export default PlaceOrder

