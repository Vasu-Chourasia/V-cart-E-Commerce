import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { SiEbox } from "react-icons/si"

const STATUS_OPTIONS = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out for delivery",
    "Delivered",
]

function Orders() {
    const { serverUrl } = useContext(authDataContext)
    const [orders, setOrders] = useState([])

    const fetchAllOrders = async () => {
        try {
            const result = await axios.post(
                serverUrl + '/api/order/list',
                {},
                { withCredentials: true }
            )
            setOrders(result.data.reverse())
        } catch (error) {
            console.log("fetchAllOrders error", error)
        }
    }

    const statusHandler = async (e, orderId) => {
        try {
            await axios.post(
                serverUrl + '/api/order/status',
                { orderId, status: e.target.value },
                { withCredentials: true }
            )
            fetchAllOrders() // refresh after update
        } catch (error) {
            console.log("statusHandler error", error)
        }
    }

    useEffect(() => {
        fetchAllOrders()
    }, [])

    return (
        <div className='w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
            <Nav />
            <div className='flex'>
                <Sidebar />
                <div className='lg:ml-[260px] ml-[110px] mt-[90px] w-[100%] px-[20px] pb-[50px]'>
                    <h2 className='text-[28px] font-semibold mb-[30px]'>All Orders</h2>

                    <div className='flex flex-col gap-[20px]'>
                        {orders.map((order, index) => (
                            <div key={index}
                                className='w-[95%] bg-slate-600 rounded-xl flex lg:items-center items-start justify-between flex-col lg:flex-row p-[15px] md:px-[20px] gap-[15px]'>

                                <SiEbox className='w-[50px] h-[50px] text-black p-[5px] rounded-lg bg-white hidden lg:block' />

                                {/* items */}
                                <div className='flex flex-col gap-[4px]'>
                                    {order.items.map((item, i) => (
                                        <p key={i} className='text-[14px] text-[#56dbfc]'>
                                            {item.name.toUpperCase()} × {item.quantity}
                                            <span className='text-slate-300'> {item.size}</span>
                                            {i < order.items.length - 1 && ','}
                                        </p>
                                    ))}
                                </div>

                                {/* address */}
                                <div className='text-[13px] text-green-100 flex flex-col gap-[2px]'>
                                    <p>{order.address.firstName} {order.address.lastName}</p>
                                    <p>{order.address.street}</p>
                                    <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.pinCode}</p>
                                    <p>{order.address.phone}</p>
                                </div>

                                {/* meta */}
                                <div className='text-[13px] text-green-100 flex flex-col gap-[3px]'>
                                    <p>Items: {order.items.length}</p>
                                    <p>Method: {order.paymentMethod}</p>
                                    <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                                    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                                    <p className='text-white font-semibold text-[16px]'>₹ {order.amount}</p>
                                </div>

                                {/* status dropdown */}
                                <select
                                    value={order.status}
                                    onChange={(e) => statusHandler(e, order._id)}
                                    className='px-[10px] py-[10px] bg-slate-500 rounded-lg border border-[#96eef3] text-white'
                                >
                                    {STATUS_OPTIONS.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        {orders.length === 0 && (
                            <p className='text-slate-400 mt-[20px]'>No orders yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders
