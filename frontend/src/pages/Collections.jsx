import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'
import Title from '../component/Title'
import { HiOutlineSearch } from 'react-icons/hi'


const CATEGORIES = ["Men", "Women", "Kids"]
const SUB_CATEGORIES = ["TopWear", "BottomWear", "WinterWear"]

function Collections() {
    const { products, search, showSearch } = useContext(shopDataContext)

    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedSubCategories, setSelectedSubCategories] = useState([])
    const [sortType, setSortType] = useState("relevant")
    const [filtered, setFiltered] = useState([])

    const toggleFilter = (value, list, setList) => {
        setList(prev =>
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        )
    }

    // apply filters, search, and sort whenever dependencies change
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

        // sort
        if (sortType === "low-high") result.sort((a, b) => a.price - b.price)
        else if (sortType === "high-low") result.sort((a, b) => b.price - a.price)

        setFiltered(result)
    }, [products, search, showSearch, selectedCategories, selectedSubCategories, sortType])

    return (
        <div className='w-full min-h-screen bg-white pt-24 pb-32 py-12 px-4 md:py-24 md:px-6 text-charcoal'>
            <div className='max-w-7xl mx-auto space-y-10'>
                
                <div className='flex flex-col md:flex-row gap-8 items-start'>

                    {/* sidebar filter card container */}
                    <aside 
                        className='w-full md:w-64 flex-shrink-0 bg-gray-surface border border-gray-200 rounded-2xl shadow-sm space-y-6'
                        style={{ padding: '24px' }}
                    >
                        <div className='flex items-center justify-between border-b border-gray-200 pb-4'>
                            <h3 className='text-charcoal font-extrabold text-sm tracking-wider uppercase flex items-center gap-2'>
                                <span className='w-2 h-2 rounded-full bg-teal'></span>
                                Filters
                            </h3>
                            {(selectedCategories.length > 0 || selectedSubCategories.length > 0) && (
                                <button 
                                    onClick={() => { setSelectedCategories([]); setSelectedSubCategories([]) }}
                                    className='text-xs text-teal hover:underline font-semibold'
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                        {/* category section */}
                        <div className='space-y-4'>
                            <h4 className='text-teal font-extrabold text-xs uppercase tracking-wider'>Category</h4>
                            <div className='space-y-3'>
                                {CATEGORIES.map(cat => (
                                    <label key={cat} className='flex items-center gap-3 text-gray-700 text-sm cursor-pointer hover:text-charcoal transition-colors group select-none'>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                                            className='w-4 h-4 rounded border-gray-300 bg-white text-navy focus:ring-navy cursor-pointer accent-navy'
                                        />
                                        <span className='group-hover:translate-x-0.5 transition-transform font-medium'>{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* sub-category section */}
                        <div className='space-y-4 border-t border-gray-200 pt-5'>
                            <h4 className='text-teal font-extrabold text-xs uppercase tracking-wider'>Type</h4>
                            <div className='space-y-3'>
                                {SUB_CATEGORIES.map(sub => (
                                    <label key={sub} className='flex items-center gap-3 text-gray-700 text-sm cursor-pointer hover:text-charcoal transition-colors group select-none'>
                                        <input
                                            type="checkbox"
                                            checked={selectedSubCategories.includes(sub)}
                                            onChange={() => toggleFilter(sub, selectedSubCategories, setSelectedSubCategories)}
                                            className='w-4 h-4 rounded border-gray-300 bg-white text-navy focus:ring-navy cursor-pointer accent-navy'
                                        />
                                        <span className='group-hover:translate-x-0.5 transition-transform font-medium'>{sub}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* main products content */}
                    <main className='flex-1 w-full space-y-8'>
                        
                        {/* top bar */}
                        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6'>
                            <Title text1={'ALL'} text2={'COLLECTIONS'} subtext={`Showing ${filtered.length} products`} />
                            
                            <div className='flex items-center gap-3 self-end sm:self-auto'>
                                <span className='text-xs text-gray-500 font-medium'>Sort by:</span>
                                <select
                                    value={sortType}
                                    onChange={(e) => setSortType(e.target.value)}
                                    className='bg-white border border-gray-300 text-charcoal px-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal transition-all cursor-pointer shadow-sm'
                                >
                                    <option value="relevant">Relevant</option>
                                    <option value="low-high">Price: Low to High</option>
                                    <option value="high-low">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* product grid */}
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {filtered.map(product => (
                                <Card
                                    key={product._id}
                                    id={product._id}
                                    image={product.image1}
                                    name={product.name}
                                    price={product.price}
                                />
                            ))}
                        </div>

                        {/* empty state container */}
                        {filtered.length === 0 && (
                            <div className='w-full min-h-[400px] flex flex-col items-center justify-center text-center bg-gray-surface border border-gray-200 rounded-2xl p-8 md:p-12 gap-6 shadow-sm'>
                                <div className='w-16 h-16 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center text-navy'>
                                    <HiOutlineSearch className='w-8 h-8' />
                                </div>

                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-charcoal tracking-tight'>No products matching your criteria</h3>
                                    <p className='text-sm text-gray-600 max-w-md leading-relaxed'>
                                        We couldn't find any items matching your current filters or search parameters. Try clearing your filters or searching for something else.
                                    </p>
                                </div>

                                <button 
                                    onClick={() => { setSelectedCategories([]); setSelectedSubCategories([]) }}
                                    className='bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy-hover transition-all shadow-md shadow-navy/20'
                                    style={{ padding: '14px 32px', borderRadius: '8px', fontWeight: 600 }}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}

                    </main>

                </div>

            </div>
        </div>
    )
}

export default Collections



