import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()
    return (
        <div className="w-full min-h-screen bg-surface-container-low flex flex-col items-center justify-center gap-md text-on-surface p-gutter">
            <h1 className="text-display-lg text-primary tracking-tight font-bold">404</h1>
            <p className="text-headline-md font-bold text-on-surface">Page Not Found</p>
            <p className="text-body-md text-on-surface-variant max-w-sm text-center">
                The page you are looking for does not exist or has been moved.
            </p>
            <button
                onClick={() => navigate("/")}
                className="mt-sm px-lg py-md bg-primary hover:bg-primary/90 text-on-primary text-label-caps uppercase rounded transition-colors shadow-md cursor-pointer font-bold"
            >
                Back to Home
            </button>
        </div>
    )
}

export default NotFound
