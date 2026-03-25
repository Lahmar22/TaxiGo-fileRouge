import taxiLogo from "../assets/TaxiGo.png";
import { useState } from "react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-slate-100 shadow-md">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <img 
                        src={taxiLogo} 
                        alt="TaxiGo" 
                        className="h-12 md:h-16 object-contain"
                    />

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a 
                            href="/login" 
                            className="border-2 border-yellow-500 text-yellow-600 px-5 py-2 rounded-full hover:bg-yellow-50 transition"
                        >
                            Connexion
                        </a>

                        <a 
                            href="/register" 
                            className="bg-linear-to-r from-yellow-500 to-amber-600 text-white px-5 py-2 rounded-full hover:shadow-lg transition"
                        >
                            Inscription
                        </a>
                    </div>

                    {/* Mobile Button */}
                    <button
                        className="md:hidden p-2 text-2xl text-gray-700 hover:text-yellow-600 transition"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${
                    mobileOpen ? "max-h-96 border-t" : "max-h-0"
                }`}
            >
                <div className="px-4 py-4 space-y-3">
                    <div className="space-y-2">

                        <a 
                            href="/login"
                            className="block text-center border-2 border-yellow-500 text-yellow-600 py-2 rounded-full hover:bg-yellow-50 transition text-sm"
                        >
                            Connexion
                        </a>

                        <a 
                            href="/register"
                            className="block text-center bg-linear-to-r from-yellow-500 to-amber-600 text-white py-2 rounded-full hover:shadow-lg transition text-sm"
                        >
                            Inscription
                        </a>

                    </div>
                </div>
            </div>
        </nav>
    );
}