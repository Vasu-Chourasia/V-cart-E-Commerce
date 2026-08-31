import React from 'react'

function OurPolicy() {
    const trustBadges = [
        { icon: "local_shipping", label: "Free Returns" },
        { icon: "support_agent", label: "24/7 Support" },
        { icon: "lock", label: "Secure Payment" },
    ]

    return (
        <section className="py-lg px-gutter border-b border-surface-container-high bg-surface-container-lowest">
            <div className="max-w-container-max mx-auto flex flex-wrap justify-center md:justify-around gap-lg text-center">
                {trustBadges.map((badge) => (
                    <div key={badge.label} className="flex items-center gap-sm">
                        <span className="material-symbols-outlined text-secondary text-2xl">{badge.icon}</span>
                        <span className="text-label-caps text-on-surface uppercase tracking-wide">{badge.label}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default OurPolicy
