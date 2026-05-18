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
        <div className='w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[100px] pb-[100px] md:pb-[40px] px-[20px] md:px-[50px]'>
            <Title text1={'MY'} text2={'ORDERS'} />

            <div className='flex flex-col gap-[20px] mt-[30px]'>
                {orders.length === 0 && (
                    <p className='text-slate-400 text-[16px] mt-[20px]'>No orders yet</p>
                )}

                {orders.map((order, index) => (
                    <div key={index} className='bg-[#1e3a40] rounded-lg p-[20px] flex flex-col lg:flex-row lg:items-center gap-[20px] justify-between'>

                        {/* items list */}
                        <div className='flex flex-col gap-[5px]'>
                            {order.items.map((item, i) => (
                                <p key={i} className='text-[#56dbfc] text-[14px] font-semibold'>
                                    {item.name.toUpperCase()} × {item.quantity}
                                    <span className='text-slate-300 font-normal'> ({item.size})</span>
                                    {i < order.items.length - 1 && ','}
                                </p>
                            ))}
                        </div>

                        {/* delivery address */}
                        <div className='text-[13px] text-slate-300 flex flex-col gap-[2px]'>
                            <p className='text-white font-semibold'>{order.address.firstName} {order.address.lastName}</p>
                            <p>{order.address.street}</p>
                            <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.pinCode}</p>
                            <p>{order.address.phone}</p>
                        </div>

                        {/* order meta */}
                        <div className='text-[13px] text-slate-300 flex flex-col gap-[4px]'>
                            <p>Items: {order.items.length}</p>
                            <p>Method: {order.paymentMethod}</p>
                            <p>Payment: <span className={order.payment ? 'text-green-400' : 'text-yellow-400'}>{order.payment ? 'Done' : 'Pending'}</span></p>
                            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                            <p className='text-white font-semibold text-[16px]'>{currency} {order.amount}</p>
                        </div>

                        {/* status + track button */}
                        <div className='flex flex-col gap-[10px] items-start lg:items-end'>
                            <div className='flex items-center gap-[8px]'>
                                <div className='w-[10px] h-[10px] rounded-full bg-green-400'></div>
                                <p className='text-white text-[14px] font-semibold'>{order.status}</p>
                            </div>
                            <button
                                onClick={fetchOrders}
                                className='px-[20px] py-[8px] border border-slate-500 text-white text-[13px] rounded-lg hover:bg-slate-700'
                            >
                                Track Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Order
