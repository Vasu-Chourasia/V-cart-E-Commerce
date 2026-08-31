import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import { userDataContext } from '../context/UserContext'
import Loading from '../component/Loading'
import Nav from '../component/Nav'
import Footer from '../component/Footer'
import razorpayImg from '../assets/Razorpay.jpg'

function PlaceOrder() {
    const { cartItem, setCartItem, getCartAmount, delivery_fee, products, currency } = useContext(shopDataContext)
    const { serverUrl } = useContext(authDataContext)
    const { userData } = useContext(userDataContext)
    const navigate = useNavigate()
    const [method, setMethod] = useState('cod')
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: 'United States',
        phone: ''
    })

    useEffect(() => {
        if (userData && userData.email) {
            setFormData(prev => ({ ...prev, email: userData.email }))
        }
    }, [userData])

    const onChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

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

        if (orderItems.length === 0) {
            toast.error("Your cart is empty")
            setLoading(false)
            return
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
            } else if (method === 'stripe') {
                toast.info("Stripe payment gateway integration coming soon!")
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to place order")
        } finally {
            setLoading(false)
        }
    }

    const subtotal = getCartAmount()
    const total = subtotal === 0 ? 0 : subtotal + delivery_fee

    return (
        <div className="bg-surface-container-lowest min-h-screen flex flex-col justify-between antialiased text-on-surface">

            <main className="flex-grow pt-xl pb-xl px-gutter md:px-lg max-w-container-max mx-auto w-full">
                <div className="mb-xl text-center md:text-left">
                    <h1 className="text-display-lg-mobile md:text-display-lg font-bold text-primary">
                        Secure Checkout
                    </h1>
                    <p className="text-body-md text-on-surface-variant mt-xs">
                        Complete your order details below.
                    </p>
                </div>

                <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
                    
                    {/* Left Column: Delivery Address Form */}
                    <div className="lg:col-span-7 space-y-lg">
                        <section className="bg-surface-container-lowest p-lg border border-outline-variant/30 rounded-xl shadow-sm">
                            <h2 className="text-headline-md font-bold text-primary mb-md flex items-center gap-sm">
                                <span className="material-symbols-outlined text-secondary">local_shipping</span>
                                Delivery Address
                            </h2>

                            <div className="space-y-md">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                                    <div>
                                        <label className="block text-label-caps text-on-surface-variant mb-xs" htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            placeholder="Jane"
                                            required
                                            value={formData.firstName}
                                            onChange={onChange}
                                            className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-body-md text-on-surface"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-label-caps text-on-surface-variant mb-xs" htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            placeholder="Doe"
                                            required
                                            value={formData.lastName}
                                            onChange={onChange}
                                            className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-body-md text-on-surface"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-label-caps text-on-surface-variant mb-xs" htmlFor="email">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="jane@example.com"
                                        required
                                        value={formData.email}
                                        onChange={onChange}
                                        className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-body-md text-on-surface"
                                    />
                                </div>

                                <div>
                                    <label className="block text-label-caps text-on-surface-variant mb-xs" htmlFor="street">
                                        Street Address
                                    </label>
                                    <input
                                        id="street"
                                        name="street"
                                        type="text"
                                        placeholder="123 Luxury Ave, Suite 400"
                                        required
                                        value={formData.street}
                                        onChange={onChange}
                                        className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-body-md text-on-surface"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                                    <div>
                                        <label className="block text-label-caps text-on-surface-variant mb-xs" htmlFor="city">
                                            City
                                        </label>
                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            placeholder="New York"
                                            required
                                            value={formData.city}
                                            onChange={onChange}
                                            className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-body-md text-on-surface"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-label-caps text-on-surface-variant mb-xs" htmlFor="state">
                                            State / Province
                                        </label>
                                        <input
                                            id="state"
                                            name="state"
                                            type="text"
                                            placeholder="NY"
                                            required
                                            value={formData.state}
                                            onChange={onChange}
                                            className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-body-md text-on-surface"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-label-caps text-on-surface-variant mb-xs" htmlFor="pinCode">
                                            Zip Code
                                        </label>
                                        <input
                                            id="pinCode"
                                            name="pinCode"
                                            type="text"
                                            placeholder="10001"
                                            required
                                            value={formData.pinCode}
                                            onChange={onChange}
                                            className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-body-md text-on-surface"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                                    <div>
                                        <label className="block text-label-caps text-on-surface-variant mb-xs" htmlFor="country">
                                            Country
                                        </label>
                                        <input
                                            id="country"
                                            name="country"
                                            type="text"
                                            placeholder="United States"
                                            required
                                            value={formData.country}
                                            onChange={onChange}
                                            className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-body-md text-on-surface"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-label-caps text-on-surface-variant mb-xs" htmlFor="phone">
                                            Phone Number
                                        </label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            required
                                            value={formData.phone}
                                            onChange={onChange}
                                            className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-body-md text-on-surface"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Order Summary & Payment */}
                    <div className="lg:col-span-5 space-y-lg">
                        
                        {/* Summary & Payment Card */}
                        <section className="bg-surface-container-lowest p-lg border border-outline-variant/30 rounded-xl shadow-sm space-y-lg sticky top-28">
                            <div>
                                <h2 className="text-headline-md font-bold text-primary mb-md pb-xs border-b border-outline-variant/30">
                                    Payment Method
                                </h2>
                                <div className="space-y-sm mb-lg">
                                    
                                    {/* Stripe Option */}
                                    <label
                                        onClick={() => setMethod('stripe')}
                                        className={`flex items-center justify-between p-md border rounded-xl cursor-pointer transition-all ${
                                            method === 'stripe'
                                                ? 'border-2 border-primary bg-primary-container/10 font-bold shadow-xs'
                                                : 'border-outline-variant/60 hover:bg-surface-container-low'
                                        }`}
                                    >
                                        <div className="flex items-center gap-md">
                                            <input
                                                type="radio"
                                                name="payment"
                                                checked={method === 'stripe'}
                                                onChange={() => setMethod('stripe')}
                                                className="accent-primary"
                                            />
                                            <span className="text-body-md text-on-surface">Credit / Debit Card (Stripe)</span>
                                        </div>
                                        <span className="material-symbols-outlined text-outline">credit_card</span>
                                    </label>

                                    {/* Razorpay Option */}
                                    <label
                                        onClick={() => setMethod('razorpay')}
                                        className={`flex items-center justify-between p-md border rounded-xl cursor-pointer transition-all ${
                                            method === 'razorpay'
                                                ? 'border-2 border-primary bg-primary-container/10 font-bold shadow-xs'
                                                : 'border-outline-variant/60 hover:bg-surface-container-low'
                                        }`}
                                    >
                                        <div className="flex items-center gap-md">
                                            <input
                                                type="radio"
                                                name="payment"
                                                checked={method === 'razorpay'}
                                                onChange={() => setMethod('razorpay')}
                                                className="accent-primary"
                                            />
                                            <span className="text-body-md text-on-surface">Razorpay Payment</span>
                                        </div>
                                        <img src={razorpayImg} alt="Razorpay" className="h-6 object-contain rounded" />
                                    </label>

                                    {/* COD Option */}
                                    <label
                                        onClick={() => setMethod('cod')}
                                        className={`flex items-center justify-between p-md border rounded-xl cursor-pointer transition-all ${
                                            method === 'cod'
                                                ? 'border-2 border-primary bg-primary-container/10 font-bold shadow-xs'
                                                : 'border-outline-variant/60 hover:bg-surface-container-low'
                                        }`}
                                    >
                                        <div className="flex items-center gap-md">
                                            <input
                                                type="radio"
                                                name="payment"
                                                checked={method === 'cod'}
                                                onChange={() => setMethod('cod')}
                                                className="accent-primary"
                                            />
                                            <span className="text-body-md text-on-surface">Cash on Delivery</span>
                                        </div>
                                        <span className="material-symbols-outlined text-outline">local_atm</span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || total === 0}
                                    className="w-full bg-primary hover:bg-primary/90 text-on-primary py-md rounded font-label-caps uppercase transition-colors shadow-md flex justify-center items-center gap-sm cursor-pointer disabled:opacity-50 font-bold"
                                >
                                    {loading ? <Loading /> : (
                                        <>
                                            <span className="material-symbols-outlined text-sm">lock</span>
                                            Place Order • {currency} {total}
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="pt-md border-t border-outline-variant/30 flex justify-center items-center gap-lg">
                                <div className="flex flex-col items-center text-secondary">
                                    <span className="material-symbols-outlined text-2xl">verified_user</span>
                                    <span className="text-label-caps text-xs mt-xs font-semibold">Secure SSL</span>
                                </div>
                                <div className="flex flex-col items-center text-primary-container">
                                    <span className="material-symbols-outlined text-2xl">gpp_good</span>
                                    <span className="text-label-caps text-xs mt-xs font-semibold">Buyer Protection</span>
                                </div>
                            </div>
                        </section>

                    </div>

                </form>
            </main>

            <Footer />
        </div>
    )
}

export default PlaceOrder
