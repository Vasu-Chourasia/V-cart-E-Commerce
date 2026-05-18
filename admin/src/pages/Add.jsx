import React, { useContext, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Add() {
    const { serverUrl } = useContext(authDataContext)
    const [loading, setLoading] = useState(false)

    // image preview states
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [image4, setImage4] = useState(null)

    // product fields
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Men")
    const [subCategory, setSubCategory] = useState("TopWear")
    const [bestseller, setBestseller] = useState(false)
    const [sizes, setSizes] = useState([])

    const allSizes = ["S", "M", "L", "XL", "XXL"]

    // toggle a size on/off
    const toggleSize = (size) => {
        setSizes((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!image1 || !image2 || !image3 || !image4) {
            toast.error("Please upload all 4 images")
            return
        }
        if (sizes.length === 0) {
            toast.error("Please select at least one size")
            return
        }

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("sizes", JSON.stringify(sizes))
            formData.append("bestseller", bestseller)
            formData.append("image1", image1)
            formData.append("image2", image2)
            formData.append("image3", image3)
            formData.append("image4", image4)

            await axios.post(serverUrl + "/api/product/addproduct", formData, {
                withCredentials: true,
            })

            toast.success("Product added successfully")

            // reset form
            setName(""); setDescription(""); setPrice("")
            setCategory("Men"); setSubCategory("TopWear")
            setBestseller(false); setSizes([])
            setImage1(null); setImage2(null); setImage3(null); setImage4(null)
        } catch (error) {
            console.log(error)
            toast.error("Failed to add product")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
            <Nav />
            <div className='flex'>
                <Sidebar />
                <div className='ml-[210px] md:ml-[260px] mt-[90px] w-[100%] px-[30px] pb-[50px]'>
                    <h2 className='text-[28px] font-semibold mb-[30px]'>Add New Product</h2>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-[20px] max-w-[700px]'>

                        {/* image uploads */}
                        <div>
                            <p className='mb-[10px] text-[16px]'>Upload Images (4 required)</p>
                            <div className='flex gap-[15px] flex-wrap'>
                                {[
                                    { state: image1, setter: setImage1, label: "Image 1" },
                                    { state: image2, setter: setImage2, label: "Image 2" },
                                    { state: image3, setter: setImage3, label: "Image 3" },
                                    { state: image4, setter: setImage4, label: "Image 4" },
                                ].map(({ state, setter, label }) => (
                                    <label key={label} className='w-[120px] h-[120px] border-[2px] border-dashed border-[#96969635] rounded-lg flex items-center justify-center cursor-pointer overflow-hidden'>
                                        {state
                                            ? <img src={URL.createObjectURL(state)} alt="" className='w-full h-full object-cover' />
                                            : <span className='text-[12px] text-center px-[5px]'>{label}</span>
                                        }
                                        <input type="file" accept="image/*" className='hidden' onChange={(e) => setter(e.target.files[0])} />
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* name */}
                        <input
                            type="text" placeholder='Product name' required
                            className='w-[100%] h-[50px] bg-slate-700 rounded-lg px-[20px] placeholder:text-white'
                            value={name} onChange={(e) => setName(e.target.value)}
                        />

                        {/* description */}
                        <textarea
                            placeholder='Product description' required rows={3}
                            className='w-[100%] bg-slate-700 rounded-lg px-[20px] py-[10px] placeholder:text-white resize-none'
                            value={description} onChange={(e) => setDescription(e.target.value)}
                        />

                        {/* price */}
                        <input
                            type="number" placeholder='Price (₹)' required min="0"
                            className='w-[100%] h-[50px] bg-slate-700 rounded-lg px-[20px] placeholder:text-white'
                            value={price} onChange={(e) => setPrice(e.target.value)}
                        />

                        {/* category + subCategory */}
                        <div className='flex gap-[20px]'>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}
                                className='w-[50%] h-[50px] bg-slate-700 rounded-lg px-[15px]'>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                            </select>
                            <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}
                                className='w-[50%] h-[50px] bg-slate-700 rounded-lg px-[15px]'>
                                <option value="TopWear">TopWear</option>
                                <option value="BottomWear">BottomWear</option>
                                <option value="WinterWear">WinterWear</option>
                            </select>
                        </div>

                        {/* sizes */}
                        <div>
                            <p className='mb-[10px]'>Select Sizes</p>
                            <div className='flex gap-[10px]'>
                                {allSizes.map((size) => (
                                    <button
                                        key={size} type='button'
                                        onClick={() => toggleSize(size)}
                                        className={`px-[15px] py-[8px] rounded-md border ${sizes.includes(size) ? 'bg-[#6060f5] border-[#6060f5]' : 'bg-slate-700 border-slate-500'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* bestseller */}
                        <label className='flex items-center gap-[10px] cursor-pointer'>
                            <input type="checkbox" checked={bestseller} onChange={(e) => setBestseller(e.target.checked)} className='w-[18px] h-[18px]' />
                            <span>Mark as Bestseller</span>
                        </label>

                        <button type='submit'
                            className='w-[200px] h-[50px] bg-[#6060f5] rounded-lg text-[17px] font-semibold flex items-center justify-center'>
                            {loading ? <Loading /> : "Add Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Add
