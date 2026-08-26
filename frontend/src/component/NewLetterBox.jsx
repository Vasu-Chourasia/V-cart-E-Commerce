import React from 'react'

// newsletter subscription UI — minimalist glass banner
function NewLetterBox() {
    return (
        <section className='w-full bg-gray-surface border-t border-gray-200 py-16 md:py-20 px-4 md:px-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='w-full bg-white border border-gray-200 rounded-3xl p-8 md:p-14 shadow-sm flex flex-col items-center text-center gap-6 relative overflow-hidden'>
                    <span className='text-teal text-xs font-extrabold uppercase tracking-widest'>
                        SPECIAL OFFER
                    </span>
                    <h3 className='text-3xl md:text-5xl font-extrabold text-charcoal tracking-tight max-w-2xl leading-tight'>
                        Subscribe to get 20% off your first order
                    </h3>
                    <p className='text-gray-600 text-sm md:text-base max-w-md leading-relaxed font-normal'>
                        Join our VIP list for exclusive offers and new arrivals.
                    </p>
                    <form onSubmit={(e) => e.preventDefault()} className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-md mt-4 relative'>
                        <input
                            type="email"
                            name="newsletter_email"
                            id="newsletter_email_input"
                            placeholder='Enter your email address...'
                            autoComplete="off"
                            spellCheck="false"
                            data-1p-ignore="true"
                            data-lpignore="true"
                            className='w-full sm:flex-1 h-12 bg-gray-surface border border-gray-300 rounded-lg px-4 text-charcoal text-sm placeholder:text-gray-400 focus:outline-none focus:border-teal transition-all font-normal appearance-none'
                            required
                        />

                        <button 
                            type="submit"
                            className='w-full sm:w-auto bg-navy text-white text-sm rounded-lg hover:bg-navy-hover active:scale-95 transition-all shadow-md shadow-navy/20 flex-shrink-0'
                            style={{ padding: '14px 32px', borderRadius: '8px', fontWeight: 600 }}
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


