import React, { useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { userDataContext } from './context/UserContext'
import Nav from './component/Nav'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Home from './pages/Home'
import About from './pages/About'
import Collections from './pages/Collections'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import NotFound from './pages/NotFound'
import Ai from './component/Ai'

function App() {
    const { userData } = useContext(userDataContext)
    const location = useLocation()

    // helper — redirects to login if not authenticated, preserving intended destination
    const protect = (element) =>
        userData ? element : <Navigate to="/login" state={{ from: location.pathname }} />

    return (
        <>
            <ToastContainer />
            {userData && <Nav />}

            <Routes>
                {/* public routes — redirect to home if already logged in */}
                <Route path='/login' element={userData ? <Navigate to={location.state?.from || "/"} /> : <Login />} />
                <Route path='/signup' element={userData ? <Navigate to={location.state?.from || "/"} /> : <Registration />} />

                {/* protected routes */}
                <Route path='/' element={protect(<Home />)} />
                <Route path='/about' element={protect(<About />)} />
                <Route path='/collection' element={protect(<Collections />)} />
                <Route path='/contact' element={protect(<Contact />)} />
                <Route path='/productdetail/:productId' element={protect(<ProductDetail />)} />
                <Route path='/cart' element={protect(<Cart />)} />
                <Route path='/placeorder' element={protect(<PlaceOrder />)} />
                <Route path='/order' element={protect(<Order />)} />

                <Route path='*' element={<NotFound />} />
            </Routes>

            {userData && <Ai />}
        </>
    )
}

export default App
