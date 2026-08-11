import React from 'react'

// newsletter subscription UI — minimalist glass banner
function NewLetterBox() {
    return (
        <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20'>

            <div className='w-full bg-gradient-to-r from-[#12282e]/90 via-[#19353c]/90 to-[#12282e]/90 backdrop-blur-md border border-[#56dbfc]/20 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center text-center gap-4 relative overflow-hidden'>
                {/* decorative glow */}
                <div className='absolute -top-24 -left-24 w-48 h-48 bg-[#56dbfc]/10 rounded-full blur-3xl pointer-events-none'></div>
                <div className='absolute -bottom-24 -right-24 w-48 h-48 bg-[#56dbfc]/10 rounded-full blur-3xl pointer-events-none'></div>

                <span className='px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#56dbfc] bg-[#56dbfc]/10 border border-[#56dbfc]/20 rounded-full'>
                    Special Offer
                </span>
                <h3 className='text-2xl md:text-3xl font-bold text-white tracking-tight max-w-xl'>
                    Subscribe to get 20% off your first order
                </h3>
                <p className='text-slate-300 text-sm max-w-md'>
                    Join our VIP list to receive exclusive offers, new collection announcements, and seasonal discounts.
                </p>
                <form onSubmit={(e) => e.preventDefault()} className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-md mt-2'>
                    <input
                        type="email"
                        placeholder='Enter your email address...'
                        autoComplete="off"
                        className='w-full sm:flex-1 h-12 bg-[#0c2025] border border-white/15 rounded-xl px-4 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#56dbfc] transition-all font-normal appearance-none'
                        required
                    />
                    <button 
                        type="submit"
                        className='w-full sm:w-auto h-12 px-6 bg-[#56dbfc] text-slate-950 font-bold text-sm rounded-xl hover:bg-[#7ce2fc] active:scale-95 transition-all shadow-[0_0_15px_rgba(86,219,252,0.3)] flex-shrink-0'
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    )
}

export default NewLetterBox


