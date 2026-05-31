import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#002B5C] text-white py-12 border-t border-[#4E1686]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/">
                            <span className="text-2xl font-black tracking-tighter text-white cursor-pointer">
                                Coverme.lk
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Making insurance simple, transparent, and 100% digital for Sri Lanka.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-[#8CC63F]">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/quote" className="hover:text-white transition-colors">Get Quote</Link></li>
                            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-[#8CC63F]">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-[#8CC63F]">Contact</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>Email: support@coverme.lk</li>
                            <li>Phone: 077 334 0716</li>
                            <li>Colombo, Sri Lanka</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Coverme.lk. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
