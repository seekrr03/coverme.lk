'use client';

import { useState, useEffect } from 'react';

const cards = [
    {
        title: "100% Online",
        description: "Apply & manage from anywhere. No branch visits.",
        icon: (
            <svg className="w-12 h-12 text-[#4E1686]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        bg: "bg-purple-100",
        text: "text-[#4E1686]"
    },
    {
        title: "Zero Paperwork",
        description: "Digital onboarding. Quick, easy, and eco-friendly.",
        icon: (
            <svg className="w-12 h-12 text-[#8CC63F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        bg: "bg-green-100",
        text: "text-[#8CC63F]"
    },
    {
        title: "Fast & Secure",
        description: "Instant issuance with bank-grade security.",
        icon: (
            <svg className="w-12 h-12 text-[#4E1686]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        bg: "bg-purple-100",
        text: "text-[#4E1686]"
    },
    {
        title: "Customizable Plans",
        description: "Select riders & benefits that fit your life.",
        icon: (
            <svg className="w-12 h-12 text-[#8CC63F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        ),
        bg: "bg-green-100",
        text: "text-[#8CC63F]"
    }
];

export default function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % cards.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    return (
        <div className="relative w-full max-w-md mx-auto h-[400px] flex items-center justify-center perspective-1000">
            {/* Cards Container */}
            <div className="relative w-full h-full transform-style-3d animate-float">
                {cards.map((card, index) => {
                    // Calculate position relative to current index
                    const position = (index - currentIndex + cards.length) % cards.length;

                    let zIndex = 0;
                    let opacity = 0;
                    let transform = '';

                    if (position === 0) {
                        // Active Card
                        zIndex = 30;
                        opacity = 1;
                        transform = 'translateZ(0) scale(1)';
                    } else if (position === 1) {
                        // Next Card (Preview)
                        zIndex = 20;
                        opacity = 0.4;
                        transform = 'translateX(40px) translateZ(-40px) rotateY(-5deg)';
                    } else if (position === cards.length - 1) {
                        // Previous Card (Preview)
                        zIndex = 20;
                        opacity = 0.4;
                        transform = 'translateX(-40px) translateZ(-40px) rotateY(5deg)';
                    } else {
                        // Hidden
                        zIndex = 10;
                        opacity = 0;
                        transform = 'translateZ(-100px)';
                    }

                    return (
                        <div
                            key={index}
                            className="absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out flex items-center justify-center"
                            style={{
                                zIndex,
                                opacity,
                                transform,
                            }}
                        >
                            <div className="w-[320px] aspect-[4/5] bg-white/80 backdrop-blur-xl rounded-[2rem] p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/40 flex flex-col items-center justify-center text-center transform hover:scale-[1.02] transition-transform duration-500">
                                <div className={`w-24 h-24 ${card.bg} rounded-full flex items-center justify-center mb-8 shadow-inner ring-4 ring-white/50`}>
                                    {card.icon}
                                </div>
                                <h3 className="text-3xl font-black text-[#002B5C] mb-4 tracking-tight leading-none">{card.title}</h3>
                                <p className="text-gray-500 text-lg leading-relaxed font-light">{card.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modern Pagination Lines */}
            <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-4">
                {cards.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-700 ease-out ${idx === currentIndex ? 'bg-[#4E1686] w-12' : 'bg-gray-200 w-4 hover:bg-[#8CC63F]'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Arrow Controls (Optional, for better UX) */}
            <button onClick={prevSlide} className="absolute top-1/2 -left-12 lg:-left-16 -translate-y-1/2 p-2 text-[#002B5C]/50 hover:text-[#4E1686] transition">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 -right-12 lg:-right-16 -translate-y-1/2 p-2 text-[#002B5C]/50 hover:text-[#4E1686] transition">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
    );
}
