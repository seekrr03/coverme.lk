'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import WhatsAppButton from '@/components/WhatsAppButton';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans bg-gray-50 text-[#002B5C]">
      {/* Header */}
      {/* Header Container */}
      <header className="w-full z-50 relative shadow-md bg-white">
        {/* Main Navbar - White */}
        <div className="py-4 border-b border-gray-100">
          <div className="container mx-auto px-6 flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <span className="text-3xl font-black tracking-tighter text-[#002B5C] drop-shadow-sm hover:scale-105 transition-transform duration-300 cursor-pointer block">
                Coverme.lk
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 font-semibold text-gray-600">
              <Link href="/" className="hover:text-[#4E1686] transition-colors text-[#4E1686]">Home</Link>
              <Link href="#features" className="hover:text-[#4E1686] transition-colors">Features</Link>
              <Link href="#how-it-works" className="hover:text-[#4E1686] transition-colors">How it Works</Link>
              <Link href="/quote" className="bg-[#4E1686] text-white px-6 py-2 rounded-full hover:bg-[#3d126b] transition-colors shadow-md">Get Quote</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-50 text-[#002B5C] p-2 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div className={`md:hidden fixed inset-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
            <nav className="flex flex-col items-center space-y-8 text-2xl font-bold text-[#002B5C]">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#4E1686] transition-colors">Home</Link>
              <Link href="#features" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#4E1686] transition-colors">Features</Link>
              <Link href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#4E1686] transition-colors">How it Works</Link>
              <Link href="/quote" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#8CC63F] text-white px-10 py-4 rounded-full shadow-lg hover:bg-[#7ab332] transition-colors">Get Quote</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100 via-white to-green-100 min-h-[calc(100vh-80px)] flex items-center py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center gap-10">
            {/* Text Content */}
            <div className="w-full max-w-5xl text-center space-y-8 md:space-y-12">
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-[#002B5C] leading-[1.1] lg:leading-[0.9] tracking-tighter">
                Secure <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8CC63F] to-[#4E1686]">Your</span> Future
              </h1>
              <p className="text-base sm:text-lg lg:text-2xl text-gray-900 lg:text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium lg:font-light tracking-wide px-4">
                Designed for busy professionals and their families. Experience a fully digital onboarding process with zero paperwork on Coverme.lk.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center pt-4 sm:pt-8 px-6">
                <a href="/quote" className="group bg-[#8CC63F] hover:bg-[#7ab332] text-white text-lg font-bold py-4 px-8 sm:py-5 sm:px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
                  Get Quote
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <a href="#features" className="text-[#002B5C] font-bold text-lg py-4 px-8 sm:py-5 sm:px-10 rounded-full border-2 border-gray-200 hover:border-[#4E1686] hover:text-[#4E1686] transition-all duration-300 flex items-center justify-center w-full sm:w-auto">
                  Learn More
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Features Section */}
      <div id="features">
        <FeaturesSection />
      </div>

      {/* How It Works Section */}
      <div id="how-it-works">
        <HowItWorksSection />
      </div>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />




    </div>
  );
}
