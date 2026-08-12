import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

// shows up to 4 products marked as bestseller
function BestSeller() {
    const { products } = useContext(shopDataContext)

    const bestSellers = products.filter(p => p.bestseller).slice(0, 4)

    return (
        <section className='w-full bg-[#0f1e2c] border-y border-white/10 py-12 px-4 md:py-24 md:px-6'>
            <div className='max-w-7xl mx-auto flex flex-col items-center'>
                <Title 
                    text1={'BEST'} 
                    text2={'SELLERS'} 
                    subtext={'Discover top-rated customer favorites and trending products'}
                />
                <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
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
            </div>
        </section>
    )
}


export default BestSeller


