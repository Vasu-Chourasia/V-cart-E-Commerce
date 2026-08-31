import React from 'react'

function Title({ text1, text2, subtext }) {
    return (
        <div className="flex flex-col items-center justify-center text-center gap-sm mb-lg w-full">
            <div className="inline-flex items-center gap-sm">
                <span className="text-primary font-bold">•</span>
                <h2 className="text-headline-md font-bold tracking-widest text-primary uppercase">
                    {text1} <span className="text-secondary">{text2}</span>
                </h2>
                <span className="text-primary font-bold">•</span>
            </div>
            {subtext && (
                <p className="text-body-md text-on-surface-variant max-w-xl leading-relaxed">
                    {subtext}
                </p>
            )}
        </div>
    )
}

export default Title
