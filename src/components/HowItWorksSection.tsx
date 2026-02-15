import React from 'react';

const steps = [
    {
        number: '01',
        title: 'Choose Your Plan',
        description: 'Browse our range of insurance plans tailored to your needs.',
    },
    {
        number: '02',
        title: 'Customize Coverage',
        description: 'Adjust benefits and riders to create your perfect Coverme.lk protection.',
    },
    {
        number: '03',
        title: 'Instant Coverage',
        description: 'Complete the process online and get covered instantly. No waiting.',
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-20 bg-[#002B5C] text-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4E1686] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8CC63F] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[#8CC63F] font-bold tracking-widest uppercase text-sm">Simple Process</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2">How Coverme.lk Works</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-[#8CC63F]/50 to-transparent z-0"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 text-center group">
                            <div className="w-24 h-24 mx-auto bg-[#4E1686] rounded-full flex items-center justify-center text-3xl font-bold border-4 border-[#002B5C] shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-300 max-w-xs mx-auto leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a href="/quote" className="inline-block bg-[#8CC63F] hover:bg-[#7ab332] text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                        Get Started Now
                    </a>
                </div>
            </div>
        </section>
    );
}
