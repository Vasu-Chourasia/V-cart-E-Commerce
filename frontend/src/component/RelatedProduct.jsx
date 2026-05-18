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
        <div className='w-[100%] flex flex-col items-center gap-[30px] py-[50px] px-[20px]'>
            <Title text1={'RELATED'} text2={'PRODUCTS'} />
            <div className='flex flex-wrap justify-center gap-[20px]'>
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
        </div>
    )
}

export default RelatedProduct
