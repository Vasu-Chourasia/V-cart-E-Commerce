import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { authDataContext } from '../context/authContext'
import { shopDataContext } from '../context/ShopContext'
import Title from '../component/Title'

function Order() {
    const { serverUrl } = useContext(authDataContext)
    const { currency } = useContext(shopDataContext)
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const result = await axios.post(
                serverUrl + "/api/order/userorder",
                {},
                { withCredentials: true }
            )
            // show newest orders first
            setOrders(result.data.reverse())
        } catch (error) {
            console.log("fetchOrders error", error)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-[#141414] via-[#0c2025] to-[#0c2025] pt-24 pb-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
                
                <div className='border-b border-white/10 pb-4'>
                    <Title text1={'MY'} text2={'ORDERS'} subtext={'Track order status and history'} />
                </div>

                <div className='space-y-4'>
                    {orders.length === 0 && (
                        <div className='w-full py-20 flex flex-col items-center justify-center text-center bg-[#12282e]/40 border border-white/10 rounded-2xl p-8 space-y-3'>
                            <p className='text-lg font-semibold text-slate-200'>No orders placed yet</p>
                            <p className='text-xs text-slate-400'>Your purchase history will appear here once you place an order.</p>
                        </div>
                    )}

                    {orders.map((order, index) => (
                        <div 
                            key={index} 
                            className='bg-[#12282e]/60 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-2xl p-6 shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6'
                        >
                            {/* items list & details */}
                            <div className='space-y-3 flex-1'>
                                <div className='flex items-center gap-2'>
                                    <span className='px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#56dbfc] bg-[#56dbfc]/10 rounded-md border border-[#56dbfc]/20'>
                                        Order #{index + 1}
                                    </span>
                                    <span className='text-xs text-slate-400'>
                                        {new Date(order.date).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className='space-y-1'>
                                    {order.items.map((item, i) => (
                                        <p key={i} className='text-white text-sm font-medium'>
                                            {item.name} × {item.quantity}
                                            <span className='text-slate-400 text-xs font-normal ml-1.5'>({item.size})</span>
                                        </p>
                                    ))}
                                </div>

                                <div className='text-xs text-slate-400 leading-relaxed pt-1'>
                                    <p className='text-slate-300 font-medium'>
                                        Deliver to: {order.address.firstName} {order.address.lastName} ({order.address.phone})
                                    </p>
                                    <p>{order.address.street}, {order.address.city}, {order.address.state} - {order.address.pinCode}</p>
                                </div>
                            </div>

                            {/* order meta & total */}
                            <div className='flex flex-row lg:flex-col justify-between items-start lg:items-end gap-2 border-t lg:border-t-0 border-white/10 pt-3 lg:pt-0'>
                                <div className='text-left lg:text-right'>
                                    <span className='text-xs text-slate-400 block'>Payment: {order.paymentMethod}</span>
                                    <span className='text-xl font-extrabold text-[#56dbfc]'>{currency} {order.amount}</span>
                                </div>

                                {/* status + track button */}
                                <div className='flex flex-col items-end gap-2'>
                                    <div className='inline-flex items-center gap-2 px-3 py-1 bg-emerald-400/10 border border-emerald-400/20 rounded-full text-xs font-semibold text-emerald-400'>
                                        <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
                                        {order.status}
                                    </div>
                                    <button
                                        onClick={fetchOrders}
                                        className='px-4 py-1.5 border border-white/15 text-white text-xs font-medium rounded-xl hover:bg-white/10 transition-all'
                                    >
                                        Track Order
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Order

