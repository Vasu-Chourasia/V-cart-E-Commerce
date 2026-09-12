import React from "react"
import { NavLink } from "react-router-dom"

function Sidebar() {
    const navItems = [
        { label: "Home", icon: "grid_view", path: "/" },
        { label: "Add Product", icon: "add_circle", path: "/add" },
        { label: "Product List", icon: "inventory_2", path: "/lists" },
        { label: "Orders", icon: "receipt_long", path: "/orders" },
    ]

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest z-50 flex flex-col shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-outline-variant/20">
            <div className="h-16 px-lg flex items-center gap-sm">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary text-[18px]">shopping_bag</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-headline-md text-headline-md text-primary tracking-tight font-bold leading-none">V-Cart</span>
                    <span className="font-label-caps text-label-caps text-secondary uppercase leading-none mt-xs">Admin Hub</span>
                </div>
            </div>
            <nav className="flex-1 px-md py-lg flex flex-col gap-xs">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/"}
                        className={({ isActive }) =>
                            `flex items-center gap-md px-md py-sm transition-all rounded-lg ${
                                isActive
                                    ? "bg-primary-container text-on-primary font-bold shadow-sm"
                                    : "text-on-surface-variant font-body-md text-body-md hover:bg-surface-container hover:text-on-surface"
                            }`
                        }
                    >
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar
