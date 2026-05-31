import React from 'react';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function PrivacyPolicy() {
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
                <h1 className="text-4xl lg:text-5xl font-black mb-8 text-[#002B5C]">Privacy Policy</h1>
                <p className="text-gray-600 mb-8 mt-[-1rem]">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-[#4E1686] mb-4">1. Introduction</h2>
                        <p>
                            Welcome to Coverme.lk. We are committed to protecting your personal information and your right to privacy.
                            This Privacy Policy explains what information we collect, how we use it, and your rights in relation to it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#4E1686] mb-4">2. Information We Collect</h2>
                        <p>
                            We collect personal information that you voluntarily provide to us when you register on the website,
                            express an interest in obtaining information about us or our products and services, when you participate
                            in activities on the website, or otherwise when you contact us.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Names, phone numbers, and email addresses.</li>
                            <li>Date of birth and other demographic information found in insurance applications.</li>
                            <li>Health-related data necessary for policy underwriting.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#4E1686] mb-4">3. How We Use Your Information</h2>
                        <p>
                            We use personal information collected via our website for a variety of business purposes described below.
                            We process your personal information for these purposes in reliance on our legitimate business interests,
                            in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#4E1686] mb-4">4. Sharing Your Information</h2>
                        <p>
                            We may process or share your data that we hold based on the following legal basis: to facilitate the issuance of your insurance policy
                            with our partner insurance providers (e.g., Softlogic Life). We do not sell your data to third-party marketers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#4E1686] mb-4">5. Contact Us</h2>
                        <p>
                            If you have questions or comments about this policy, you may email us at support@coverme.lk.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
