import React from 'react';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-[#002B5C]">
            {/* Header */}
            <header className="absolute top-0 w-full z-50 border-t-8 border-[#4E1686] bg-white/90 backdrop-blur-sm shadow-sm">
                <div className="container mx-auto px-6 py-6 flex justify-between items-center">
                    <Link href="/">
                        <span className="text-3xl font-black tracking-tighter text-[#002B5C] drop-shadow-sm hover:scale-105 transition-transform duration-300 cursor-pointer">
                            Coverme.lk
                        </span>
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-6 pt-32 pb-16 max-w-4xl">
                <h1 className="text-4xl lg:text-5xl font-black mb-8 text-[#002B5C]">Cookie Policy</h1>
                <p className="text-gray-600 mb-8 mt-[-1rem]">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-[#4E1686] mb-4">1. What Are Cookies?</h2>
                        <p>
                            Cookies are small text files that are placed on your computer or mobile device when you browse websites.
                            We use cookies to enhance your experience on our website, to understand how the site is used, and to monitor critical performance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#4E1686] mb-4">2. How We Use Cookies</h2>
                        <p>
                            We use cookies for several reasons, detailed below:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Essential Cookies:</strong> These are necessary for the website to function (e.g., logging into your account).</li>
                            <li><strong>Analytics Cookies:</strong> We use these to track site usage and improve our services (e.g., Google Analytics).</li>
                            <li><strong>Functionality Cookies:</strong> These help us remember your preferences.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#4E1686] mb-4">3. Managing Cookies</h2>
                        <p>
                            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies,
                            you may worsen your overall user experience, since it will no longer be personalized to you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#4E1686] mb-4">4. Updates to This Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
