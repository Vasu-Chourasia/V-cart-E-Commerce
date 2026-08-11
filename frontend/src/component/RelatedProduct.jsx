import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'
import Title from './Title'

// shows products with same category + subCategory, excluding the current one
function RelatedProduct({ category, subCategory, currentProductId }) {
    const { products } = useContext(shopDataContext)

    const related = products
        .filter(p => p.category === category && p.subCategory === subCategory && p._id !== currentProductId)
        .slice(0, 4)

    if (related.length === 0) return null

    return (
        <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center gap-10'>
            <Title text1={'RELATED'} text2={'PRODUCTS'} subtext={'You might also like these matching items'} />
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6'>
                {related.map(product => (
                    <Card
                        key={product._id}
                        id={product._id}
                        image={product.image1}
                        name={product.name}
                        price={product.price}
                    />
                ))}
            </div>
        </section>
    )
}

export default RelatedProduct

