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

    const thumbs = [productData.image1, productData.image2, productData.image3, productData.image4]

    return (
        <div>
            {/* product info section */}
            <div className='w-full min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col lg:flex-row gap-[20px] pt-[80px]'>

                {/* image gallery */}
                <div className='lg:w-[50vw] w-[90vw] flex items-center justify-center gap-[10px] flex-col-reverse lg:flex-row'>
                    {/* thumbnails */}
                    <div className='lg:w-[20%] w-[80%] flex lg:flex-col gap-[10px] flex-wrap justify-center'>
                        {thumbs.map((img, i) => (
                            <div key={i} className='w-[60px] h-[60px] md:w-[90px] md:h-[90px] rounded-md overflow-hidden border border-[#80808049] cursor-pointer'
                                onClick={() => setMainImage(img)}>
                                <img src={img} alt="" className='w-full h-full object-cover' />
                            </div>
                        ))}
                    </div>
                    {/* main image */}
                    <div className='lg:w-[70%] w-[100%] h-[350px] lg:h-[500px] border border-[#80808049] rounded-md overflow-hidden'>
                        <img src={mainImage} alt={productData.name} className='w-full h-full object-cover' />
                    </div>
                </div>

                {/* product details */}
                <div className='lg:w-[50vw] w-[90vw] flex flex-col gap-[12px] pb-[30px] lg:pb-[0px]'>
                    <h1 className='text-[36px] font-semibold text-white'>{productData.name.toUpperCase()}</h1>

                    {/* star rating */}
                    <div className='flex items-center gap-1'>
                        {[...Array(4)].map((_, i) => <FaStar key={i} className='text-[#FFD700] text-[18px]' />)}
                        <FaStarHalfAlt className='text-[#FFD700] text-[18px]' />
                        <p className='text-white pl-[5px]'>(124)</p>
                    </div>

                    <p className='text-[28px] font-semibold text-white'>{currency} {productData.price}</p>
                    <p className='text-white text-[15px] w-[80%]'>{productData.description}</p>

                    {/* size selector */}
                    <div className='flex flex-col gap-[10px]'>
                        <p className='text-white font-semibold text-[18px]'>Select Size</p>
                        <div className='flex gap-[8px] flex-wrap'>
                            {productData.sizes.map((s, i) => (
                                <button key={i}
                                    onClick={() => setSize(s)}
                                    className={`px-[16px] py-[8px] rounded-md border transition-all ${s === size ? 'bg-[#56dbfc] text-black border-[#56dbfc]' : 'bg-slate-700 text-white border-slate-500'}`}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => addtoCart(productData._id, size)}
                        className='w-[200px] h-[50px] flex items-center justify-center bg-[#495b61c9] text-white rounded-2xl border border-[#80808049] mt-[10px] hover:bg-slate-600'
                    >
                        {loading ? <Loading /> : "Add to Cart"}
                    </button>

                    <div className='w-[80%] h-[1px] bg-slate-700 my-[5px]'></div>
                    <div className='text-white text-[14px] flex flex-col gap-[4px]'>
                        <p>✓ 100% Original Product</p>
                        <p>✓ Cash on delivery available</p>
                        <p>✓ Easy return and exchange within 7 days</p>
                    </div>
                </div>
            </div>

            {/* description + related products */}
            <div className='w-[100%] min-h-[50vh] bg-gradient-to-l from-[#141414] to-[#0c2025]'>
                <div className='flex px-[20px] pt-[30px]'>
                    <p className='border px-5 py-3 text-sm text-white bg-[#3336397c]'>Description</p>
                    <p className='border px-5 py-3 text-sm text-white'>Reviews (124)</p>
                </div>
                <div className='mx-[20px] lg:mx-[100px] my-[20px] p-[20px] bg-[#3336397c] border text-white text-[14px] lg:text-[16px] rounded-md'>
                    {productData.description} — Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting.
                </div>
                <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
            </div>
        </div>
    )
}

export default ProductDetail
