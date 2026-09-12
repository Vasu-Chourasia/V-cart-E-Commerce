import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Nav from "../component/Nav"
import Sidebar from "../component/Sidebar"
import { authDataContext } from "../context/AuthContext"
import axios from "axios"

function Home() {
    const { serverUrl } = useContext(authDataContext)
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalOrders, setTotalOrders] = useState(0)
    const [loading, setLoading] = useState(true)

    const fetchCounts = async () => {
        try {
            setLoading(true)
            const productsRes = await axios.get(serverUrl + "/api/product/list")
            if (Array.isArray(productsRes.data)) {
                setTotalProducts(productsRes.data.length)
            }

            const ordersRes = await axios.post(
                serverUrl + "/api/order/list",
                {},
                { withCredentials: true }
            )
            if (Array.isArray(ordersRes.data)) {
                setTotalOrders(ordersRes.data.length)
            }
        } catch (error) {
            console.log("fetchCounts error", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCounts()
    }, [])

    return (
        <div className="pl-64 min-h-screen flex flex-col bg-background font-body-md text-body-md text-on-surface">
            <Nav />
            <Sidebar />
            <main className="w-full pt-16 bg-background flex-1">
                <div className="flex flex-col w-full">
                    <div className="p-xl flex flex-col gap-xl max-w-container-max mx-auto w-full">
                        {/* Page Header Section */}
                        <section className="flex flex-col md:flex-row md:items-end justify-between gap-md">
                            <div className="flex flex-col gap-xs">
                                <div className="flex items-center gap-xs">
                                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                    <span className="font-label-caps text-label-caps uppercase text-secondary tracking-wider">
                                        System Live • Catalog Sync
                                    </span>
                                </div>
                                <h1 className="font-display-lg text-display-lg text-primary tracking-tight font-bold">
                                    Dashboard Overview
                                </h1>
                                <p className="font-body-lg text-body-lg text-on-surface-variant">
                                    Welcome back, Admin. Here is your store summary.
                                </p>
                            </div>
                            <div className="flex items-center gap-sm self-start md:self-auto bg-surface-container-lowest px-md py-sm rounded-lg shadow-sm border border-outline-variant/20">
                                <span className="material-symbols-outlined text-secondary text-[20px]">verified_user</span>
                                <span className="font-label-caps text-label-caps text-on-surface uppercase">
                                    Operational Status: Nominal
                                </span>
                            </div>
                        </section>

                        {/* Exactly Two Summary Stat Cards */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                            {/* Stat Card 1: Total Products */}
                            <div className="group relative bg-surface-container-lowest rounded-xl p-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden border border-outline-variant/10">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
                                <div className="flex items-start justify-between relative z-10">
                                    <div className="flex flex-col">
                                        <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
                                            Inventory Metric
                                        </span>
                                        <span className="font-headline-md text-headline-md text-primary font-bold mt-xs">
                                            Total Products
                                        </span>
                                    </div>
                                    <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-300">
                                        <span className="material-symbols-outlined text-[26px]">inventory_2</span>
                                    </div>
                                </div>
                                <div className="mt-xl pt-lg relative z-10 flex items-baseline justify-between border-t border-outline-variant/10">
                                    <div className="flex flex-col">
                                        <span className="font-display-lg text-display-lg text-primary font-bold tracking-tight">
                                            {loading ? "..." : totalProducts}
                                        </span>
                                        <span className="font-body-md text-body-md text-secondary font-semibold mt-xs flex items-center gap-xs">
                                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                            Active in catalog
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-label-caps text-label-caps uppercase text-outline">SKU Classification</span>
                                        <p className="font-body-md text-body-md text-on-surface-variant">Tier-1 Curated</p>
                                    </div>
                                </div>
                            </div>

                            {/* Stat Card 2: Total Orders */}
                            <div className="group relative bg-surface-container-lowest rounded-xl p-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden border border-outline-variant/10">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
                                <div className="flex items-start justify-between relative z-10">
                                    <div className="flex flex-col">
                                        <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
                                            Fulfillment Metric
                                        </span>
                                        <span className="font-headline-md text-headline-md text-primary font-bold mt-xs">
                                            Total Orders
                                        </span>
                                    </div>
                                    <div className="w-12 h-12 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                                        <span className="material-symbols-outlined text-[26px]">receipt_long</span>
                                    </div>
                                </div>
                                <div className="mt-xl pt-lg relative z-10 flex items-baseline justify-between border-t border-outline-variant/10">
                                    <div className="flex flex-col">
                                        <span className="font-display-lg text-display-lg text-primary font-bold tracking-tight">
                                            {loading ? "..." : totalOrders}
                                        </span>
                                        <span className="font-body-md text-body-md text-secondary font-semibold mt-xs flex items-center gap-xs">
                                            <span className="material-symbols-outlined text-[18px]">verified</span>
                                            Lifetime total orders
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-label-caps text-label-caps uppercase text-outline">Registry Audit</span>
                                        <p className="font-body-md text-body-md text-on-surface-variant">Full Settlement</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Visual Editorial Highlight Banner */}
                        <section className="relative rounded-xl overflow-hidden bg-primary text-on-primary shadow-sm">
                            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[220px]">
                                <div className="lg:col-span-8 p-lg flex flex-col justify-center gap-sm relative z-10">
                                    <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary-fixed">
                                        Catalog Master Controls
                                    </span>
                                    <h2 className="font-headline-md text-headline-md text-on-primary font-bold tracking-tight">
                                        Precision management designed for refined commerce.
                                    </h2>
                                    <p className="font-body-md text-body-md text-surface-container-highest max-w-xl">
                                        Update store inventories, manage publication workflows, and oversee fulfillment tracking using streamlined administrative pathways.
                                    </p>
                                </div>
                                <div className="lg:col-span-4 relative min-h-[160px] lg:min-h-full">
                                    <img
                                        className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40 hover:opacity-60 transition-opacity duration-500"
                                        alt="Editorial luxury retail presentation"
                                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
                                </div>
                            </div>
                        </section>

                        {/* Quick Links / Action Shortcuts Section */}
                        <section className="flex flex-col gap-md">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="font-label-caps text-label-caps uppercase tracking-wider text-outline">
                                        Execution Grid
                                    </span>
                                    <h3 className="font-headline-md text-headline-md text-primary font-bold">
                                        Action Shortcuts
                                    </h3>
                                </div>
                                <span className="font-label-caps text-label-caps uppercase text-secondary">
                                    3 Core Modules
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                                {/* Action 1: Add New Product */}
                                <Link
                                    to="/add"
                                    className="group bg-surface-container-lowest p-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-outline-variant/10"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-300 mb-md">
                                            <span className="material-symbols-outlined text-[24px]">add_circle</span>
                                        </div>
                                        <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
                                            Entry Portal
                                        </span>
                                        <h4 className="font-headline-md text-headline-md text-primary font-bold group-hover:text-secondary transition-colors duration-200 mt-xs">
                                            Add New Product
                                        </h4>
                                        <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
                                            Create and register brand new merchandise into the active digital storefront.
                                        </p>
                                    </div>
                                    <div className="mt-lg pt-md flex items-center justify-between text-secondary border-t border-outline-variant/10">
                                        <span className="font-label-caps text-label-caps uppercase font-semibold">
                                            Open Product Creator
                                        </span>
                                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                                            arrow_forward
                                        </span>
                                    </div>
                                </Link>

                                {/* Action 2: Manage Products */}
                                <Link
                                    to="/lists"
                                    className="group bg-surface-container-lowest p-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-outline-variant/10"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-300 mb-md">
                                            <span className="material-symbols-outlined text-[24px]">view_list</span>
                                        </div>
                                        <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
                                            Catalog Directory
                                        </span>
                                        <h4 className="font-headline-md text-headline-md text-primary font-bold group-hover:text-secondary transition-colors duration-200 mt-xs">
                                            Manage Products
                                        </h4>
                                        <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
                                            Review full product catalog, modify specifications, and adjust live statuses.
                                        </p>
                                    </div>
                                    <div className="mt-lg pt-md flex items-center justify-between text-secondary border-t border-outline-variant/10">
                                        <span className="font-label-caps text-label-caps uppercase font-semibold">
                                            Access Product Index
                                        </span>
                                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                                            arrow_forward
                                        </span>
                                    </div>
                                </Link>

                                {/* Action 3: View Orders */}
                                <Link
                                    to="/orders"
                                    className="group bg-surface-container-lowest p-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-outline-variant/10"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-300 mb-md">
                                            <span className="material-symbols-outlined text-[24px]">local_shipping</span>
                                        </div>
                                        <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
                                            Logistics &amp; Ledger
                                        </span>
                                        <h4 className="font-headline-md text-headline-md text-primary font-bold group-hover:text-secondary transition-colors duration-200 mt-xs">
                                            View Orders
                                        </h4>
                                        <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
                                            Inspect order invoices, inspect package states, and update fulfillment queues.
                                        </p>
                                    </div>
                                    <div className="mt-lg pt-md flex items-center justify-between text-secondary border-t border-outline-variant/10">
                                        <span className="font-label-caps text-label-caps uppercase font-semibold">
                                            Order Management
                                        </span>
                                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                                            arrow_forward
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </section>

                        {/* Bottom Architectural Brand Indicator */}
                        <div className="flex flex-col sm:flex-row items-center justify-between py-md text-outline">
                            <div className="flex items-center gap-xs">
                                <span className="font-label-caps text-label-caps uppercase">V-Cart Core Admin Instance</span>
                                <span>•</span>
                                <span className="font-label-caps text-label-caps">Secured Enclave</span>
                            </div>
                            <div className="flex items-center gap-sm mt-xs sm:mt-0">
                                <span className="font-label-caps text-label-caps uppercase">Cluster: US-EAST-01</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home
