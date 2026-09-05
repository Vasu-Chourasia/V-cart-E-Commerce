import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { authDataContext } from './authContext'
import { userDataContext } from './UserContext'
import { toast } from 'react-toastify'

export const shopDataContext = createContext()

function ShopContext({ children }) {
    const { serverUrl } = useContext(authDataContext)
    const { userData } = useContext(userDataContext)

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItem, setCartItem] = useState({})
    const [loading, setLoading] = useState(false)

    const currency = '₹'
    const delivery_fee = 40

    // fetch all products from backend
    const getProducts = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/product/list")
            setProducts(result.data)
        } catch (error) {
            console.log("getProducts error", error)
        }
    }

    // add item+size to cart — syncs to backend if logged in
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size")
            return
        }

        // update local state first for instant UI feedback
        let cartData = structuredClone(cartItem)
        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1
        } else {
            cartData[itemId] = { [size]: 1 }
        }
        setCartItem(cartData)

        // sync to backend
        if (userData) {
            setLoading(true)
            try {
                await axios.post(serverUrl + "/api/cart/add", { itemId, size }, { withCredentials: true })
                toast.success("Added to cart")
            } catch (error) {
                console.log("addToCart error", error)
                toast.error("Failed to add to cart")
            } finally {
                setLoading(false)
            }
        }
    }

    // alias for backwards compatibility
    const addtoCart = addToCart

    // load cart from backend (called after login)
    const getUserCart = async () => {
        try {
            const result = await axios.post(serverUrl + '/api/cart/get', {}, { withCredentials: true })
            setCartItem(result.data)
        } catch (error) {
            console.log("getUserCart error", error)
        }
    }

    // update quantity of a specific item+size
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem)
        if (!cartData[itemId]) cartData[itemId] = {}
        
        if (quantity === 0) {
            delete cartData[itemId][size]
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId]
            }
        } else {
            cartData[itemId][size] = quantity
        }
        setCartItem(cartData)

        if (userData) {
            try {
                await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true })
            } catch (error) {
                console.log("updateQuantity error", error)
            }
        }
    }

    // total number of items in cart (for badge)
    const getCartCount = () => {
        let total = 0
        for (const itemId in cartItem) {
            for (const size in cartItem[itemId]) {
                if (cartItem[itemId][size] > 0) {
                    total += cartItem[itemId][size]
                }
            }
        }
        return total
    }

    // total price of all cart items
    const getCartAmount = () => {
        let total = 0
        for (const itemId in cartItem) {
            const product = products.find(p => p._id === itemId)
            if (!product) continue
            for (const size in cartItem[itemId]) {
                if (cartItem[itemId][size] > 0) {
                    total += product.price * cartItem[itemId][size]
                }
            }
        }
        return total
    }

    useEffect(() => { getProducts() }, [])
    useEffect(() => { if (userData) getUserCart() }, [userData])

    const value = {
        products, currency, delivery_fee, getProducts,
        search, setSearch, showSearch, setShowSearch,
        cartItem, setCartItem, addToCart, addtoCart, updateQuantity,
        getCartCount, getCartAmount, loading
    }

    return (
        <shopDataContext.Provider value={value}>
            {children}
        </shopDataContext.Provider>
    )
}

export default ShopContext
