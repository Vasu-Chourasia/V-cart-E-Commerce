import React, { useContext, useEffect, useMemo, useState } from "react"
import Nav from "../component/Nav"
import Sidebar from "../component/Sidebar"
import { authDataContext } from "../context/AuthContext"
import axios from "axios"
import { toast } from "react-toastify"

function Lists() {
    const { serverUrl } = useContext(authDataContext)

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)
    const [productToDelete, setProductToDelete] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const itemsPerPage = 6

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const result = await axios.get(serverUrl + "/api/product/list")
            if (Array.isArray(result.data)) {
                setProducts(result.data)
            } else {
                setProducts([])
            }
        } catch (error) {
            console.error("fetchProducts error", error)
            toast.error("Failed to fetch products")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const CATEGORIES = ["Men", "Women", "Kids"]

    // Filter products based on search term and category / subCategory
    const filteredProducts = useMemo(() => {
        const query = searchTerm.toLowerCase().trim()
        return products.filter((product) => {
            const matchesSearch = !query || product.name?.toLowerCase().includes(query)
            const matchesCategory =
                selectedCategory === "All"
                    ? true
                    : CATEGORIES.includes(selectedCategory)
                    ? product.category === selectedCategory
                    : product.subCategory === selectedCategory
            return matchesSearch && matchesCategory
        })
    }, [products, searchTerm, selectedCategory])

    // Pagination calculations
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage))
    const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages)
    const startIndex = (validCurrentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length)
    const currentProducts = filteredProducts.slice(startIndex, endIndex)

    // Handle delete confirmation
    const handleDeleteConfirm = async () => {
        if (!productToDelete) return
        setIsDeleting(true)
        try {
            await axios.delete(serverUrl + `/api/product/remove/${productToDelete._id}`, {
                withCredentials: true,
            })
            toast.success("Product deleted successfully")
            setProductToDelete(null)
            await fetchProducts()
        } catch (error) {
            console.error("handleDelete error", error)
            toast.error(error?.response?.data?.message || "Failed to delete product")
        } finally {
            setIsDeleting(false)
        }
    }

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = []
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            if (validCurrentPage <= 3) {
                pages.push(1, 2, 3, "...", totalPages)
            } else if (validCurrentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages)
            } else {
                pages.push(1, "...", validCurrentPage, "...", totalPages)
            }
        }
        return pages
    }

    return (
        <div className="pl-64 min-h-screen flex flex-col bg-background font-body-md text-body-md text-on-surface">
            <Nav />
            <Sidebar />

            <main className="w-full pt-header bg-background flex-1">
                <div className="flex flex-col w-full">
                    <div className="max-w-[1280px] w-full mx-auto px-lg py-xl flex flex-col gap-lg">
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
                            <div className="flex items-center gap-md flex-wrap">
                                <h1 className="font-headline-md text-headline-md text-primary tracking-tight font-bold">
                                    All Products List
                                </h1>
                                <span className="inline-flex items-center gap-xs px-md py-xs rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps">
                                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                                    {loading ? "Loading..." : `${filteredProducts.length} Products Total`}
                                </span>
                            </div>
                            <div className="flex items-center gap-xs text-on-surface-variant font-label-caps text-label-caps uppercase">
                                <span className="material-symbols-outlined text-[16px] text-secondary">
                                    verified_user
                                </span>
                                <span>Store Catalog Management</span>
                            </div>
                        </div>

                        {/* Filter & Search Bar */}
                        <div className="bg-surface-container-lowest rounded-xl p-md shadow-sm flex flex-col sm:flex-row items-center justify-between gap-md border border-outline-variant/10">
                            {/* Search Input */}
                            <div className="relative w-full sm:w-80">
                                <span className="material-symbols-outlined absolute left-[14px] top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                                    search
                                </span>
                                <input
                                    id="productSearchInput"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value)
                                        setCurrentPage(1)
                                    }}
                                    placeholder="Search by product name..."
                                    className="w-full pl-search-input pr-md py-sm bg-surface-container-low rounded-lg text-on-surface placeholder:text-outline text-body-md font-body-md outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-[12px] top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1 rounded-full text-[16px]"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                    </button>
                                )}
                            </div>

                            {/* Category Filter Dropdown */}
                            <div className="relative w-full sm:w-64">
                                <span className="material-symbols-outlined absolute left-[14px] top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                                    filter_list
                                </span>
                                <select
                                    id="categoryFilterSelect"
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        setSelectedCategory(e.target.value)
                                        setCurrentPage(1)
                                    }}
                                    className="w-full pl-search-input pr-select-chevron py-sm bg-surface-container-low rounded-lg text-on-surface text-body-md font-body-md outline-none appearance-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all cursor-pointer"
                                >
                                    <option value="All">All Categories</option>
                                    <option value="Men">Men Collection</option>
                                    <option value="Women">Women Collection</option>
                                    <option value="Kids">Kids Collection</option>
                                    <option value="TopWear">TopWear</option>
                                    <option value="BottomWear">BottomWear</option>
                                    <option value="WinterWear">WinterWear</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-[12px] top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                                    expand_more
                                </span>
                            </div>
                        </div>

                        {/* Table Container */}
                        <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col border border-outline-variant/10">
                            <div className="overflow-x-auto w-full">
                                <table className="w-full text-left min-w-[680px]">
                                    {/* Table Header */}
                                    <thead className="bg-surface-container-low">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider w-24"
                                            >
                                                Image
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider"
                                            >
                                                Product Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider"
                                            >
                                                Category &amp; Subcategory
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider"
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-right w-24"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* Table Body */}
                                    <tbody className="divide-y-0" id="productTableBody">
                                        {loading ? (
                                            /* Loading Skeleton Rows */
                                            Array.from({ length: 4 }).map((_, idx) => (
                                                <tr key={idx} className="animate-pulse">
                                                    <td className="py-md px-lg">
                                                        <div className="w-12 h-12 rounded-lg bg-surface-container"></div>
                                                    </td>
                                                    <td className="py-md px-lg">
                                                        <div className="h-4 bg-surface-container rounded w-48 mb-2"></div>
                                                        <div className="h-3 bg-surface-container-high rounded w-24"></div>
                                                    </td>
                                                    <td className="py-md px-lg">
                                                        <div className="h-4 bg-surface-container rounded w-32"></div>
                                                    </td>
                                                    <td className="py-md px-lg">
                                                        <div className="h-4 bg-surface-container rounded w-20"></div>
                                                    </td>
                                                    <td className="py-md px-lg text-right">
                                                        <div className="w-8 h-8 rounded-lg bg-surface-container inline-block"></div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : currentProducts.length === 0 ? (
                                            /* Empty State */
                                            <tr>
                                                <td colSpan={5} className="py-xl text-center">
                                                    <div className="flex flex-col items-center justify-center gap-xs text-on-surface-variant">
                                                        <span className="material-symbols-outlined text-[48px] text-outline">
                                                            inventory_2
                                                        </span>
                                                        <span className="font-semibold text-primary text-body-lg">
                                                            No products found
                                                        </span>
                                                        <span className="text-body-md text-on-surface-variant">
                                                            Try adjusting your search query or category filter.
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            /* Active Product Rows */
                                            currentProducts.map((product) => (
                                                <tr
                                                    key={product._id}
                                                    className="group hover:bg-surface-container-low/70 transition-colors border-b border-surface-container-low"
                                                >
                                                    {/* Product Thumbnail */}
                                                    <td className="py-md px-lg align-middle">
                                                        <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden shadow-sm flex items-center justify-center border border-outline-variant/10">
                                                            <img
                                                                src={product.image1}
                                                                alt={product.name}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.onerror = null
                                                                    e.target.src =
                                                                        "https://placehold.co/100x100?text=No+Image"
                                                                }}
                                                            />
                                                        </div>
                                                    </td>

                                                    {/* Product Name */}
                                                    <td className="py-md px-lg align-middle">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span className="font-body-md text-body-md font-semibold text-primary block">
                                                                {product.name}
                                                            </span>
                                                            {product.bestseller && (
                                                                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-[10px] uppercase font-bold tracking-wider">
                                                                    <span className="material-symbols-outlined text-[12px]">
                                                                        star
                                                                    </span>
                                                                    Bestseller
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>

                                                    {/* Category & Subcategory */}
                                                    <td className="py-md px-lg align-middle">
                                                        <span className="font-body-md text-body-md text-on-surface-variant">
                                                            {product.category} • {product.subCategory}
                                                        </span>
                                                    </td>

                                                    {/* Price */}
                                                    <td className="py-md px-lg align-middle">
                                                        <span className="font-body-md text-body-md font-bold text-on-surface font-mono">
                                                            ₹{Number(product.price || 0).toLocaleString()}
                                                        </span>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="py-md px-lg align-middle text-right">
                                                        <button
                                                            type="button"
                                                            aria-label={`Delete ${product.name}`}
                                                            onClick={() => setProductToDelete(product)}
                                                            className="p-xs rounded-lg text-outline hover:text-error hover:bg-error-container/40 transition-all inline-flex items-center justify-center cursor-pointer"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">
                                                                delete
                                                            </span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Footer */}
                            <div className="px-lg py-md bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-md border-t border-outline-variant/10">
                                <span className="font-body-md text-body-md text-on-surface-variant">
                                    Showing{" "}
                                    <span className="font-semibold text-on-surface">
                                        {filteredProducts.length === 0 ? "0" : `${startIndex + 1}–${endIndex}`}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-on-surface">
                                        {filteredProducts.length}
                                    </span>{" "}
                                    products
                                </span>

                                {totalPages > 1 && (
                                    <nav aria-label="Pagination Navigation" className="flex items-center gap-xs">
                                        {/* Previous Page Button */}
                                        <button
                                            type="button"
                                            aria-label="Previous page"
                                            disabled={validCurrentPage === 1}
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:bg-surface-container-high hover:text-on-surface transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                chevron_left
                                            </span>
                                        </button>

                                        {/* Page Numbers */}
                                        {getPageNumbers().map((page, idx) =>
                                            page === "..." ? (
                                                <span
                                                    key={`ellipsis-${idx}`}
                                                    className="w-8 h-8 flex items-center justify-center text-outline font-label-caps text-label-caps select-none"
                                                >
                                                    ...
                                                </span>
                                            ) : (
                                                <button
                                                    key={`page-${page}`}
                                                    type="button"
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`w-8 h-8 rounded-lg font-label-caps text-label-caps flex items-center justify-center transition-colors cursor-pointer ${
                                                        validCurrentPage === page
                                                            ? "bg-primary text-on-primary shadow-sm font-bold"
                                                            : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        )}

                                        {/* Next Page Button */}
                                        <button
                                            type="button"
                                            aria-label="Next page"
                                            disabled={validCurrentPage === totalPages}
                                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:bg-surface-container-high hover:text-on-surface transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                chevron_right
                                            </span>
                                        </button>
                                    </nav>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Delete Confirmation Modal */}
            {productToDelete && (
                <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-md">
                    <div className="bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant/20 p-lg max-w-md w-full flex flex-col gap-md animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center gap-md">
                            <div className="w-12 h-12 rounded-full bg-error-container text-error flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[24px]">delete</span>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-headline-md text-[18px] text-primary font-bold">
                                    Delete Product
                                </h3>
                                <p className="text-body-md text-on-surface-variant text-[14px]">
                                    Are you sure you want to remove this item from the catalog?
                                </p>
                            </div>
                        </div>

                        {/* Product Summary Preview in Modal */}
                        <div className="bg-surface-container-low rounded-lg p-sm flex items-center gap-md border border-outline-variant/10">
                            <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden shrink-0">
                                <img
                                    src={productToDelete.image1}
                                    alt={productToDelete.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = "https://placehold.co/100x100?text=No+Image"
                                    }}
                                />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-primary text-[14px] truncate">
                                    {productToDelete.name}
                                </span>
                                <span className="text-[12px] text-on-surface-variant">
                                    {productToDelete.category} • {productToDelete.subCategory} • ₹
                                    {Number(productToDelete.price || 0).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <p className="text-[13px] text-error font-medium">
                            This action cannot be undone. The product will be permanently deleted from the database.
                        </p>

                        <div className="flex items-center justify-end gap-sm pt-xs border-t border-outline-variant/10">
                            <button
                                type="button"
                                disabled={isDeleting}
                                onClick={() => setProductToDelete(null)}
                                className="px-md py-sm rounded-lg border border-outline-variant/30 text-on-surface font-semibold hover:bg-surface-container transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                disabled={isDeleting}
                                onClick={handleDeleteConfirm}
                                className="px-md py-sm rounded-lg bg-error text-on-error font-semibold hover:bg-error/90 transition-colors flex items-center gap-xs disabled:opacity-50 cursor-pointer"
                            >
                                {isDeleting ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                        Confirm Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Lists
