'use client';

import HeroCarousel from '@/components/HeroCarousel';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-gray-50 text-[#002B5C]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100 transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4E1686] to-[#8CC63F] flex items-center justify-center text-white font-bold text-lg">
              L
            </div>
            <span className="text-xl font-bold text-[#002B5C] tracking-tight">Life Insurance</span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-[#4E1686] transition-colors duration-200">Home</a>
            <a href="#" className="hover:text-[#4E1686] transition-colors duration-200">Plans</a>
            <a href="#" className="hover:text-[#4E1686] transition-colors duration-200">About</a>
            <a href="#" className="hover:text-[#4E1686] transition-colors duration-200">Contact</a>
          </nav>
          <a href="/quote" className="hidden md:inline-block bg-[#4E1686] hover:bg-[#3d1169] text-white text-sm font-bold py-2 px-6 rounded-full transition shadow-md hover:shadow-lg">
            Get Quote
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] min-h-screen flex items-center pt-32 pb-40 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-10">
              <div className="inline-block bg-purple-100/80 backdrop-blur-sm text-[#4E1686] px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase shadow-sm border border-purple-200/50">
                100% Online Process
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-[#002B5C] leading-[0.9] tracking-tighter">
                Secure <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8CC63F] to-[#4E1686]">Your</span> Future
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light tracking-wide">
                Designed for busy professionals and their families. Experience a fully digital onboarding process with zero paperwork.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-6">
                <a href="/quote" className="group bg-[#8CC63F] hover:bg-[#7ab332] text-white text-lg font-bold py-5 px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3">
                  Get Quote
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <a href="#" className="text-[#002B5C] font-bold py-5 px-10 rounded-full border-2 border-gray-200 hover:border-[#4E1686] hover:text-[#4E1686] transition-all duration-300 flex items-center justify-center">
                  Learn More
                </a>
              </div>
              <div className="pt-10 flex items-center justify-center lg:justify-start gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#8CC63F]"></div>
                  <span>Instant Approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#4E1686]"></div>
                  <span>24/7 Digital Support</span>
                </div>
              </div>
            </div>

            {/* Hero Feature Cards (Carousel) */}
            <div className="w-full lg:w-1/2 relative flex items-center justify-center">
              <HeroCarousel />

              {/* Decorative Background Blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[500px] max-h-[500px] z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#8CC63F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4E1686] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* "Create Your Own Plan" Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-[#002B5C] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-4 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Build Your Perfect Coverage</h2>
                <p className="text-gray-300 text-lg">
                  No two lives are the same. Select only what you need. Customize your coverage amounts, add riders, and adjust benefits to perfectly fit your lifestyle and budget.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a href="/quote" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-[#002B5C] bg-white hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 gap-2">
                  Start Customizing <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002B5C] text-gray-300 py-8 text-center text-sm">
        <div className="container mx-auto px-4">
          <p className="mb-2">&copy; {new Date().getFullYear()} Life Insurance Agent. All Rights Reserved.</p>
          <p>Protecting what matters most.</p>
        </div>
      </footer>
    </div>
  );
}
