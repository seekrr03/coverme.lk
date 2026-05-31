import React from 'react';

const features = [
    {
        title: '100% Online',
        description: 'No paperwork, no queues. Get insured from the comfort of your home.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: 'Fast Approval',
        description: 'Get your policy issued within 24 hours with our efficient digital underwriting system.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        title: 'Tailored Plans',
        description: 'Customize your coverage to fit your specific needs and budget.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        ),
    },
    {
        title: '24/7 Support',
        description: 'Our team is always available to assist you with claims and queries.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-12 bg-gradient-to-b from-white to-purple-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#002B5C] mb-4">Why Choose Coverme.lk?</h2>
                    <p className="text-gray-800 text-lg">We make insurance simple, transparent, and accessible for everyone.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="relative p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#4E1686]/5 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500"></div>

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-[#F3F4F6] text-[#4E1686] flex items-center justify-center mb-6 group-hover:bg-[#4E1686] group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-lg group-hover:scale-110">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#002B5C] mb-3 group-hover:text-[#4E1686] transition-colors">{feature.title}</h3>
                                <p className="text-gray-600 text-base leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
