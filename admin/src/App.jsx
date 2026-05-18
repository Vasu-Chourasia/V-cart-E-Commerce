import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { adminDataContext } from './context/AdminContext'
import Login from './pages/Login'
import Home from './pages/Home'
import Add from './pages/Add'
import Lists from './pages/Lists'
import Orders from './pages/Orders'

function App() {
    const { adminData } = useContext(adminDataContext)

    // if not logged in, always show Login regardless of route
    if (!adminData) {
        return (
            <>
                <ToastContainer />
                <Login />
            </>
        )
    }

    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/add' element={<Add />} />
                <Route path='/lists' element={<Lists />} />
                <Route path='/orders' element={<Orders />} />
            </Routes>
        </>
    )
}

export default App
