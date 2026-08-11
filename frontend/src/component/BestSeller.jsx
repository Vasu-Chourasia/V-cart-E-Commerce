import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

// shows up to 4 products marked as bestseller
function BestSeller() {
    const { products } = useContext(shopDataContext)

    const bestSellers = products.filter(p => p.bestseller).slice(0, 4)

    return (
        <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center gap-10'>
            <Title 
                text1={'BEST'} 
                text2={'SELLERS'} 
                subtext={'Discover top-rated customer favorites and trending products'}
            />
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6'>
                {bestSellers.map(product => (
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

export default BestSeller

