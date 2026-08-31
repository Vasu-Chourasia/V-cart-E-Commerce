import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import RelatedProduct from '../component/RelatedProduct'
import Nav from '../component/Nav'
import Footer from '../component/Footer'
import { toast } from 'react-toastify'

const ALL_SIZES = ["S", "M", "L", "XL", "XXL"]

function ProductDetail() {
    const { productId } = useParams()
    const { products, currency, addToCart } = useContext(shopDataContext)

    const [productData, setProductData] = useState(null)
    const [mainImage, setMainImage] = useState('')
    const [size, setSize] = useState('')

    useEffect(() => {
        const found = products.find(p => p._id === productId)
        if (found) {
            setProductData(found)
            setMainImage(found.image1)
            setSize('')
        }
    }, [productId, products])

    if (!productData) {
        return (
            <div className="bg-surface-container-lowest min-h-screen flex flex-col justify-between">
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-body-md text-on-surface-variant">Loading product details...</p>
                </div>
                <Footer />
            </div>
        )
    }

    const thumbs = [productData.image1, productData.image2, productData.image3, productData.image4].filter(Boolean)
    const availableSizes = productData.sizes || []

    const handleAddToCart = () => {
        if (!size) {
            toast.error("Please select a size first")
            return
        }
        addToCart(productData._id, size)
        toast.success(`Added ${productData.name} (${size}) to cart!`)
    }

    return (
        <div className="bg-surface-container-lowest min-h-screen flex flex-col justify-between antialiased text-on-surface">

            <main className="flex-grow pt-xl pb-xl px-gutter max-w-container-max mx-auto w-full">
                
                {/* Product Detail Section */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-lg lg:gap-xl mb-xl">
                    
                    {/* Left Column: Image Gallery */}
                    <div className="lg:col-span-7 flex flex-col md:flex-row gap-md">
                        {/* Thumbnails list */}
                        <div className="flex md:flex-col gap-sm overflow-x-auto md:overflow-visible order-2 md:order-1 w-full md:w-24 shrink-0">
                            {thumbs.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMainImage(img)}
                                    className={`w-20 h-24 md:w-24 md:h-32 border rounded overflow-hidden flex-shrink-0 transition-colors cursor-pointer ${mainImage === img ? 'border-secondary' : 'border-outline-variant opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Display Image */}
                        <div className="order-1 md:order-2 flex-grow aspect-[3/4] md:aspect-auto md:h-[600px] bg-surface-container rounded border border-outline-variant shadow-sm overflow-hidden relative">
                            <img src={mainImage} alt={productData.name} className="w-full h-full object-cover" />
                            {productData.bestseller ? (
                                <div className="absolute top-md left-md bg-secondary text-on-secondary px-sm py-xs rounded text-label-caps uppercase tracking-wider font-bold">
                                    Bestseller
                                </div>
                            ) : (
                                <div className="absolute top-md left-md bg-primary text-on-primary px-sm py-xs rounded text-label-caps uppercase tracking-wider font-bold">
                                    New Arrival
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="lg:col-span-5 flex flex-col pt-md lg:pt-0">
                        {/* Breadcrumbs */}
                        <nav className="flex text-on-surface-variant text-label-caps mb-md space-x-2">
                            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <Link to="/collection" className="hover:text-primary transition-colors">{productData.category}</Link>
                            <span>/</span>
                            <span className="text-on-surface font-semibold">{productData.subCategory}</span>
                        </nav>

                        <h1 className="text-display-lg-mobile md:text-display-lg font-bold text-on-surface mb-xs">
                            {productData.name}
                        </h1>

                        <p className="text-headline-md font-bold text-surface-tint mb-lg">
                            {currency} {productData.price}
                        </p>

                        <p className="text-body-md text-on-surface-variant mb-xl leading-relaxed">
                            {productData.description}
                        </p>

                        {/* Size Selector */}
                        <div className="mb-lg">
                            <div className="flex justify-between items-end mb-sm">
                                <span className="text-label-caps text-on-surface font-bold">Select Size</span>
                                <button
                                    type="button"
                                    onClick={() => toast.info("Size Guide coming soon!")}
                                    className="text-label-caps text-secondary underline hover:text-on-secondary-container cursor-pointer"
                                >
                                    Size Guide
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-sm">
                                {ALL_SIZES.map((s) => {
                                    const isAvailable = availableSizes.includes(s)
                                    const isSelected = size === s

                                    if (!isAvailable) {
                                        return (
                                            <button
                                                key={s}
                                                disabled
                                                className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-body-md text-surface-variant cursor-not-allowed opacity-50"
                                            >
                                                {s}
                                            </button>
                                        )
                                    }

                                    return (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setSize(s)}
                                            className={`w-12 h-12 rounded-full border flex items-center justify-center text-body-md transition-all cursor-pointer ${
                                                isSelected
                                                    ? 'border-2 border-primary bg-primary text-on-primary font-bold shadow-sm'
                                                    : 'border-outline-variant text-on-surface hover:border-secondary hover:text-secondary'
                                            }`}
                                        >
                                            {s}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Add to Cart CTA */}
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="w-full bg-primary hover:bg-primary/90 text-on-primary py-md rounded transition-colors duration-200 text-body-lg font-semibold shadow-md active:scale-[0.98] flex items-center justify-center gap-sm cursor-pointer"
                        >
                            <span className="material-symbols-outlined">shopping_bag</span>
                            Add to Cart
                        </button>

                        <div className="mt-lg flex items-center gap-sm text-on-surface-variant text-label-caps bg-surface-container-low p-sm rounded">
                            <span className="material-symbols-outlined text-secondary">verified_user</span>
                            Secure Checkout & Free Returns within 30 days.
                        </div>
                    </div>

                </section>

                {/* Related Products */}
                <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />

            </main>

            <Footer />
        </div>
    )
}

export default ProductDetail
