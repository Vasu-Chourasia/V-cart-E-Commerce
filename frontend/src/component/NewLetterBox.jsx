import React from 'react'
import { toast } from 'react-toastify'

function NewLetterBox() {
    const handleSubmit = (e) => {
        e.preventDefault()
        toast.success("Thank you for subscribing!")
    }

    return (
        <section className="py-xl px-gutter bg-surface-container-low border-t border-surface-container-high">
            <div className="max-w-container-max mx-auto">
                <div className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-lg md:p-xl shadow-sm flex flex-col items-center text-center gap-md">
                    <span className="text-secondary text-label-caps uppercase tracking-widest">
                        Exclusive Access
                    </span>
                    <h3 className="text-display-lg-mobile md:text-headline-md font-bold text-on-surface tracking-tight max-w-2xl">
                        Subscribe for 20% Off Your First Purchase
                    </h3>
                    <p className="text-body-md text-on-surface-variant max-w-md">
                        Join our curated mailing list to receive exclusive seasonal previews, private sale invitations, and design insights.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-sm w-full max-w-md mt-sm">
                        <input
                            type="email"
                            placeholder="Enter your email address..."
                            required
                            className="w-full sm:flex-1 h-11 bg-surface-container-lowest border border-outline-variant rounded px-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-secondary transition-all"
                        />
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-on-primary rounded text-label-caps uppercase px-lg py-md transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default NewLetterBox
