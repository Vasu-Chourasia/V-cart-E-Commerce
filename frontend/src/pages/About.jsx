import React from 'react'
import Nav from '../component/Nav'
import Footer from '../component/Footer'
import NewLetterBox from '../component/NewLetterBox'
import aboutImg from '../assets/about.jpg'

function About() {
    const aboutImageFallback = "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop"

    return (
        <div className="bg-surface-container-lowest min-h-screen flex flex-col justify-between antialiased text-on-surface">

            <main className="flex-grow">
                {/* Hero Story & Mission Section */}
                <section className="bg-surface-container-lowest py-xl px-gutter max-w-container-max mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
                        <div>
                            <h1 className="text-display-lg-mobile md:text-display-lg font-bold text-primary mb-md">
                                Our Story & Mission
                            </h1>
                            <p className="text-body-lg text-on-surface-variant mb-md leading-relaxed">
                                V-Cart was born out of a desire for smart, seamless shopping — created to deliver quality products, trending styles, and everyday essentials in one single place. With reliable service, fast delivery, and great value, V-Cart makes your online shopping experience simple, satisfying, and stress-free.
                            </p>
                            <p className="text-body-md text-on-surface-variant leading-relaxed">
                                Our mission is to redefine online shopping by delivering quality, affordability, and convenience. V-Cart connects customers with trusted products and brands, offering a customer-focused experience that fits every lifestyle.
                            </p>
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 h-[400px]">
                            <img
                                src={aboutImg}
                                onError={(e) => { e.target.src = aboutImageFallback }}
                                alt="About V-Cart"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-xl px-gutter bg-surface">
                    <div className="max-w-container-max mx-auto">
                        <h2 className="text-headline-md font-bold text-primary text-center mb-xl">
                            Why Choose Us
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/50 shadow-sm flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-secondary-container/30 flex items-center justify-center mb-md text-secondary">
                                    <span className="material-symbols-outlined text-3xl">verified</span>
                                </div>
                                <h3 className="text-body-lg font-bold text-primary mb-sm">Premium Quality</h3>
                                <p className="text-body-md text-on-surface-variant">
                                    Every item in our collection is rigorously vetted to ensure it meets our exacting standards for craftsmanship and durability.
                                </p>
                            </div>

                            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/50 shadow-sm flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-secondary-container/30 flex items-center justify-center mb-md text-secondary">
                                    <span className="material-symbols-outlined text-3xl">local_shipping</span>
                                </div>
                                <h3 className="text-body-lg font-bold text-primary mb-sm">Seamless Convenience</h3>
                                <p className="text-body-md text-on-surface-variant">
                                    Experience a frictionless journey from discovery to delivery, with intuitive navigation and rapid, reliable shipping options.
                                </p>
                            </div>

                            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/50 shadow-sm flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-secondary-container/30 flex items-center justify-center mb-md text-secondary">
                                    <span className="material-symbols-outlined text-3xl">support_agent</span>
                                </div>
                                <h3 className="text-body-lg font-bold text-primary mb-sm">Dedicated Support</h3>
                                <p className="text-body-md text-on-surface-variant">
                                    Our support concierges are available around the clock to assist you, ensuring your shopping experience is nothing short of exceptional.
                                </p>
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

export default About
