import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdAddBox, MdListAlt, MdShoppingCart } from "react-icons/md"

function Sidebar() {
    const navigate = useNavigate()

    const links = [
        { label: "Add Product", icon: <MdAddBox className='w-[22px] h-[22px]' />, path: "/add" },
        { label: "Product List", icon: <MdListAlt className='w-[22px] h-[22px]' />, path: "/lists" },
        { label: "Orders", icon: <MdShoppingCart className='w-[22px] h-[22px]' />, path: "/orders" },
    ]

    return (
        <div className='w-[200px] md:w-[250px] min-h-[100vh] bg-[#0c1e22] fixed left-0 top-[70px] flex flex-col gap-[10px] pt-[30px] px-[10px]'>
            {links.map((link) => (
                <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className='w-[100%] flex items-center gap-[10px] text-[white] py-[12px] px-[15px] rounded-lg hover:bg-[#1e3a40] text-[15px]'
                >
                    {link.icon}
                    {link.label}
                </button>
            ))}
        </div>
    )
}

export default Sidebar
