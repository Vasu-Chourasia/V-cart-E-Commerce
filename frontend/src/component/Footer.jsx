import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Footer() {
    return (
        <footer className="bg-primary text-on-primary w-full py-xl px-gutter flex flex-col items-center space-y-md text-center mt-auto">
            <div className="text-headline-md text-on-primary mb-md font-bold">V-Cart</div>
            <nav className="flex flex-wrap justify-center gap-md mb-md">
                <Link to="/about" className="text-surface-variant hover:text-on-primary hover:text-secondary-fixed transition-colors text-label-caps">
                    About Us
                </Link>
                <Link to="/contact" className="text-surface-variant hover:text-on-primary hover:text-secondary-fixed transition-colors text-label-caps">
                    Contact Us
                </Link>
                <Link to="/collection" className="text-surface-variant hover:text-on-primary hover:text-secondary-fixed transition-colors text-label-caps">
                    Collections
                </Link>
                <button
                    onClick={() => toast.info("Privacy Policy coming soon!")}
                    className="text-surface-variant hover:text-on-primary hover:text-secondary-fixed transition-colors text-label-caps cursor-pointer"
                >
                    Privacy Policy
                </button>
            </nav>
            <p className="text-body-md text-on-primary/60">
                © {new Date().getFullYear()} V-Cart E-commerce. Secure & Certified.
            </p>
        </footer>
    )
}

export default Footer
