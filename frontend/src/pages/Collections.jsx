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
        <div className='w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[90px] pb-[100px] md:pb-[0px]'>
            <div className='flex gap-[20px] px-[20px]'>

                {/* sidebar filters */}
                <div className='w-[200px] hidden md:flex flex-col gap-[20px] pt-[20px]'>
                    <p className='text-white font-semibold text-[18px]'>FILTERS</p>

                    {/* category */}
                    <div>
                        <p className='text-[#56dbfc] font-semibold mb-[10px]'>CATEGORY</p>
                        {CATEGORIES.map(cat => (
                            <label key={cat} className='flex items-center gap-[8px] text-white text-[14px] mb-[6px] cursor-pointer'>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                                />
                                {cat}
                            </label>
                        ))}
                    </div>

                    {/* sub-category */}
                    <div>
                        <p className='text-[#56dbfc] font-semibold mb-[10px]'>TYPE</p>
                        {SUB_CATEGORIES.map(sub => (
                            <label key={sub} className='flex items-center gap-[8px] text-white text-[14px] mb-[6px] cursor-pointer'>
                                <input
                                    type="checkbox"
                                    checked={selectedSubCategories.includes(sub)}
                                    onChange={() => toggleFilter(sub, selectedSubCategories, setSelectedSubCategories)}
                                />
                                {sub}
                            </label>
                        ))}
                    </div>
                </div>

                {/* main content */}
                <div className='flex-1'>
                    <div className='flex items-center justify-between mb-[20px]'>
                        <Title text1={'ALL'} text2={'COLLECTIONS'} />
                        <select
                            value={sortType}
                            onChange={(e) => setSortType(e.target.value)}
                            className='bg-slate-700 text-white px-[15px] py-[8px] rounded-lg text-[14px]'
                        >
                            <option value="relevant">Relevant</option>
                            <option value="low-high">Price: Low to High</option>
                            <option value="high-low">Price: High to Low</option>
                        </select>
                    </div>

                    <div className='flex flex-wrap gap-[20px]'>
                        {filtered.map(product => (
                            <Card
                                key={product._id}
                                id={product._id}
                                image={product.image1}
                                name={product.name}
                                price={product.price}
                            />
                        ))}
                        {filtered.length === 0 && (
                            <p className='text-slate-400 mt-[40px]'>No products found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collections
