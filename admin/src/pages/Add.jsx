import React, { useContext, useState } from "react"
import Nav from "../component/Nav"
import Sidebar from "../component/Sidebar"
import { authDataContext } from "../context/AuthContext"
import axios from "axios"
import { toast } from "react-toastify"

function Add() {
    const { serverUrl } = useContext(authDataContext)

    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [image4, setImage4] = useState(null)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Men")
    const [subCategory, setSubCategory] = useState("TopWear")
    const [bestseller, setBestseller] = useState(false)
    const [sizes, setSizes] = useState([])
    const [loading, setLoading] = useState(false)

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
            setName("")
            setDescription("")
            setPrice("")
            setCategory("Men")
            setSubCategory("TopWear")
            setBestseller(false)
            setSizes([])
            setImage1(null)
            setImage2(null)
            setImage3(null)
            setImage4(null)
        } catch (error) {
            console.log("addProduct error", error)
            toast.error(error?.response?.data?.message || "Failed to add product")
        } finally {
            setLoading(false)
        }
    }

    const imageSlots = [
        { state: image1, setter: setImage1, label: "Primary", id: "img-slot-1" },
        { state: image2, setter: setImage2, label: "Detail", id: "img-slot-2" },
        { state: image3, setter: setImage3, label: "Detail", id: "img-slot-3" },
        { state: image4, setter: setImage4, label: "Detail", id: "img-slot-4" },
    ]

    const filledCount = imageSlots.filter((slot) => slot.state !== null).length

    return (
        <div className="pl-64 min-h-screen flex flex-col bg-background font-body-md text-body-md text-on-surface">
            <Nav />
            <Sidebar />
            <main className="w-full pt-16 bg-background flex-1">
                <div className="flex flex-col w-full px-lg py-xl max-w-[1140px] mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-xl">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-xs text-secondary mb-xs">
                                <span className="material-symbols-outlined text-[16px]">verified</span>
                                <span className="font-label-caps text-label-caps tracking-wider uppercase">
                                    Catalog Management
                                </span>
                            </div>
                            <h1 className="font-headline-md text-headline-md text-primary tracking-tight font-bold">
                                Add New Product
                            </h1>
                            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
                                Create and publish a new item to the store catalog.
                            </p>
                        </div>
                        <div className="flex items-center gap-sm self-start md:self-auto">
                            <span className="font-label-caps text-label-caps uppercase text-on-surface-variant bg-surface-container px-md py-sm rounded-lg flex items-center gap-xs border border-outline-variant/20">
                                <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
                                Direct Publish Mode
                            </span>
                        </div>
                    </div>

                    {/* Form Container */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-xl">
                        <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,23,59,0.04)] p-xl flex flex-col gap-xl border border-outline-variant/10">
                            {/* 1. Image Upload Section */}
                            <div className="flex flex-col gap-sm">
                                <div className="flex items-center justify-between">
                                    <label className="font-label-caps text-label-caps uppercase text-primary tracking-wide">
                                        Product Images (Upload up to 4 images)
                                    </label>
                                    <span className="font-label-caps text-label-caps text-secondary font-semibold">
                                        {filledCount} of 4 Filled
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-md pt-xs">
                                    {imageSlots.map(({ state, setter, label, id }, idx) =>
                                        state ? (
                                            <label
                                                key={id}
                                                className="relative group aspect-square rounded-lg overflow-hidden bg-surface-container shadow-sm flex items-center justify-center cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 border border-outline-variant/20"
                                            >
                                                <img
                                                    src={URL.createObjectURL(state)}
                                                    alt={`Uploaded ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                    <span className="material-symbols-outlined text-on-primary bg-primary/80 p-sm rounded-lg text-[20px]">
                                                        swap_horiz
                                                    </span>
                                                </div>
                                                <div className="absolute top-2 right-2 bg-secondary text-on-secondary rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                                                    <span className="material-symbols-outlined text-[14px]">check</span>
                                                </div>
                                                <span
                                                    className={`absolute bottom-2 left-2 ${
                                                        idx === 0
                                                            ? "bg-primary/80 text-on-primary"
                                                            : "bg-surface-container-lowest/90 text-primary"
                                                    } backdrop-blur-sm font-label-caps text-label-caps px-sm py-[2px] rounded`}
                                                >
                                                    {label}
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="sr-only"
                                                    onChange={(e) => {
                                                        if (e.target.files?.[0]) setter(e.target.files[0])
                                                    }}
                                                />
                                            </label>
                                        ) : (
                                            <label
                                                key={id}
                                                className="group aspect-square rounded-lg bg-surface-container-low hover:bg-surface-container flex flex-col items-center justify-center gap-xs cursor-pointer transition-all duration-200 relative overflow-hidden border-2 border-dashed border-outline-variant/40 hover:border-secondary"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center text-primary group-hover:text-secondary group-hover:scale-110 transition-all">
                                                    <span className="material-symbols-outlined text-[20px]">add</span>
                                                </div>
                                                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant group-hover:text-primary transition-colors text-center px-1">
                                                    Upload {idx === 0 ? "Primary" : "Image"}
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="sr-only"
                                                    onChange={(e) => {
                                                        if (e.target.files?.[0]) setter(e.target.files[0])
                                                    }}
                                                />
                                            </label>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* 2. Text Inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg pt-sm">
                                <div className="flex flex-col gap-xs md:col-span-2">
                                    <label
                                        className="font-label-caps text-label-caps uppercase text-primary tracking-wide"
                                        htmlFor="product-name"
                                    >
                                        Product Name
                                    </label>
                                    <input
                                        id="product-name"
                                        className="w-full px-md py-sm bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg outline-none transition-all placeholder:text-outline focus:bg-surface-container-lowest shadow-sm border border-outline-variant/10 focus:border-outline-variant/30"
                                        placeholder="e.g. Premium Linen Resort Shirt"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-xs">
                                    <label
                                        className="font-label-caps text-label-caps uppercase text-primary tracking-wide"
                                        htmlFor="product-price"
                                    >
                                        Product Price (₹)
                                    </label>
                                    <div className="relative flex items-center">
                                        <span className="absolute left-md font-headline-md text-headline-md text-on-surface-variant select-none pointer-events-none">
                                            ₹
                                        </span>
                                        <input
                                            id="product-price"
                                            className="w-full pl-xl pr-md py-sm bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg outline-none transition-all placeholder:text-outline focus:bg-surface-container-lowest shadow-sm border border-outline-variant/10 focus:border-outline-variant/30"
                                            placeholder="e.g. 2450"
                                            type="number"
                                            min="0"
                                            required
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-xs md:col-span-3">
                                    <label
                                        className="font-label-caps text-label-caps uppercase text-primary tracking-wide"
                                        htmlFor="product-description"
                                    >
                                        Product Description
                                    </label>
                                    <textarea
                                        id="product-description"
                                        className="w-full px-md py-sm bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg outline-none transition-all placeholder:text-outline focus:bg-surface-container-lowest shadow-sm resize-none leading-relaxed border border-outline-variant/10 focus:border-outline-variant/30"
                                        placeholder="Detailed product description, fabric details, care instructions..."
                                        rows={3}
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* 3. Category & SubCategory Selectors */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl pt-sm">
                                {/* Category Selector */}
                                <div className="flex flex-col gap-sm">
                                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-wide">
                                        Category
                                    </span>
                                    <div className="grid grid-cols-3 gap-xs p-xs bg-surface-container-low rounded-lg border border-outline-variant/10">
                                        {["Men", "Women", "Kids"].map((cat) => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setCategory(cat)}
                                                className={`py-sm px-md text-center rounded font-label-caps text-label-caps uppercase transition-all cursor-pointer ${
                                                    category === cat
                                                        ? "bg-primary text-on-primary shadow-sm"
                                                        : "bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                                                }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* SubCategory Selector */}
                                <div className="flex flex-col gap-sm">
                                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-wide">
                                        Sub Category
                                    </span>
                                    <div className="grid grid-cols-3 gap-xs p-xs bg-surface-container-low rounded-lg border border-outline-variant/10">
                                        {["TopWear", "BottomWear", "WinterWear"].map((sub) => (
                                            <button
                                                key={sub}
                                                type="button"
                                                onClick={() => setSubCategory(sub)}
                                                className={`py-sm px-md text-center rounded font-label-caps text-label-caps uppercase transition-all cursor-pointer ${
                                                    subCategory === sub
                                                        ? "bg-primary text-on-primary shadow-sm"
                                                        : "bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                                                }`}
                                            >
                                                {sub}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 4. Size Selector (Multi-select) */}
                            <div className="flex flex-col gap-sm pt-sm">
                                <div className="flex items-center justify-between">
                                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-wide">
                                        Available Sizes (Select multiple)
                                    </span>
                                    <span className="font-label-caps text-label-caps text-on-surface-variant">
                                        {sizes.length > 0 ? `Selected: ${sizes.join(", ")}` : "None selected"}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-sm">
                                    {allSizes.map((size) => {
                                        const isSelected = sizes.includes(size)
                                        return (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => toggleSize(size)}
                                                className={`w-12 h-10 flex items-center justify-center rounded-lg font-label-caps text-label-caps transition-all cursor-pointer ${
                                                    isSelected
                                                        ? "bg-primary text-on-primary shadow-sm"
                                                        : "bg-surface-container-low text-on-surface hover:bg-surface-container-high border border-outline-variant/10"
                                                }`}
                                            >
                                                {size}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* 5. Bestseller Checkbox */}
                            <div className="pt-sm">
                                <label className="inline-flex items-center gap-md cursor-pointer select-none group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked={bestseller}
                                            onChange={(e) => setBestseller(e.target.checked)}
                                            className="peer sr-only"
                                        />
                                        <div
                                            className={`w-6 h-6 rounded transition-all flex items-center justify-center shadow-sm ${
                                                bestseller
                                                    ? "bg-primary"
                                                    : "bg-surface-container-high border border-outline-variant/30"
                                            }`}
                                        >
                                            {bestseller && (
                                                <span className="material-symbols-outlined text-secondary-fixed text-[18px] font-bold">
                                                    check
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-body-md text-body-md font-semibold text-primary group-hover:text-secondary transition-colors">
                                            Mark as Bestseller
                                        </span>
                                        <span className="font-label-caps text-label-caps text-on-surface-variant">
                                            Featured on store home banner and recommended rails
                                        </span>
                                    </div>
                                </label>
                            </div>

                            {/* 6. Submit Button */}
                            <div className="pt-md flex items-center justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full sm:w-auto min-w-[200px] px-xl py-md bg-primary text-on-primary rounded-lg font-label-caps text-label-caps uppercase tracking-wider font-bold shadow-md hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <span className="material-symbols-outlined text-[20px] animate-spin">
                                                sync
                                            </span>
                                            <span>Publishing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-[20px]">add_circle</span>
                                            <span>Add Product</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Add
