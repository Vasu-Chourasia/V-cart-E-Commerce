import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function RelatedProduct({ category, subCategory, currentProductId }) {
    const { products } = useContext(shopDataContext)

    const related = products
        .filter(p => p.category === category && p.subCategory === subCategory && p._id !== currentProductId)
        .slice(0, 4)

    if (related.length === 0) return null

    return (
        <section className="mt-xl border-t border-outline-variant/30 pt-lg">
            <h2 className="text-headline-md font-bold text-on-surface mb-lg">Related Pieces</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                {related.map(product => (
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

export default RelatedProduct
