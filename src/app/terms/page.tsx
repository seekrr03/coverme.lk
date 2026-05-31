import React from 'react';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function TermsOfService() {
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
                <h1 className="text-4xl lg:text-5xl font-black mb-8 text-[#002B5C]">Terms of Service</h1>
                <p className="text-gray-600 mb-8 mt-[-1rem]">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-[#4E1686] mb-4">1. Agreement to Terms</h2>
                        <p>
                            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Coverme.lk (“we,” “us” or “our”),
                            concerning your access to and use of the Coverme.lk website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#4E1686] mb-4">2. Insurance Services</h2>
                        <p>
                            Coverme.lk acts as a digital platform facilitating the purchase of insurance products. We are not an insurance carrier.
                            The insurance policy you purchase is subject to the terms, conditions, and exclusions set forth by the respective insurance provider.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#4E1686] mb-4">3. User Representations</h2>
                        <p>
                            By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete;
                            (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#4E1686] mb-4">4. Limitations of Liability</h2>
                        <p>
                            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages,
                            including lost profit, lost revenue, loss of data, or other damages arising from your use of the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#4E1686] mb-4">5. Contact Us</h2>
                        <p>
                            To resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at support@coverme.lk.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
