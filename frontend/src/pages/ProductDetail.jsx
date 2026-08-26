import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import { shopDataContext } from '../context/ShopContext'
import RelatedProduct from '../component/RelatedProduct'
import Loading from '../component/Loading'

function ProductDetail() {
    const { productId } = useParams()
    const { products, currency, addtoCart, loading } = useContext(shopDataContext)

    const [productData, setProductData] = useState(null)
    const [mainImage, setMainImage] = useState('')
    const [size, setSize] = useState('')

    useEffect(() => {
        const found = products.find(p => p._id === productId)
        if (found) {
            setProductData(found)
            setMainImage(found.image1)
            setSize('') // reset size on product change
        }
    }, [productId, products])

    if (!productData) return <div className='opacity-0'></div>

    const thumbs = [productData.image1, productData.image2, productData.image3, productData.image4].filter(Boolean)

    return (
        <div className='w-full min-h-screen bg-white pt-24 pb-32 py-12 px-4 md:py-24 md:px-6 text-charcoal'>
            <div className='max-w-7xl mx-auto space-y-16 md:space-y-24'>

                
                {/* main product details grid */}
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>

                    {/* image gallery (5 cols in large screen) */}
                    <div className='lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4'>
                        {/* thumbnails */}
                        <div className='flex sm:flex-col gap-3 justify-center sm:justify-start overflow-x-auto sm:overflow-visible py-1'>
                            {thumbs.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMainImage(img)}
                                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-gray-surface ${mainImage === img ? 'border-teal shadow-md scale-105' : 'border-gray-200 opacity-70 hover:opacity-100'}`}
                                >
                                    <img src={img} alt="" className='w-full h-full object-cover' />
                                </button>
                            ))}
                        </div>
                        {/* main image */}
                        <div className='flex-1 aspect-square sm:aspect-[4/5] bg-gray-surface border border-gray-200 rounded-2xl overflow-hidden shadow-sm relative group'>
                            <img src={mainImage} alt={productData.name} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
                        </div>
                    </div>

                    {/* product details (7 cols in large screen) */}
                    <div className='lg:col-span-6 space-y-6 bg-gray-surface border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm'>
                        <div>
                            <span className='px-3 py-1 text-[11px] font-bold tracking-widest uppercase text-teal bg-teal/10 border border-teal/20 rounded-full inline-block mb-3'>
                                {productData.category} / {productData.subCategory}
                            </span>
                            <h1 className='text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight'>
                                {productData.name}
                            </h1>
                        </div>

                        {/* rating */}
                        <div className='flex items-center gap-2 text-sm'>
                            <div className='flex items-center gap-1 text-amber-500'>
                                {[...Array(4)].map((_, i) => <FaStar key={i} />)}
                                <FaStarHalfAlt />
                            </div>
                            <span className='text-gray-500 text-xs font-medium'>(124 customer reviews)</span>
                        </div>

                        {/* price */}
                        <div className='flex items-baseline gap-3 border-y border-gray-200 py-4'>
                            <span className='text-3xl font-extrabold text-navy tracking-tight'>
                                {currency} {productData.price}
                            </span>
                            <span className='text-xs text-emerald-700 font-semibold px-2 py-0.5 bg-emerald-50 rounded-md border border-emerald-200'>
                                In Stock
                            </span>
                        </div>

                        {/* description snippet */}
                        <p className='text-gray-600 text-sm leading-relaxed font-normal'>
                            {productData.description}
                        </p>

                        {/* size selector */}
                        {productData.sizes && productData.sizes.length > 0 && (
                            <div className='space-y-3 pt-2'>
                                <label className='text-charcoal font-semibold text-xs uppercase tracking-wider block'>Select Size</label>
                                <div className='flex flex-wrap gap-2.5'>
                                    {productData.sizes.map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSize(s)}
                                            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all border ${s === size ? 'bg-navy text-white border-navy shadow-md scale-105' : 'bg-white text-charcoal border-gray-300 hover:border-teal'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* add to cart action button — styled with disabled token when size is missing */}
                        <button
                            onClick={() => addtoCart(productData._id, size)}
                            disabled={!size}
                            className={`w-full sm:w-auto px-6 py-3 font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2 mt-4 ${
                                size 
                                    ? 'bg-navy text-white hover:bg-navy-hover active:scale-95 shadow-md shadow-navy/20 cursor-pointer' 
                                    : 'bg-disabled-bg text-disabled-text border border-gray-300 cursor-not-allowed opacity-70 shadow-none'
                            }`}
                            style={{ padding: '12px 24px', borderRadius: '8px' }}
                        >
                            {loading ? <Loading /> : (size ? "Add to Shopping Cart" : "Please Select a Size")}
                        </button>

                        {/* guarantees */}
                        <div className='space-y-2 border-t border-gray-200 pt-4 text-xs text-gray-600 font-medium'>
                            <p className='flex items-center gap-2'>
                                <span className='text-teal font-bold'>✓</span> 100% Guaranteed Original Product
                            </p>
                            <p className='flex items-center gap-2'>
                                <span className='text-teal font-bold'>✓</span> Cash on delivery available
                            </p>
                            <p className='flex items-center gap-2'>
                                <span className='text-teal font-bold'>✓</span> Easy return and exchange within 7 days
                            </p>
                        </div>

                    </div>

                </div>

                {/* extra details tab */}
                <div className='bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm'>
                    <div className='flex border-b border-gray-200 bg-gray-surface'>
                        <button className='px-6 py-3.5 text-xs font-bold tracking-wider text-teal border-b-2 border-teal bg-white'>
                            DESCRIPTION
                        </button>
                        <button className='px-6 py-3.5 text-xs font-bold tracking-wider text-gray-500 hover:text-charcoal transition-colors'>
                            REVIEWS (124)
                        </button>
                    </div>
                    <div className='p-6 sm:p-8 text-gray-600 text-sm leading-relaxed space-y-3'>
                        <p>{productData.description}</p>
                        <p className='text-xs text-gray-400'>
                            Crafted from premium quality materials, this item combines elegance with durability. Engineered for everyday functionality and lasting performance.
                        </p>
                    </div>
                </div>

                {/* related products */}
                <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />

            </div>
        </div>
    )
}

export default ProductDetail

