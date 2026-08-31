import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import CartTotal from '../component/CartTotal'
import Nav from '../component/Nav'
import Footer from '../component/Footer'

function Cart() {
    const { products, cartItem, updateQuantity, currency } = useContext(shopDataContext)
    const navigate = useNavigate()

    const cartEntries = []
    for (const itemId in cartItem) {
        for (const size in cartItem[itemId]) {
            if (cartItem[itemId][size] > 0) {
                const product = products.find(p => p._id === itemId)
                if (product) {
                    cartEntries.push({ product, size, quantity: cartItem[itemId][size] })
                }
            }
        }
    }

    return (
        <div className="bg-surface-container-lowest min-h-screen flex flex-col justify-between antialiased text-on-surface">

            <main className="flex-grow w-full max-w-container-max mx-auto px-gutter py-xl md:grid md:grid-cols-12 md:gap-gutter">
                
                {/* Left Column: Cart Items List */}
                <section className="md:col-span-8 space-y-md">
                    <h1 className="text-display-lg-mobile md:text-display-lg font-bold text-on-surface mb-lg">
                        Your Cart
                    </h1>

                    {cartEntries.length === 0 ? (
                        <div className="w-full py-xl flex flex-col items-center justify-center text-center bg-surface-container-low border border-outline-variant/30 rounded-xl p-xl gap-md shadow-sm">
                            <span className="material-symbols-outlined text-4xl text-outline">shopping_cart_off</span>
                            <h3 className="text-headline-md font-bold text-on-surface">Your cart is currently empty</h3>
                            <p className="text-body-md text-on-surface-variant max-w-md">
                                Discover our latest collections and add your favorite items to your cart.
                            </p>
                            <button
                                onClick={() => navigate("/collection")}
                                className="bg-primary hover:bg-primary/90 text-on-primary rounded text-label-caps uppercase px-lg py-md transition-colors shadow-sm cursor-pointer"
                            >
                                Explore Store
                            </button>
                        </div>
                    ) : (
                        <div className="border-t border-outline-variant/30 py-md">
                            {cartEntries.map(({ product, size, quantity }) => (
                                <div
                                    key={`${product._id}-${size}`}
                                    className="flex items-start gap-md py-md border-b border-outline-variant/30"
                                >
                                    <div
                                        onClick={() => navigate(`/productdetail/${product._id}`)}
                                        className="w-24 h-32 md:w-32 md:h-40 shrink-0 bg-surface-container rounded-lg overflow-hidden border border-outline-variant/30 cursor-pointer"
                                    >
                                        <img src={product.image1} alt={product.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-grow flex flex-col justify-between h-32 md:h-40">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3
                                                        onClick={() => navigate(`/productdetail/${product._id}`)}
                                                        className="text-body-lg font-semibold text-on-surface hover:text-secondary cursor-pointer transition-colors"
                                                    >
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-on-surface-variant text-body-md mt-xs">
                                                        Size: {size}
                                                    </p>
                                                </div>
                                                <span className="text-body-lg font-bold text-on-surface">
                                                    {currency} {product.price}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center mt-auto">
                                            {/* Quantity Stepper */}
                                            <div className="flex items-center border border-outline-variant rounded-md h-10 w-32 bg-surface-container-lowest">
                                                <button
                                                    onClick={() => updateQuantity(product._id, size, quantity - 1)}
                                                    className="w-10 h-full flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                                                >
                                                    <span className="material-symbols-outlined text-sm">remove</span>
                                                </button>
                                                <input
                                                    className="w-12 h-full text-center border-none p-0 text-body-md text-on-surface bg-transparent focus:ring-0 font-medium"
                                                    readOnly
                                                    type="text"
                                                    value={quantity}
                                                />
                                                <button
                                                    onClick={() => updateQuantity(product._id, size, quantity + 1)}
                                                    className="w-10 h-full flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                                                >
                                                    <span className="material-symbols-outlined text-sm">add</span>
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => updateQuantity(product._id, size, 0)}
                                                className="text-on-surface-variant hover:text-error transition-colors flex items-center gap-xs cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                                <span className="hidden md:inline text-label-caps uppercase font-bold">Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="pt-md">
                        <Link to="/collection" className="text-secondary text-label-caps uppercase font-bold hover:underline flex items-center gap-xs">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Continue Shopping
                        </Link>
                    </div>
                </section>

                {/* Right Column: Order Summary Panel */}
                <CartTotal />

            </main>

            <Footer />
        </div>
    )
}

export default Cart
