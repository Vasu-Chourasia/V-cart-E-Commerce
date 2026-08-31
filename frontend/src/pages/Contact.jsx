import React from 'react'
import Nav from '../component/Nav'
import Footer from '../component/Footer'
import NewLetterBox from '../component/NewLetterBox'
import contactImg from '../assets/contact.jpg'
import { toast } from 'react-toastify'

function Contact() {
    const storeImageFallback = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"

    return (
        <div className="bg-surface-container-lowest min-h-screen flex flex-col justify-between antialiased text-on-surface">

            <main className="flex-grow">
                {/* Hero Contact Section */}
                <section className="py-xl px-gutter max-w-container-max mx-auto">
                    <div className="text-center mb-xl">
                        <h1 className="text-display-lg-mobile md:text-display-lg font-bold text-primary mb-xs">
                            Get in Touch
                        </h1>
                        <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
                            Reach out to our dedicated store teams, customer concierges, and support specialists.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start mb-xl">
                        {/* Store Showcase Image Card */}
                        <div className="lg:col-span-5 flex justify-center sticky top-28">
                            <div className="relative rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm group max-w-md w-full aspect-[4/5] bg-surface-container">
                                <img
                                    src={contactImg}
                                    onError={(e) => { e.target.src = storeImageFallback }}
                                    alt="V-Cart Flagship Store"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-md left-md right-md p-md bg-surface-container-lowest/95 backdrop-blur-md rounded-lg border border-outline-variant/30 shadow-md">
                                    <p className="text-label-caps uppercase text-secondary font-bold">Experience Center</p>
                                    <p className="text-body-md font-semibold text-on-surface mt-xs">V-Cart Digital Retail Hub</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info Cards Grid */}
                        <div className="lg:col-span-7 space-y-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                                {/* Address Card */}
                                <div className="p-lg rounded-xl border border-outline-variant/40 bg-surface-container-lowest shadow-xs hover:border-secondary transition-colors duration-300 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-md mb-md">
                                            <span className="material-symbols-outlined text-secondary text-2xl">location_on</span>
                                            <h3 className="text-body-lg font-bold text-primary">Store Information</h3>
                                        </div>
                                        <p className="text-body-md text-on-surface-variant leading-relaxed">
                                            12345 Station Road, Commerce Tech Park<br />
                                            Random City, State, India - 400001
                                        </p>
                                    </div>
                                    <p className="text-xs text-on-surface-variant/80 mt-md pt-sm border-t border-outline-variant/30">
                                        Hours: Mon-Sat, 9:00 AM - 8:00 PM IST
                                    </p>
                                </div>

                                {/* Phone Card */}
                                <div className="p-lg rounded-xl border border-outline-variant/40 bg-surface-container-lowest shadow-xs hover:border-secondary transition-colors duration-300 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-md mb-md">
                                            <span className="material-symbols-outlined text-secondary text-2xl">call</span>
                                            <h3 className="text-body-lg font-bold text-primary">Phone Support</h3>
                                        </div>
                                        <p className="text-body-md text-on-surface-variant mb-sm">
                                            Speak directly with our dedicated concierge team.
                                        </p>
                                        <a href="tel:+919131755102" className="text-body-lg font-bold text-secondary hover:text-primary transition-colors">
                                            +91-9131755102
                                        </a>
                                    </div>
                                    <p className="text-xs text-on-surface-variant/80 mt-md pt-sm border-t border-outline-variant/30">
                                        Toll-Free / 24/7 Helpline
                                    </p>
                                </div>

                                {/* Email Card */}
                                <div className="p-lg rounded-xl border border-outline-variant/40 bg-surface-container-lowest shadow-xs hover:border-secondary transition-colors duration-300 flex flex-col justify-between md:col-span-2">
                                    <div>
                                        <div className="flex items-center gap-md mb-md">
                                            <span className="material-symbols-outlined text-secondary text-2xl">mail</span>
                                            <h3 className="text-body-lg font-bold text-primary">Email Inquiry</h3>
                                        </div>
                                        <p className="text-body-md text-on-surface-variant mb-sm">
                                            Send us a detailed message for order tracking or support.
                                        </p>
                                        <a href="mailto:vdevwork1906@gmail.com" className="text-body-lg font-bold text-secondary hover:text-primary transition-colors">
                                            vdevwork1906@gmail.com
                                        </a>
                                    </div>
                                    <p className="text-xs text-on-surface-variant/80 mt-md pt-sm border-t border-outline-variant/30">
                                        Average response time: 2 hours
                                    </p>
                                </div>
                            </div>

                            {/* Careers Card */}
                            <div className="p-lg rounded-xl border border-outline-variant/40 bg-surface-container-low shadow-xs space-y-md">
                                <div className="flex items-center gap-md">
                                    <span className="material-symbols-outlined text-secondary text-2xl">work</span>
                                    <div>
                                        <h3 className="text-body-lg font-bold text-primary">Careers at V-Cart</h3>
                                        <p className="text-body-md text-on-surface-variant">Build the future of digital retail with us</p>
                                    </div>
                                </div>
                                <p className="text-body-md text-on-surface-variant leading-relaxed">
                                    We are always looking for passionate engineers, designers, and e-commerce strategists to join our team. Explore open roles and build modern shopping experiences.
                                </p>
                                <button
                                    onClick={() => toast.info("Career openings coming soon!")}
                                    className="bg-primary hover:bg-primary/90 text-on-primary rounded text-label-caps uppercase px-lg py-md transition-colors shadow-sm cursor-pointer"
                                >
                                    Explore Jobs & Careers
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <NewLetterBox />
            </main>

            <Footer />
        </div>
    )
}

export default Contact
