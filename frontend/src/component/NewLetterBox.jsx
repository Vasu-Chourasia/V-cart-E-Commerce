import React from 'react'

// newsletter subscription UI — minimalist glass banner
function NewLetterBox() {
    return (
        <section className='w-full bg-[#0e2130] border-t border-white/5 py-20 md:py-24 px-4 md:px-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='w-full bg-[#0c2432] border border-[#56dbfc]/20 rounded-3xl p-8 md:p-14 shadow-2xl flex flex-col items-center text-center gap-6 relative overflow-hidden'>
                    <span className='text-[#56dbfc] text-xs font-extrabold uppercase tracking-widest'>
                        SPECIAL OFFER
                    </span>
                    <h3 className='text-3xl md:text-5xl font-extrabold text-white tracking-tight max-w-2xl leading-tight'>
                        Subscribe to get 20% off your first order
                    </h3>
                    <p className='text-slate-300 text-sm md:text-base max-w-md leading-relaxed font-normal'>
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
                            className='w-full sm:flex-1 h-12 bg-[#091520] border border-white/20 rounded-lg px-4 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#56dbfc] transition-all font-normal appearance-none'
                            required
                        />

                        <button 
                            type="submit"
                            className='w-full sm:w-auto bg-[#56dbfc] text-slate-950 text-sm rounded-lg hover:bg-[#7ce2fc] active:scale-95 transition-all shadow-[0_0_20px_rgba(86,219,252,0.35)] flex-shrink-0'
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


