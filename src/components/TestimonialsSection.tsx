import React from 'react';

const testimonials = [
    {
        name: 'Sarah P.',
        role: 'Marketing Executive',
        quote: 'Coverme.lk made buying insurance so easy! I was covered in minutes without any hassle.',
        avatar: 'S',
    },
    {
        name: 'David K.',
        role: 'Small Business Owner',
        quote: 'The team at Coverme.lk is fantastic. They helped me find the perfect plan for my family.',
        avatar: 'D',
    },
    {
        name: 'Emily R.',
        role: 'Freelance Designer',
        quote: 'I love how transparent the process is. No hidden fees, just great coverage from Coverme.lk.',
        avatar: 'E',
    },
];

export default function TestimonialsSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#002B5C] mb-4">What Our Clients Say</h2>
                    <p className="text-gray-600">Join thousands of satisfied customers who trust Coverme.lk.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-[#4E1686] text-white flex items-center justify-center text-2xl font-bold mb-6">
                                {testimonial.avatar}
                            </div>
                            <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                            <div>
                                <h4 className="font-bold text-[#002B5C]">{testimonial.name}</h4>
                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
