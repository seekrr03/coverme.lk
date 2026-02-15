import React, { useState } from 'react';

const faqs = [
    {
        question: 'How do I get a quote from Coverme.lk?',
        answer: 'Getting a quote is simple. Just click on the "Get Quote" button, enter your details, and we’ll instantly provide you with tailored plan options.',
    },
    {
        question: 'Is my personal information safe with Coverme.lk?',
        answer: 'Absolutely. We use industry-standard encryption and security measures to protect your data at all times.',
    },
    {
        question: 'Can I customize my insurance plan?',
        answer: 'Yes! Coverme.lk allows you to customize your coverage, add riders, and adjust benefits to suit your specific needs.',
    },
    {
        question: 'What if I need to file a claim?',
        answer: 'Our claims process is straightforward. Contact our support team via WhatsApp or email, and we will guide you through every step.',
    },
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-12 bg-gradient-to-t from-purple-50 to-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#002B5C] mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-800 text-lg">Got questions? We have answers.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`border rounded-xl transition-all duration-300 overflow-hidden ${activeIndex === index ? 'border-[#4E1686] shadow-md bg-purple-50/30' : 'border-gray-200 hover:border-purple-200 hover:shadow-sm'}`}>
                            <button
                                className="w-full text-left p-6 flex justify-between items-center transition-colors duration-200"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className={`font-bold text-lg transition-colors ${activeIndex === index ? 'text-[#4E1686]' : 'text-[#002B5C]'}`}>{faq.question}</span>
                                <span className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === index ? 'bg-[#4E1686] text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-[#4E1686]'}`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>
                            <div
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
