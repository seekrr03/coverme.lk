import React from 'react';

const testimonials = [
    {
        name: 'Kasun P.',
        role: 'Software Engineer',
        quote: 'Finally, an insurance platform that understands busy professionals. The 100% online process saved me so much time.',
        avatar: 'K',
    },
    {
        name: 'Dilshan P.',
        role: 'Business Owner',
        quote: 'I needed a comprehensive plan for my family, and Coverme.lk made it super easy to compare and choose the right one.',
        avatar: 'D',
    },
    {
        name: 'Chamari S.',
        role: 'Teacher',
        quote: 'The support team was incredibly helpful in explaining the benefits. I feel much more secure knowing I have the right coverage.',
        avatar: 'C',
    },
    {
        name: 'Mahesh W.',
        role: 'Freelancer',
        quote: 'Super convenient and fast. I got my policy issued within a day. Highly recommended for anyone valuing their time.',
        avatar: 'M',
    },
    {
        name: 'Nimali J.',
        role: 'Doctor',
        quote: 'Professional service and a user-friendly website. It takes the stress out of buying insurance.',
        avatar: 'N',
    },
    {
        name: 'Sanjeewa R.',
        role: 'Architect',
        quote: 'Great variety of plans. I found exactly what I was looking for without having to visit any branches.',
        avatar: 'S',
    },
    {
        name: 'Tharindu G.',
        role: 'Banker',
        quote: 'Reliable and trustworthy. The claims process is explained clearly, which gives me peace of mind.',
        avatar: 'T',
    },
    {
        name: 'Anjali D.',
        role: 'HR Manager',
        quote: 'I recommend Coverme.lk to all my colleagues. It’s the modern way to get insured in Sri Lanka.',
        avatar: 'A',
    },
    {
        name: 'Roshan F.',
        role: 'Entrepreneur',
        quote: 'Excellent customer support via WhatsApp. They answered all my questions instantly.',
        avatar: 'R',
    },
    {
        name: 'Gayathri M.',
        role: 'student',
        quote: 'Affordable plans for students like me. I’m glad I found Coverme.lk.',
        avatar: 'G',
    },
    {
        name: 'Lasantha H.',
        role: 'Driver',
        quote: 'Very easy to use on my phone. I bought my insurance while on a break.',
        avatar: 'L',
    },
    {
        name: 'Priyanka T.',
        role: 'Nurse',
        quote: 'Trustworthy and efficient. I feel safe knowing my family is protected by a plan from Coverme.lk.',
        avatar: 'P',
    },
];

export default function TestimonialsSection() {
    return (
        <section className="py-12 bg-gradient-to-br from-green-50 via-white to-purple-50 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#002B5C] mb-4">What Our Clients Say</h2>
                    <p className="text-gray-800 text-lg">Join our growing community of satisfied customers.</p>
                </div>

                {/* Marquee Container */}
                <div className="relative w-full overflow-hidden mask-linear-gradient">
                    <div className="flex w-max animate-marquee gap-8">
                        {/* Render localized testimonials twice for seamless loop */}
                        {[...testimonials, ...testimonials].map((testimonial, index) => (
                            <div key={index} className="w-[300px] md:w-[400px] bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center relative flex-shrink-0">
                                <div className="absolute top-4 right-8 text-6xl text-gray-100 font-serif leading-none select-none z-0">"</div>

                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4E1686] to-[#8CC63F] text-white flex items-center justify-center text-2xl font-bold mb-4 relative z-10 shadow-md">
                                    {testimonial.avatar}
                                </div>

                                <div className="flex gap-1 mb-4 text-[#F59E0B]">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-gray-600 italic mb-6 relative z-10 w-full">"{testimonial.quote}"</p>

                                <div className="relative z-10 mt-auto">
                                    <h4 className="font-bold text-[#002B5C] text-lg">{testimonial.name}</h4>
                                    <p className="text-sm text-[#4E1686] font-medium">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Inline styles for custom marquee animation if not in global CSS */}
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                .mask-linear-gradient {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
        </section>
    );
}
