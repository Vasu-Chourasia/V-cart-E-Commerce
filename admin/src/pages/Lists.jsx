import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Lists() {
    const { serverUrl } = useContext(authDataContext)
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/product/list")
            setProducts(result.data)
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch products")
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(serverUrl + `/api/product/remove/${id}`, {
                withCredentials: true,
            })
            toast.success("Product deleted")
            fetchProducts() // refresh list
        } catch (error) {
            console.log(error)
            toast.error("Failed to delete product")
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
            <Nav />
            <div className='flex'>
                <Sidebar />
                <div className='ml-[210px] md:ml-[260px] mt-[90px] w-[100%] px-[30px] pb-[50px]'>
                    <h2 className='text-[28px] font-semibold mb-[30px]'>All Products</h2>

                    {/* table header */}
                    <div className='hidden md:grid grid-cols-[1fr_3fr_2fr_1fr_1fr] gap-[10px] bg-slate-700 px-[15px] py-[10px] rounded-t-lg text-[14px] font-semibold'>
                        <span>Image</span>
                        <span>Name</span>
                        <span>Category</span>
                        <span>Price</span>
                        <span>Action</span>
                    </div>

                    {/* product rows */}
                    {products.map((product) => (
                        <div key={product._id}
                            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_2fr_1fr_1fr] gap-[10px] items-center bg-[#1e3a40] px-[15px] py-[10px] border-b border-slate-600'>
                            <img src={product.image1} alt={product.name} className='w-[50px] h-[50px] object-cover rounded-md' />
                            <span className='text-[14px]'>{product.name}</span>
                            <span className='text-[14px] hidden md:block'>{product.category} / {product.subCategory}</span>
                            <span className='text-[14px] hidden md:block'>₹{product.price}</span>
                            <button
                                onClick={() => handleDelete(product._id)}
                                className='text-red-400 hover:text-red-300 text-[13px] font-semibold'
                            >
                                Delete
                            </button>
                        </div>
                    ))}

                    {products.length === 0 && (
                        <p className='text-center text-slate-400 mt-[40px]'>No products found</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Lists
