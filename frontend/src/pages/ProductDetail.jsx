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
        <div className='w-full min-h-screen bg-[#0a1520] pt-24 pb-32 py-12 px-4 md:py-24 md:px-6'>
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
                                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-[#12282e] ${mainImage === img ? 'border-[#56dbfc] shadow-[0_0_12px_rgba(86,219,252,0.4)] scale-105' : 'border-white/10 opacity-70 hover:opacity-100'}`}
                                >
                                    <img src={img} alt="" className='w-full h-full object-cover' />
                                </button>
                            ))}
                        </div>
                        {/* main image */}
                        <div className='flex-1 aspect-square sm:aspect-[4/5] bg-[#12282e]/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group'>
                            <img src={mainImage} alt={productData.name} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
                        </div>
                    </div>

                    {/* product details (7 cols in large screen) */}
                    <div className='lg:col-span-6 space-y-6 bg-[#12282e]/40 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl'>
                        <div>
                            <span className='px-3 py-1 text-[11px] font-bold tracking-widest uppercase text-[#56dbfc] bg-[#56dbfc]/10 border border-[#56dbfc]/20 rounded-full inline-block mb-3'>
                                {productData.category} / {productData.subCategory}
                            </span>
                            <h1 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
                                {productData.name}
                            </h1>
                        </div>

                        {/* rating */}
                        <div className='flex items-center gap-2 text-sm'>
                            <div className='flex items-center gap-1 text-[#FFD700]'>
                                {[...Array(4)].map((_, i) => <FaStar key={i} />)}
                                <FaStarHalfAlt />
                            </div>
                            <span className='text-slate-400 text-xs font-medium'>(124 customer reviews)</span>
                        </div>

                        {/* price */}
                        <div className='flex items-baseline gap-3 border-y border-white/10 py-4'>
                            <span className='text-3xl font-extrabold text-[#56dbfc] tracking-tight'>
                                {currency} {productData.price}
                            </span>
                            <span className='text-xs text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-400/10 rounded-md border border-emerald-400/20'>
                                In Stock
                            </span>
                        </div>

                        {/* description snippet */}
                        <p className='text-slate-300 text-sm leading-relaxed font-normal'>
                            {productData.description}
                        </p>

                        {/* size selector */}
                        {productData.sizes && productData.sizes.length > 0 && (
                            <div className='space-y-3 pt-2'>
                                <label className='text-white font-semibold text-xs uppercase tracking-wider block'>Select Size</label>
                                <div className='flex flex-wrap gap-2.5'>
                                    {productData.sizes.map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSize(s)}
                                            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all border ${s === size ? 'bg-[#56dbfc] text-slate-950 border-[#56dbfc] shadow-[0_0_15px_rgba(86,219,252,0.4)] scale-105' : 'bg-slate-800/80 text-white border-white/15 hover:border-[#56dbfc]/50'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* add to cart action button */}
                        <button
                            onClick={() => addtoCart(productData._id, size)}
                            className='w-full sm:w-auto px-6 py-3 bg-[#56dbfc] text-slate-950 font-bold text-sm rounded-lg hover:bg-[#7be2fc] active:scale-95 transition-all shadow-[0_0_20px_rgba(86,219,252,0.3)] flex items-center justify-center gap-2 mt-4'
                            style={{ padding: '12px 24px', borderRadius: '8px' }}
                        >
                            {loading ? <Loading /> : "Add to Shopping Cart"}
                        </button>


                        {/* guarantees */}
                        <div className='space-y-2 border-t border-white/10 pt-4 text-xs text-slate-300 font-medium'>
                            <p className='flex items-center gap-2'>
                                <span className='text-[#56dbfc] font-bold'>✓</span> 100% Guaranteed Original Product
                            </p>
                            <p className='flex items-center gap-2'>
                                <span className='text-[#56dbfc] font-bold'>✓</span> Cash on delivery available
                            </p>
                            <p className='flex items-center gap-2'>
                                <span className='text-[#56dbfc] font-bold'>✓</span> Easy return and exchange within 7 days
                            </p>
                        </div>

                    </div>

                </div>

                {/* extra details tab */}
                <div className='bg-[#12282e]/60 border border-white/10 rounded-2xl overflow-hidden shadow-lg backdrop-blur-md'>
                    <div className='flex border-b border-white/10 bg-[#0c2025]/60'>
                        <button className='px-6 py-3.5 text-xs font-bold tracking-wider text-[#56dbfc] border-b-2 border-[#56dbfc] bg-white/5'>
                            DESCRIPTION
                        </button>
                        <button className='px-6 py-3.5 text-xs font-bold tracking-wider text-slate-400 hover:text-white transition-colors'>
                            REVIEWS (124)
                        </button>
                    </div>
                    <div className='p-6 sm:p-8 text-slate-300 text-sm leading-relaxed space-y-3'>
                        <p>{productData.description}</p>
                        <p className='text-xs text-slate-400'>
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

