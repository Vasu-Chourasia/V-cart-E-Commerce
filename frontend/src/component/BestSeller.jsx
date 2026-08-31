import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

function BestSeller() {
    const { products, currency } = useContext(shopDataContext)
    const navigate = useNavigate()

    const bestSellers = products.filter(p => p.bestseller)
    const displayProducts = bestSellers.length >= 3 ? bestSellers : products

    const featureItem = displayProducts[0]
    const smallItems = displayProducts.slice(1, 3)

    return (
        <section className="py-xl px-gutter bg-surface">
            <div className="max-w-container-max mx-auto">
                <div className="flex justify-between items-end mb-lg">
                    <h2 className="text-headline-md font-bold text-primary">Best Sellers</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                    {/* Large Feature Card */}
                    {featureItem && (
                        <div
                            onClick={() => navigate(`/productdetail/${featureItem._id}`)}
                            className="md:col-span-2 group relative h-96 rounded-xl overflow-hidden shadow-sm border border-surface-container-highest cursor-pointer"
                        >
                            <img
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                src={featureItem.image1}
                                alt={featureItem.name}
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-lg bg-gradient-to-t from-primary/80 to-transparent flex justify-between items-end">
                                <div>
                                    <span className="text-label-caps text-on-primary/80 uppercase tracking-widest mb-1 block">
                                        Signature Bestseller
                                    </span>
                                    <h3 className="text-headline-md text-on-primary font-semibold">{featureItem.name}</h3>
                                </div>
                                <button className="bg-white text-primary rounded text-label-caps uppercase px-md py-sm hover:bg-surface-container transition-colors shadow-sm cursor-pointer font-bold">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Stacked Small Cards */}
                    <div className="flex flex-col gap-lg justify-between">
                        {smallItems.map(item => (
                            <div
                                key={item._id}
                                onClick={() => navigate(`/productdetail/${item._id}`)}
                                className="flex gap-md bg-surface-container-lowest p-sm rounded-xl border border-surface-container-highest premium-shadow group hover:border-secondary transition-colors cursor-pointer flex-1 items-center"
                            >
                                <div className="w-24 h-24 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        src={item.image1}
                                        alt={item.name}
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="text-body-md text-on-surface font-semibold group-hover:text-secondary transition-colors">
                                        {item.name}
                                    </h4>
                                    <p className="text-body-md text-on-surface-variant font-medium mt-xs">
                                        {currency} {item.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BestSeller
