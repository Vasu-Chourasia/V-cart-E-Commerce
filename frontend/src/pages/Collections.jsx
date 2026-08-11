import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'
import Title from '../component/Title'

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
        <div className='w-full min-h-screen bg-gradient-to-br from-[#141414] via-[#0c2025] to-[#0c2025] pt-24 pb-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                
                <div className='flex flex-col md:flex-row gap-8 items-start'>

                    {/* sidebar filters */}
                    <aside className='w-full md:w-64 flex-shrink-0 bg-[#12282e]/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg space-y-6'>
                        <div className='flex items-center justify-between border-b border-white/10 pb-3'>
                            <h3 className='text-white font-bold text-base tracking-wider'>FILTERS</h3>
                            {(selectedCategories.length > 0 || selectedSubCategories.length > 0) && (
                                <button 
                                    onClick={() => { setSelectedCategories([]); setSelectedSubCategories([]) }}
                                    className='text-xs text-[#56dbfc] hover:underline'
                                >
                                    Clear all
                                </button>
                            )}
                        </div>

                        {/* category */}
                        <div className='space-y-3'>
                            <h4 className='text-[#56dbfc] font-semibold text-xs uppercase tracking-wider'>Category</h4>
                            <div className='space-y-2'>
                                {CATEGORIES.map(cat => (
                                    <label key={cat} className='flex items-center gap-2.5 text-slate-200 text-sm cursor-pointer hover:text-white transition-colors group'>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                                            className='w-4 h-4 rounded border-white/20 bg-slate-800 text-[#56dbfc] focus:ring-[#56dbfc] focus:ring-offset-slate-900 cursor-pointer accent-[#56dbfc]'
                                        />
                                        <span className='group-hover:translate-x-0.5 transition-transform'>{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* sub-category */}
                        <div className='space-y-3 border-t border-white/10 pt-4'>
                            <h4 className='text-[#56dbfc] font-semibold text-xs uppercase tracking-wider'>Type</h4>
                            <div className='space-y-2'>
                                {SUB_CATEGORIES.map(sub => (
                                    <label key={sub} className='flex items-center gap-2.5 text-slate-200 text-sm cursor-pointer hover:text-white transition-colors group'>
                                        <input
                                            type="checkbox"
                                            checked={selectedSubCategories.includes(sub)}
                                            onChange={() => toggleFilter(sub, selectedSubCategories, setSelectedSubCategories)}
                                            className='w-4 h-4 rounded border-white/20 bg-slate-800 text-[#56dbfc] focus:ring-[#56dbfc] focus:ring-offset-slate-900 cursor-pointer accent-[#56dbfc]'
                                        />
                                        <span className='group-hover:translate-x-0.5 transition-transform'>{sub}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* main products content */}
                    <main className='flex-1 w-full space-y-6'>
                        
                        {/* top bar */}
                        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4'>
                            <Title text1={'ALL'} text2={'COLLECTIONS'} subtext={`Showing ${filtered.length} products`} />
                            
                            <div className='flex items-center gap-3 self-end sm:self-auto'>
                                <span className='text-xs text-slate-400 font-medium'>Sort by:</span>
                                <select
                                    value={sortType}
                                    onChange={(e) => setSortType(e.target.value)}
                                    className='bg-[#12282e] border border-white/15 text-white px-4 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#56dbfc] transition-all cursor-pointer'
                                >
                                    <option value="relevant">Relevant</option>
                                    <option value="low-high">Price: Low to High</option>
                                    <option value="high-low">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* product grid */}
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
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

                        {filtered.length === 0 && (
                            <div className='w-full py-20 flex flex-col items-center justify-center text-center bg-[#12282e]/40 border border-white/10 rounded-2xl p-8 space-y-3'>
                                <p className='text-lg font-semibold text-slate-200'>No products found</p>
                                <p className='text-xs text-slate-400'>Try adjusting your filters or search query to discover products.</p>
                                <button 
                                    onClick={() => { setSelectedCategories([]); setSelectedSubCategories([]) }}
                                    className='px-4 py-2 bg-[#56dbfc] text-slate-950 text-xs font-bold rounded-lg hover:bg-[#7be2fc] transition-all'
                                >
                                    Reset Filters
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

