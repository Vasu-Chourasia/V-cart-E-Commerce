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
        <div className='w-[100%] flex flex-col items-center gap-[30px] py-[50px]'>
            <Title text1={'LATEST'} text2={'COLLECTION'} />
            <div className='flex flex-wrap justify-center gap-[20px]'>
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
        </div>
    )
}

export default LatestCollection
