import React from 'react'

// newsletter subscription UI — minimalist glass banner
function NewLetterBox() {
    return (
        <section className='w-full max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-6 my-12 md:my-20'>

            <div className='max-w-7xl mx-auto'>
                <div className='w-full bg-gradient-to-r from-[#122434] via-[#193548] to-[#122434] backdrop-blur-md border border-[#56dbfc]/30 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center text-center gap-6 relative overflow-hidden'>
                    {/* decorative glow */}
                    <div className='absolute -top-24 -left-24 w-48 h-48 bg-[#56dbfc]/15 rounded-full blur-3xl pointer-events-none'></div>
                    <div className='absolute -bottom-24 -right-24 w-48 h-48 bg-[#56dbfc]/15 rounded-full blur-3xl pointer-events-none'></div>

                    <span className='px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#56dbfc] bg-[#56dbfc]/10 border border-[#56dbfc]/30 rounded-full'>
                        Special Offer
                    </span>
                    <h3 className='text-3xl md:text-4xl font-extrabold text-white tracking-tight max-w-xl'>
                        Subscribe to get 20% off your first order
                    </h3>
                    <p className='text-slate-300 text-sm md:text-base max-w-md leading-relaxed'>
                        Join our VIP list to receive exclusive offers, new collection announcements, and seasonal discounts.
                    </p>
                    <form onSubmit={(e) => e.preventDefault()} className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-md mt-2 relative'>
                        <input
                            type="email"
                            name="newsletter_email"
                            id="newsletter_email_input"
                            placeholder='Enter your email address...'
                            autoComplete="off"
                            spellCheck="false"
                            data-1p-ignore="true"
                            data-lpignore="true"
                            className='w-full sm:flex-1 h-12 bg-[#0a1520] border border-white/20 rounded-lg px-4 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#56dbfc] transition-all font-normal appearance-none'
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


