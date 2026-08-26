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

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Order Placed':
                return 'bg-gray-100 text-gray-700 border-gray-300 font-medium'
            case 'Packing':
                return 'bg-navy/10 text-navy border-navy/20 font-medium'
            case 'Shipped':
                return 'bg-teal/15 text-teal border-teal/30 font-semibold'
            case 'Out for Delivery':
                return 'bg-teal text-white border-teal font-bold shadow-sm'
            case 'Delivered':
                return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold'
            default:
                return 'bg-teal/10 text-teal border-teal/20 font-semibold'
        }
    }

    return (
        <div className='w-full min-h-screen bg-white pt-24 pb-32 py-12 px-4 md:py-24 md:px-6 text-charcoal'>
            <div className='max-w-7xl mx-auto space-y-16 md:space-y-24'>

                
                <div className='border-b border-gray-200 pb-4'>
                    <Title text1={'MY'} text2={'ORDERS'} subtext={'Track order status and history'} />
                </div>

                <div className='space-y-4'>
                    {orders.length === 0 && (
                        <div className='w-full py-20 flex flex-col items-center justify-center text-center bg-gray-surface border border-gray-200 rounded-2xl p-8 space-y-3 shadow-sm'>
                            <p className='text-lg font-semibold text-charcoal'>No orders placed yet</p>
                            <p className='text-xs text-gray-500'>Your purchase history will appear here once you place an order.</p>
                        </div>
                    )}

                    {orders.map((order, index) => (
                        <div 
                            key={index} 
                            className='bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-6 shadow-sm transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6'
                        >
                            {/* items list & details */}
                            <div className='space-y-3 flex-1'>
                                <div className='flex items-center gap-2'>
                                    <span className='px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-teal bg-teal/10 rounded-md border border-teal/20'>
                                        Order #{index + 1}
                                    </span>
                                    <span className='text-xs text-gray-500'>
                                        {new Date(order.date).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className='space-y-1'>
                                    {order.items.map((item, i) => (
                                        <p key={i} className='text-charcoal text-sm font-semibold'>
                                            {item.name} × {item.quantity}
                                            <span className='text-gray-500 text-xs font-normal ml-1.5'>({item.size})</span>
                                        </p>
                                    ))}
                                </div>

                                <div className='text-xs text-gray-500 leading-relaxed pt-1'>
                                    <p className='text-charcoal font-medium'>
                                        Deliver to: {order.address.firstName} {order.address.lastName} ({order.address.phone})
                                    </p>
                                    <p>{order.address.street}, {order.address.city}, {order.address.state} - {order.address.pinCode}</p>
                                </div>
                            </div>

                            {/* order meta & total */}
                            <div className='flex flex-row lg:flex-col justify-between items-start lg:items-end gap-2 border-t lg:border-t-0 border-gray-200 pt-3 lg:pt-0'>
                                <div className='text-left lg:text-right'>
                                    <span className='text-xs text-gray-500 block'>Payment: {order.paymentMethod}</span>
                                    <span className='text-xl font-extrabold text-navy'>{currency} {order.amount}</span>
                                </div>

                                {/* status + track button */}
                                <div className='flex flex-col items-end gap-2'>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 border rounded-full text-xs ${getStatusBadgeClass(order.status)}`}>
                                        <span className='w-2 h-2 rounded-full bg-current animate-pulse'></span>
                                        {order.status}
                                    </div>
                                    <button
                                        onClick={fetchOrders}
                                        className='px-4 py-1.5 border border-gray-300 bg-white text-charcoal text-xs font-medium rounded-xl hover:bg-navy hover:text-white transition-all shadow-sm cursor-pointer'
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

