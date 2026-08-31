import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
    const { products } = useContext(shopDataContext)

    const latest = [...products]
        .sort((a, b) => b.date - a.date)
        .slice(0, 4)

    return (
        <section className="py-xl px-gutter max-w-container-max mx-auto">
            <div className="flex justify-between items-end mb-lg">
                <h2 className="text-headline-md text-primary font-bold">Latest Collection</h2>
                <Link to="/collection" className="text-label-caps text-secondary uppercase hover:underline tracking-wide">
                    View All
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                {latest.map(product => (
                    <Card
                        key={product._id}
                        id={product._id}
                        image={product.image1}
                        name={product.name}
                        price={product.price}
                        sizes={product.sizes}
                    />
                ))}
            </div>
        </section>
    )
}

export default LatestCollection
