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

    return (
        <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-center justify-center gap-[50px] pt-[90px] pb-[100px] md:pb-[40px] px-[20px]'>

            {/* delivery form */}
            <div className='lg:w-[45%] w-[100%]'>
                <form onSubmit={onSubmit} className='flex flex-col gap-[15px]'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />

                    <div className='flex gap-[10px]'>
                        <input type="text" name='firstName' placeholder='First name' required
                            className='w-[50%] h-[50px] bg-slate-700 rounded-lg px-[15px] text-white placeholder:text-slate-400'
                            value={formData.firstName} onChange={onChange} />
                        <input type="text" name='lastName' placeholder='Last name' required
                            className='w-[50%] h-[50px] bg-slate-700 rounded-lg px-[15px] text-white placeholder:text-slate-400'
                            value={formData.lastName} onChange={onChange} />
                    </div>
                    <input type="email" name='email' placeholder='Email address' required
                        className='w-[100%] h-[50px] bg-slate-700 rounded-lg px-[15px] text-white placeholder:text-slate-400'
                        value={formData.email} onChange={onChange} />
                    <input type="text" name='street' placeholder='Street' required
                        className='w-[100%] h-[50px] bg-slate-700 rounded-lg px-[15px] text-white placeholder:text-slate-400'
                        value={formData.street} onChange={onChange} />
                    <div className='flex gap-[10px]'>
                        <input type="text" name='city' placeholder='City' required
                            className='w-[50%] h-[50px] bg-slate-700 rounded-lg px-[15px] text-white placeholder:text-slate-400'
                            value={formData.city} onChange={onChange} />
                        <input type="text" name='state' placeholder='State' required
                            className='w-[50%] h-[50px] bg-slate-700 rounded-lg px-[15px] text-white placeholder:text-slate-400'
                            value={formData.state} onChange={onChange} />
                    </div>
                    <div className='flex gap-[10px]'>
                        <input type="text" name='pinCode' placeholder='Pincode' required
                            className='w-[50%] h-[50px] bg-slate-700 rounded-lg px-[15px] text-white placeholder:text-slate-400'
                            value={formData.pinCode} onChange={onChange} />
                        <input type="text" name='country' placeholder='Country' required
                            className='w-[50%] h-[50px] bg-slate-700 rounded-lg px-[15px] text-white placeholder:text-slate-400'
                            value={formData.country} onChange={onChange} />
                    </div>
                    <input type="text" name='phone' placeholder='Phone number' required
                        className='w-[100%] h-[50px] bg-slate-700 rounded-lg px-[15px] text-white placeholder:text-slate-400'
                        value={formData.phone} onChange={onChange} />

                    {/* payment method */}
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    <div className='flex gap-[20px] flex-wrap'>
                        <button type='button' onClick={() => setMethod('razorpay')}
                            className={`w-[150px] h-[50px] rounded-md overflow-hidden border-[3px] ${method === 'razorpay' ? 'border-blue-500' : 'border-transparent'}`}>
                            <img src={razorpayImg} className='w-full h-full object-cover' alt="Razorpay" />
                        </button>
                        <button type='button' onClick={() => setMethod('cod')}
                            className={`w-[180px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-white text-[13px] px-[15px] rounded-md text-[#332f6f] font-bold border-[3px] ${method === 'cod' ? 'border-blue-500' : 'border-transparent'}`}>
                            CASH ON DELIVERY
                        </button>
                    </div>

                    <button type='submit'
                        className='w-[180px] h-[50px] bg-[#6060f5] text-white rounded-lg text-[16px] font-semibold flex items-center justify-center mt-[10px] hover:bg-[#4a4ad4]'>
                        {loading ? <Loading /> : "PLACE ORDER"}
                    </button>
                </form>
            </div>

            {/* order summary */}
            <div className='lg:w-[35%] w-[100%]'>
                <CartTotal />
            </div>
        </div>
    )
}

export default PlaceOrder
