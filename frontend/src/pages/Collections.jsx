import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'
import Nav from '../component/Nav'
import Footer from '../component/Footer'

const CATEGORIES = ["Men", "Women", "Kids"]
const SUB_CATEGORIES = ["TopWear", "BottomWear", "WinterWear"]
const ITEMS_PER_PAGE = 12

function Collections() {
    const { products, search, showSearch, currency } = useContext(shopDataContext)

    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedSubCategories, setSelectedSubCategories] = useState([])
    const [sortType, setSortType] = useState("relevant")
    const [maxPrice, setMaxPrice] = useState(3000)
    const [currentPage, setCurrentPage] = useState(1)
    const [showMobileFilter, setShowMobileFilter] = useState(false)
    const [filtered, setFiltered] = useState([])

    const toggleFilter = (value, list, setList) => {
        setList(prev =>
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        )
        setCurrentPage(1)
    }

    const clearAllFilters = () => {
        setSelectedCategories([])
        setSelectedSubCategories([])
        setMaxPrice(3000)
        setCurrentPage(1)
    }

    useEffect(() => {
        let result = [...products]

        // search filter
        if (showSearch && search) {
            result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        }

        // category filter
        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category))
        }

        // sub-category filter
        if (selectedSubCategories.length > 0) {
            result = result.filter(p => selectedSubCategories.includes(p.subCategory))
        }

        // price range filter
        result = result.filter(p => p.price <= maxPrice)

        // sort options
        if (sortType === "low-high") {
            result.sort((a, b) => a.price - b.price)
        } else if (sortType === "high-low") {
            result.sort((a, b) => b.price - a.price)
        } else if (sortType === "newest") {
            result.sort((a, b) => (b.date || 0) - (a.date || 0))
        }

        setFiltered(result)
    }, [products, search, showSearch, selectedCategories, selectedSubCategories, sortType, maxPrice])

    // pagination slicing
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1
    const paginatedProducts = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    return (
        <div className="bg-surface-container-lowest min-h-screen flex flex-col justify-between antialiased text-on-surface">

            <main className="flex-grow w-full max-w-container-max mx-auto px-md md:px-gutter py-xl">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl border-b border-surface-dim pb-md gap-md">
                    <div>
                        <h1 className="text-display-lg-mobile md:text-display-lg mb-xs font-bold text-primary">
                            Collections
                        </h1>
                        <p className="text-on-surface-variant text-body-md">
                            Showing {filtered.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} - {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} products
                        </p>
                    </div>

                    <div className="flex items-center space-x-md w-full md:w-auto justify-between md:justify-end">
                        <button
                            onClick={() => setShowMobileFilter(p => !p)}
                            className="md:hidden flex items-center space-x-xs border border-outline-variant rounded-lg px-md py-sm text-body-md hover:bg-surface-container-low cursor-pointer"
                        >
                            <span className="material-symbols-outlined">filter_list</span>
                            <span>Filters</span>
                        </button>

                        <div className="relative">
                            <select
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
                                className="appearance-none bg-surface border border-outline-variant rounded-lg pl-md pr-xl py-sm text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer text-on-surface"
                            >
                                <option value="relevant">Sort by: Featured</option>
                                <option value="low-high">Price: Low to High</option>
                                <option value="high-low">Price: High to Low</option>
                                <option value="newest">Newest Arrivals</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-md top-1/2 transform -translate-y-1/2 pointer-events-none text-outline">
                                expand_more
                            </span>
                        </div>
                    </div>
                </div>

                {/* Active Filter Chips Bar */}
                {(selectedCategories.length > 0 || selectedSubCategories.length > 0 || maxPrice < 3000) && (
                    <div className="flex flex-wrap items-center gap-sm mb-lg bg-surface-container-low p-sm rounded-lg">
                        <span className="text-label-caps text-on-surface-variant uppercase mr-xs">Active Filters:</span>
                        {selectedCategories.map(cat => (
                            <span key={cat} className="inline-flex items-center gap-xs px-sm py-xs bg-surface-container-lowest border border-outline-variant rounded-full text-label-caps text-on-surface">
                                {cat}
                                <button onClick={() => toggleFilter(cat, selectedCategories, setSelectedCategories)} className="hover:text-error cursor-pointer">✕</button>
                            </span>
                        ))}
                        {selectedSubCategories.map(sub => (
                            <span key={sub} className="inline-flex items-center gap-xs px-sm py-xs bg-surface-container-lowest border border-outline-variant rounded-full text-label-caps text-on-surface">
                                {sub}
                                <button onClick={() => toggleFilter(sub, selectedSubCategories, setSelectedSubCategories)} className="hover:text-error cursor-pointer">✕</button>
                            </span>
                        ))}
                        {maxPrice < 3000 && (
                            <span className="inline-flex items-center gap-xs px-sm py-xs bg-surface-container-lowest border border-outline-variant rounded-full text-label-caps text-on-surface">
                                Under {currency}{maxPrice}
                                <button onClick={() => setMaxPrice(3000)} className="hover:text-error cursor-pointer">✕</button>
                            </span>
                        )}
                        <button onClick={clearAllFilters} className="text-label-caps text-secondary font-bold hover:underline cursor-pointer ml-xs">
                            Clear All
                        </button>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-lg">
                    
                    {/* Left Sidebar Filters */}
                    <aside className={`${showMobileFilter ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0 space-y-lg pr-md border-r border-surface-dim`}>
                        {/* Category Filter */}
                        <div className="border-b border-surface-dim pb-lg">
                            <h3 className="text-headline-md font-semibold mb-md text-primary-container">Category</h3>
                            <div className="space-y-sm">
                                {CATEGORIES.map(cat => (
                                    <label key={cat} className="flex items-center space-x-sm cursor-pointer text-body-md text-on-surface">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                                            className="rounded border-outline-variant text-secondary focus:ring-secondary accent-secondary w-4 h-4 cursor-pointer"
                                        />
                                        <span>{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* SubCategory Filter */}
                        <div className="border-b border-surface-dim pb-lg">
                            <h3 className="text-headline-md font-semibold mb-md text-primary-container">Type</h3>
                            <div className="space-y-sm">
                                {SUB_CATEGORIES.map(sub => (
                                    <label key={sub} className="flex items-center space-x-sm cursor-pointer text-body-md text-on-surface">
                                        <input
                                            type="checkbox"
                                            checked={selectedSubCategories.includes(sub)}
                                            onChange={() => toggleFilter(sub, selectedSubCategories, setSelectedSubCategories)}
                                            className="rounded border-outline-variant text-secondary focus:ring-secondary accent-secondary w-4 h-4 cursor-pointer"
                                        />
                                        <span>{sub}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range Slider */}
                        <div className="pb-lg">
                            <div className="flex justify-between items-center mb-sm">
                                <h3 className="text-headline-md font-semibold text-primary-container">Max Price</h3>
                                <span className="text-body-md font-bold text-secondary">{currency}{maxPrice}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="3000"
                                step="50"
                                value={maxPrice}
                                onChange={(e) => { setMaxPrice(Number(e.target.value)); setCurrentPage(1); }}
                                className="w-full accent-secondary cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-on-surface-variant mt-xs">
                                <span>{currency}0</span>
                                <span>{currency}3000+</span>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid Section */}
                    <div className="flex-1">
                        {paginatedProducts.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-md">
                                {paginatedProducts.map(product => (
                                    <Card
                                        key={product._id}
                                        id={product._id}
                                        image={product.image1}
                                        name={product.name}
                                        price={product.price}
                                        sizes={product.sizes}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="w-full min-h-[350px] flex flex-col items-center justify-center text-center bg-surface-container-low border border-outline-variant/30 rounded-xl p-xl gap-md">
                                <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
                                <h3 className="text-headline-md font-bold text-on-surface">No matching products found</h3>
                                <p className="text-body-md text-on-surface-variant max-w-md">
                                    Try adjusting your category, price range, or search criteria.
                                </p>
                                <button
                                    onClick={clearAllFilters}
                                    className="bg-primary text-on-primary rounded text-label-caps uppercase px-lg py-md hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}

                        {/* Numbered Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-xs mt-xl">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => p - 1)}
                                    className="px-md py-sm border border-outline-variant rounded text-label-caps uppercase hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    Prev
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-9 h-9 rounded text-label-caps font-bold transition-all cursor-pointer ${page === currentPage ? 'bg-primary text-on-primary shadow-sm' : 'border border-outline-variant hover:bg-surface-container-low text-on-surface'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                    className="px-md py-sm border border-outline-variant rounded text-label-caps uppercase hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>

                </div>

            </main>

            <Footer />
        </div>
    )
}

export default Collections
