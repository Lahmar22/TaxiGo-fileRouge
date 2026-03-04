import taxiLogo from "../assets/TaxiGo.png";
import { useState } from "react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-lg">

            <div className="max-w-7xl mx-auto px-4 md:px-6">

                <div className="flex items-center justify-between h-16 md:h-24">

                    {/* Logo */}
                    <img src={taxiLogo} alt="TaxiGo" className="h-14 md:h-20" />

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-12 flex-1 justify-center">
                        <a href="#services" className="text-gray-700 hover:text-yellow-600 transition-colors">Services</a>
                        <a href="#cities" className="text-gray-700 hover:text-yellow-600 transition-colors">Villes</a>
                        <a href="#features" className="text-gray-700 hover:text-yellow-600 transition-colors">Avantages</a>
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex space-x-4">
                        <a href="/login" className="border-2 border-yellow-500 text-yellow-600 px-6 py-2 rounded-full hover:bg-yellow-50 transition-colors">
                            Connexion
                        </a>

                        <a href="/register" className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-shadow">
                            Inscription
                        </a>
                    </div>

                    {/* Mobile Button */}
                    <button
                        className="md:hidden p-2 text-2xl text-gray-700 hover:text-yellow-600 transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        ☰
                    </button>

                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t bg-white shadow-xl animate-in">
                    <div className="px-4 py-4 space-y-3">

                        <a 
                            href="#services" 
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-colors"
                        >
                            Services
                        </a>

                        <a 
                            href="#cities" 
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-colors"
                        >
                            Villes
                        </a>

                        <a 
                            href="#features" 
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-colors"
                        >
                            Avantages
                        </a>

                        <div className="border-t pt-3 mt-3 space-y-2">

                            <a 
                                href="/login" 
                                className="block text-center border-2 border-yellow-500 text-yellow-600 py-2 px-4 rounded-full hover:bg-yellow-50 transition-colors text-sm"
                            >
                                Connexion
                            </a>

                            <a 
                                href="/register" 
                                className="block text-center bg-gradient-to-r from-yellow-500 to-amber-600 text-white py-2 px-4 rounded-full hover:shadow-lg transition-shadow text-sm"
                            >
                                Inscription
                            </a>

                        </div>
                    </div>
                </div>
            )}

        </nav>
    );
}