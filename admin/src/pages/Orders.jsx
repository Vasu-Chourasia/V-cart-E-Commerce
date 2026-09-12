import React, { useContext, useEffect, useMemo, useState } from "react"
import Nav from "../component/Nav"
import Sidebar from "../component/Sidebar"
import { authDataContext } from "../context/AuthContext"
import axios from "axios"
import { toast } from "react-toastify"

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
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("ALL")
    const [updatingOrderId, setUpdatingOrderId] = useState(null)

    const fetchAllOrders = async () => {
        try {
            const result = await axios.post(
                serverUrl + "/api/order/list",
                {},
                { withCredentials: true }
            )
            if (Array.isArray(result.data)) {
                setOrders(result.data.reverse())
            } else {
                setOrders([])
            }
        } catch (error) {
            console.error("fetchAllOrders error", error)
            toast.error("Failed to fetch orders")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllOrders()
    }, [])

    // Non-optimistic status update with disabled loading feedback
    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingOrderId(orderId)
        try {
            await axios.post(
                serverUrl + "/api/order/status",
                { orderId, status: newStatus },
                { withCredentials: true }
            )
            toast.success("Order status updated")
            await fetchAllOrders()
        } catch (error) {
            console.error("handleStatusChange error", error)
            toast.error(error?.response?.data?.message || "Failed to update status")
        } finally {
            setUpdatingOrderId(null)
        }
    }

    // Purely client-side derived active queue metric (non-delivered orders)
    const activeOrdersCount = useMemo(
        () => orders.filter((o) => o.status !== "Delivered").length,
        [orders]
    )

    // Filter orders by search term and status
    const filteredOrders = useMemo(() => {
        const query = searchTerm.toLowerCase().trim()
        return orders.filter((order) => {
            // Status filter
            const matchesStatus =
                selectedStatus === "ALL" ||
                order.status?.toLowerCase() === selectedStatus.toLowerCase()

            if (!matchesStatus) return false
            if (!query) return true

            // Order ID matching (matches full MongoDB _id or short #VC-XXXXX)
            const shortId = `#vc-${order._id.slice(-5).toLowerCase()}`
            const fullId = order._id.toLowerCase()
            const matchesId = fullId.includes(query) || shortId.includes(query)

            // Recipient name matching
            const recipient = `${order.address?.firstName || ""} ${order.address?.lastName || ""}`.toLowerCase()
            const matchesRecipient = recipient.includes(query)

            // Garment / items matching
            const matchesItem = order.items?.some((item) =>
                item.name?.toLowerCase().includes(query)
            )

            return matchesId || matchesRecipient || matchesItem
        })
    }, [orders, searchTerm, selectedStatus])

    return (
        <div className="pl-64 min-h-screen flex flex-col bg-background font-body-md text-body-md text-on-surface">
            <Nav />
            <Sidebar />

            <main className="w-full pt-header bg-background flex-1">
                <div className="flex flex-col w-full">
                    <div className="px-xl py-lg flex flex-col gap-lg max-w-container-max mx-auto w-full">
                        {/* Top Editorial Header & Operational Overview */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
                            <div className="flex flex-col gap-xs">
                                <div className="flex items-center gap-xs text-secondary">
                                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                                    <span className="font-label-caps text-label-caps uppercase tracking-wider">
                                        Fulfillment &amp; Auditing Registry
                                    </span>
                                </div>
                                <h1 className="font-display-lg text-display-lg text-primary tracking-tight font-bold">
                                    Order Management
                                </h1>
                                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                                    Review and update customer order fulfillment statuses with institutional cryptographic precision.
                                </p>
                            </div>

                            {/* Quick Metrics Ribbon */}
                            <div className="flex items-center gap-md bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/10">
                                <div className="flex items-center gap-sm pr-md border-r border-outline-variant/20">
                                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                                            Active Queue
                                        </span>
                                        <span className="font-headline-md text-headline-md text-primary leading-tight font-bold">
                                            {loading ? "..." : `${activeOrdersCount} Active`}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-sm bg-surface-container-low px-md py-xs rounded-lg">
                                    <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></div>
                                    <span className="font-label-caps text-label-caps text-on-surface font-semibold">
                                        Auto-Sync On
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Filter & Control Bar */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-md bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/10">
                            <div className="flex items-center gap-md flex-1 flex-wrap">
                                {/* Search Input */}
                                <div className="relative flex-1 min-w-[260px] max-w-md">
                                    <span className="material-symbols-outlined absolute left-[14px] top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                                        search
                                    </span>
                                    <input
                                        id="orderSearchInput"
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search Order ID, recipient, or garment..."
                                        className="w-full pl-search-input pr-md py-sm bg-surface-container-low rounded-lg text-body-md font-body-md text-on-surface placeholder:text-outline outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
                                    />
                                    {searchTerm && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchTerm("")}
                                            className="absolute right-[12px] top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1 rounded-full text-[16px]"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">close</span>
                                        </button>
                                    )}
                                </div>

                                {/* Status Filter Dropdown */}
                                <div className="flex items-center gap-xs">
                                    <span className="font-label-caps text-label-caps uppercase text-on-surface-variant px-xs">
                                        Filter:
                                    </span>
                                    <div className="relative">
                                        <select
                                            id="statusFilterSelect"
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                            className="bg-surface-container-low text-on-surface font-label-caps text-label-caps uppercase pl-md pr-8 py-sm rounded-lg cursor-pointer outline-none appearance-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
                                        >
                                            <option value="ALL">All Statuses</option>
                                            {STATUS_OPTIONS.map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[18px]">
                                            expand_more
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Counter Badge */}
                            <div className="flex items-center justify-between sm:justify-end gap-md">
                                <span
                                    id="orderCounterBadge"
                                    className="font-label-caps text-label-caps uppercase text-on-surface bg-surface-container px-md py-xs rounded-lg font-semibold"
                                >
                                    Showing {filteredOrders.length} {filteredOrders.length === 1 ? "Order" : "Orders"}
                                </span>
                            </div>
                        </div>

                        {/* Order Items Container (Card Stack) */}
                        <div className="flex flex-col gap-md" id="ordersContainer">
                            {loading ? (
                                /* Loading Skeleton Cards */
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 animate-pulse flex flex-col gap-md"
                                    >
                                        <div className="h-12 bg-surface-container rounded-lg"></div>
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
                                            <div className="lg:col-span-5 h-16 bg-surface-container rounded-lg"></div>
                                            <div className="lg:col-span-4 h-16 bg-surface-container rounded-lg"></div>
                                            <div className="lg:col-span-3 h-10 bg-surface-container rounded-lg"></div>
                                        </div>
                                    </div>
                                ))
                            ) : filteredOrders.length === 0 ? (
                                /* Empty State */
                                <div className="bg-surface-container-lowest rounded-xl p-xl shadow-sm border border-outline-variant/10 flex flex-col items-center justify-center gap-sm text-center">
                                    <span className="material-symbols-outlined text-[48px] text-outline">
                                        receipt_long
                                    </span>
                                    <span className="font-semibold text-primary text-body-lg">
                                        No orders found
                                    </span>
                                    <p className="text-body-md text-on-surface-variant max-w-sm">
                                        Try adjusting your search query or status filter criteria.
                                    </p>
                                </div>
                            ) : (
                                /* Active Order Cards */
                                filteredOrders.map((order) => {
                                    const shortId = `#VC-${order._id.slice(-5).toUpperCase()}`
                                    const formattedDate = new Date(order.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })
                                    const isUpdating = updatingOrderId === order._id

                                    return (
                                        <div
                                            key={order._id}
                                            data-order-id={order._id}
                                            data-status={order.status}
                                            className="order-card bg-surface-container-lowest rounded-xl p-lg shadow-sm transition-all duration-200 hover:shadow-md flex flex-col gap-md border border-outline-variant/10"
                                        >
                                            {/* Order Card Top Bar */}
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-md pb-md bg-surface-container-low/40 p-md rounded-lg">
                                                <div className="flex flex-wrap items-center gap-md">
                                                    <div className="flex items-center gap-xs">
                                                        <span className="material-symbols-outlined text-secondary text-[20px]">
                                                            tag
                                                        </span>
                                                        <span
                                                            title={`Full Order ID: ${order._id}`}
                                                            className="font-headline-md text-headline-md text-primary font-bold tracking-tight"
                                                        >
                                                            {shortId}
                                                        </span>
                                                    </div>
                                                    <span className="font-body-md text-body-md text-outline">
                                                        |
                                                    </span>
                                                    <div className="flex items-center gap-xs text-on-surface-variant">
                                                        <span className="material-symbols-outlined text-[18px]">
                                                            calendar_today
                                                        </span>
                                                        <span className="font-body-md text-body-md">
                                                            {formattedDate}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-lg flex-wrap">
                                                    {/* Payment Method Badge (COD, Razorpay, Stripe) */}
                                                    <div className="flex items-center gap-xs">
                                                        <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                                                            Method:
                                                        </span>
                                                        <span className="font-label-caps text-label-caps uppercase px-sm py-xs bg-surface-container text-primary font-bold rounded">
                                                            {order.paymentMethod}
                                                        </span>
                                                    </div>

                                                    {/* Payment Status Pill */}
                                                    <div className="flex items-center gap-xs">
                                                        <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                                                            Payment:
                                                        </span>
                                                        {order.payment ? (
                                                            <span className="inline-flex items-center gap-xs px-md py-xs rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps uppercase font-bold">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                                                                Done
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-xs px-md py-xs rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-caps text-label-caps uppercase font-bold">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
                                                                Pending
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Total Amount */}
                                                    <div className="flex items-baseline gap-xs pl-md bg-surface-container-lowest px-md py-xs rounded-lg border border-outline-variant/10">
                                                        <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                                                            Total:
                                                        </span>
                                                        <span className="font-headline-md text-headline-md text-primary font-bold font-mono">
                                                            ₹{Number(order.amount || 0).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Order Card Content Grid */}
                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start lg:items-center">
                                                {/* Purchased Items */}
                                                <div className="lg:col-span-5 flex flex-col gap-xs">
                                                    <span className="font-label-caps text-label-caps uppercase text-on-surface-variant flex items-center gap-xs font-semibold">
                                                        <span className="material-symbols-outlined text-[16px]">
                                                            checkroom
                                                        </span>
                                                        Items Purchased ({order.items?.length || 0})
                                                    </span>
                                                    <p className="font-body-md text-body-md text-on-surface font-medium leading-relaxed">
                                                        {order.items?.map((item, idx) => (
                                                            <span key={idx}>
                                                                {item.name} × {item.quantity}{" "}
                                                                <span className="text-on-surface-variant font-normal">
                                                                    ({item.size})
                                                                </span>
                                                                {idx < order.items.length - 1 && ", "}
                                                            </span>
                                                        ))}
                                                    </p>
                                                </div>

                                                {/* Shipping Destination */}
                                                <div className="lg:col-span-4 flex flex-col gap-xs">
                                                    <span className="font-label-caps text-label-caps uppercase text-on-surface-variant flex items-center gap-xs font-semibold">
                                                        <span className="material-symbols-outlined text-[16px]">
                                                            location_on
                                                        </span>
                                                        Shipping Address
                                                    </span>
                                                    <p className="font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed">
                                                        <strong className="text-on-surface font-semibold">
                                                            {order.address?.firstName} {order.address?.lastName}
                                                        </strong>
                                                        , {order.address?.street}, {order.address?.city},{" "}
                                                        {order.address?.state}, {order.address?.country} —{" "}
                                                        {order.address?.pinCode}, Ph: {order.address?.phone}
                                                    </p>
                                                </div>

                                                {/* Status Dropdown Admin Controller */}
                                                <div className="lg:col-span-3 flex flex-col gap-xs">
                                                    <label className="font-label-caps text-label-caps uppercase text-primary font-semibold flex items-center gap-xs">
                                                        <span className="material-symbols-outlined text-secondary text-[16px]">
                                                            tune
                                                        </span>
                                                        Fulfillment Status
                                                    </label>
                                                    <div className="relative w-full">
                                                        <select
                                                            disabled={isUpdating}
                                                            value={order.status}
                                                            onChange={(e) =>
                                                                handleStatusChange(order._id, e.target.value)
                                                            }
                                                            className="status-selector w-full bg-surface-container-low text-primary font-body-md text-body-md font-semibold px-md py-sm rounded-lg appearance-none cursor-pointer focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary shadow-sm pr-select-chevron border border-outline-variant/10 disabled:opacity-60 transition-all"
                                                        >
                                                            {STATUS_OPTIONS.map((status) => (
                                                                <option key={status} value={status}>
                                                                    {status}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute right-md top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                                                            {isUpdating ? (
                                                                <span className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></span>
                                                            ) : (
                                                                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                                                                    expand_more
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Orders
