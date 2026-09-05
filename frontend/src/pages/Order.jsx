import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { authDataContext } from '../context/authContext'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import Nav from '../component/Nav'
import Footer from '../component/Footer'

const STAGES = [
    { key: 'Order Placed', label: 'Placed', width: 20 },
    { key: 'Packing', label: 'Packing', width: 40 },
    { key: 'Shipped', label: 'Shipped', width: 60 },
    { key: 'Out for delivery', label: 'Out for Delivery', width: 80 },
    { key: 'Delivered', label: 'Delivered', width: 100 }
]

function getStageProgress(status) {
    const stageIndex = STAGES.findIndex(s => s.key.toLowerCase() === (status || '').toLowerCase())
    if (stageIndex !== -1) {
        return { percent: STAGES[stageIndex].width, activeIndex: stageIndex }
    }
    return { percent: 20, activeIndex: 0 }
}

function getBadgeClass(status) {
    switch (status) {
        case 'Order Placed':
        case 'Packing':
            return 'bg-surface-container-high text-on-surface-variant border border-outline-variant/40'
        case 'Shipped':
        case 'Out for delivery':
            return 'bg-secondary text-on-secondary font-bold'
        case 'Delivered':
            return 'bg-primary text-on-primary font-bold'
        default:
            return 'bg-secondary text-on-secondary'
    }
}

function Order() {
    const { serverUrl } = useContext(authDataContext)
    const { currency } = useContext(shopDataContext)
    const [orders, setOrders] = useState([])
    const [trackingLoading, setTrackingLoading] = useState(false)
    const navigate = useNavigate()

    const fetchOrders = async (showToast = false) => {
        if (showToast) setTrackingLoading(true)
        try {
            const result = await axios.post(
                serverUrl + "/api/order/userorder",
                {},
                { withCredentials: true }
            )
            if (result.data) {
                setOrders(result.data.reverse())
                if (showToast) {
                    toast.info("Order status refreshed")
                }
            }
        } catch (error) {
            console.log("fetchOrders error", error)
            if (showToast) {
                toast.error("Failed to refresh order status")
            }
        } finally {
            if (showToast) setTrackingLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <div className="bg-surface-container-lowest min-h-screen flex flex-col justify-between antialiased text-on-surface">

            <main className="flex-grow w-full max-w-container-max mx-auto px-md md:px-gutter py-xl pb-24 md:pb-xl">
                <div className="mb-lg">
                    <h1 className="text-display-lg-mobile md:text-display-lg font-bold text-primary mb-xs">
                        Order History
                    </h1>
                    <p className="text-on-surface-variant text-body-md">
                        Track and manage your recent purchases.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-lg">
                    {orders.length === 0 ? (
                        <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-xl flex flex-col items-center justify-center text-center gap-md">
                            <span className="material-symbols-outlined text-4xl text-outline">package_2</span>
                            <h3 className="text-headline-md font-bold text-on-surface">No orders placed yet</h3>
                            <p className="text-body-md text-on-surface-variant max-w-md">
                                Your purchase history will appear here once you place an order.
                            </p>
                            <button
                                onClick={() => navigate("/collection")}
                                className="bg-primary hover:bg-primary/90 text-on-primary rounded text-label-caps uppercase px-lg py-md transition-colors shadow-sm cursor-pointer"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        orders.map((order, orderIdx) => {
                            const { percent, activeIndex } = getStageProgress(order.status)

                            return (
                                <div key={order._id || orderIdx} className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-md shadow-sm space-y-md">
                                    {order.items.map((item, itemIdx) => (
                                        <div key={itemIdx} className="flex flex-col md:flex-row gap-lg border-b border-outline-variant/20 pb-md last:border-b-0 last:pb-0">
                                            <div className="w-full md:w-32 h-32 rounded-lg bg-surface-container overflow-hidden shrink-0 border border-outline-variant/30">
                                                <img className="w-full h-full object-cover" src={item.image1} alt={item.name} />
                                            </div>

                                            <div className="flex-grow flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-sm">
                                                        <div>
                                                            <h3 className="text-headline-md font-bold text-primary">{item.name}</h3>
                                                            <p className="text-on-surface-variant text-label-caps uppercase mt-xs">
                                                                Order #{order._id ? order._id.slice(-8).toUpperCase() : `VC-${orderIdx + 1}`} • {new Date(order.date).toLocaleDateString()}
                                                            </p>
                                                            <p className="text-body-md text-on-surface-variant mt-xs">
                                                                Size: <strong className="text-on-surface font-semibold">{item.size}</strong> • Qty: <strong className="text-on-surface font-semibold">{item.quantity}</strong> • Payment: <span className="font-semibold text-secondary">{order.paymentMethod}</span>
                                                            </p>
                                                        </div>
                                                        <span className={`px-sm py-xs rounded text-label-caps uppercase shadow-xs ${getBadgeClass(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-headline-md font-bold text-primary mt-sm">
                                                        {currency} {item.price * item.quantity}
                                                    </p>
                                                </div>

                                                {/* 5-Stage Visual Progress Bar */}
                                                <div className="mt-lg">
                                                    <div className="flex justify-between text-label-caps uppercase text-on-surface-variant mb-sm text-[11px]">
                                                        {STAGES.map((stg, i) => (
                                                            <span
                                                                key={stg.key}
                                                                className={i <= activeIndex ? 'text-secondary font-bold' : 'text-outline/60'}
                                                            >
                                                                {stg.label}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden relative">
                                                        <div
                                                            className="bg-secondary h-full rounded-full transition-all duration-500"
                                                            style={{ width: `${percent}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex md:flex-col justify-end gap-sm mt-md md:mt-0 shrink-0">
                                                <button
                                                    onClick={() => fetchOrders(true)}
                                                    disabled={trackingLoading}
                                                    className="bg-primary hover:bg-primary/90 text-on-primary px-lg py-sm rounded text-label-caps uppercase whitespace-nowrap cursor-pointer shadow-xs disabled:opacity-50 flex items-center justify-center gap-xs min-w-[120px]"
                                                >
                                                    {trackingLoading ? "Refreshing..." : "Track Order"}
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/productdetail/${item._id}`)}
                                                    className="border border-secondary text-secondary hover:bg-secondary/10 px-lg py-sm rounded text-label-caps uppercase whitespace-nowrap cursor-pointer transition-colors"
                                                >
                                                    View Product
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        })
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Order
