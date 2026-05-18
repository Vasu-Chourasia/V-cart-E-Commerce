import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

// shows up to 4 products marked as bestseller
function BestSeller() {
    const { products } = useContext(shopDataContext)

    const bestSellers = products.filter(p => p.bestseller).slice(0, 4)

    return (
        <div className='w-[100%] flex flex-col items-center gap-[30px] py-[50px]'>
            <Title text1={'BEST'} text2={'SELLERS'} />
            <div className='flex flex-wrap justify-center gap-[20px]'>
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
    )
}

export default BestSeller
