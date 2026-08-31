import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Card({ id, image, name, price, sizes }) {
    const { currency, addToCart } = useContext(shopDataContext)
    const navigate = useNavigate()

    const handleQuickAdd = (e) => {
        e.stopPropagation()
        const selectedSize = sizes && sizes.length > 0 ? sizes[0] : 'M'
        addToCart(id, selectedSize)
        toast.success(`Added ${name} (${selectedSize}) to cart!`)
    }

    return (
        <div
            onClick={() => navigate(`/productdetail/${id}`)}
            className="group border border-outline-variant/30 rounded-xl bg-surface-container-lowest premium-shadow overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:border-secondary"
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <button
                        onClick={handleQuickAdd}
                        className="bg-primary hover:bg-primary/90 text-on-primary px-md py-sm rounded text-label-caps uppercase tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-all cursor-pointer shadow-md"
                    >
                        Quick Add
                    </button>
                </div>
            </div>
            <div className="p-md flex flex-col flex-grow justify-between">
                <div>
                    <h3 className="text-body-md text-on-surface font-semibold line-clamp-1 group-hover:text-secondary transition-colors">
                        {name}
                    </h3>
                </div>
                <p className="text-body-md text-on-surface-variant mt-sm font-medium">
                    {currency} {price}
                </p>
            </div>
        </div>
    )
}

export default Card
