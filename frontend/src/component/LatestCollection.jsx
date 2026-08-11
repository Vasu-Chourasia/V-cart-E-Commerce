import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

// shows the 8 most recently added products (sorted by date descending)
function LatestCollection() {
    const { products } = useContext(shopDataContext)

    const latest = [...products]
        .sort((a, b) => b.date - a.date)
        .slice(0, 8)

    return (
        <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center gap-10'>
            <Title 
                text1={'LATEST'} 
                text2={'COLLECTION'} 
                subtext={'Explore our newest handpicked arrivals designed for style and comfort'}
            />
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6'>
                {latest.map(product => (
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

export default LatestCollection

