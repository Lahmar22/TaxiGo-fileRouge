import logoimage from "../assets/TaxiGo.png";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer className="bg-slate-900 text-white pt-16 pb-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">

                        {/* BRAND */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5S16.67 13 17.5 13s1.5.67 1.5 1.5S18.33 16 17.5 16zM5 11l1.5-4.5h11L19 11H5z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold">
                                    Taxi<span className="text-yellow-400">Go</span>
                                </span>
                            </div>

                            <p className="text-slate-400 text-sm leading-relaxed mb-5">
                                Votre partenaire de confiance pour tous vos déplacements au Maroc.
                            </p>

                            <div className="flex gap-3">
                                <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-yellow-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 text-sm font-bold">f</a>
                                <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-yellow-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 text-sm font-bold">𝕏</a>
                                <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-yellow-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 text-sm font-bold">in</a>
                                <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-pink-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 text-sm font-bold">ig</a>
                            </div>
                        </div>

                        {/* SERVICES */}
                        <div>
                            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">
                                Services
                            </h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-slate-400 text-sm transition-colors duration-200 hover:text-yellow-400">Réservation immédiate</a></li>
                                <li><a href="#" className="text-slate-400 text-sm transition-colors duration-200 hover:text-yellow-400">Courses longues distances</a></li>
                                <li><a href="#" className="text-slate-400 text-sm transition-colors duration-200 hover:text-yellow-400">Transferts aéroport</a></li>
                                <li><a href="#" className="text-slate-400 text-sm transition-colors duration-200 hover:text-yellow-400">Service entreprises</a></li>
                            </ul>
                        </div>

                        {/* COMPANY */}
                        <div>
                            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">
                                Société
                            </h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-slate-400 text-sm transition-colors duration-200 hover:text-yellow-400">À propos de nous</a></li>
                                <li><a href="#" className="text-slate-400 text-sm transition-colors duration-200 hover:text-yellow-400">Carrières</a></li>
                                <li><a href="#" className="text-slate-400 text-sm transition-colors duration-200 hover:text-yellow-400">Devenir chauffeur</a></li>
                                <li><a href="#" className="text-slate-400 text-sm transition-colors duration-200 hover:text-yellow-400">Contactez-nous</a></li>
                            </ul>
                        </div>

                        {/* CONTACT */}
                        <div>
                            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">
                                Contact
                            </h3>

                            <ul className="space-y-3 text-slate-400 text-sm">
                                <li className="flex items-center gap-2">
                                    <svg
                                        className="w-4 h-4 text-yellow-400 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    +212 5XX-XXXXXX
                                </li>

                                <li className="flex items-center gap-2">
                                    <svg
                                        className="w-4 h-4 text-yellow-400 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    contact@taxigo.ma
                                </li>

                                <li className="flex items-start gap-2">
                                    <svg
                                        className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    Casablanca, Maroc
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* BOTTOM */}
                    <div className="border-slate-800 pt-8 flex sm:flex-row items-center justify-between gap-4">
                        <p className="text-slate-500 text-sm">
                            © {currentYear} TaxiGo. Tous droits réservés.
                        </p>

                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-slate-400 text-sm transition-colors duration-200 hover:text-yellow-400">Confidentialité</a>
                            <a href="#" className="text-slate-400 text-sm transition-colors duration-200 hover:text-yellow-400">Conditions d'utilisation</a>
                            <a href="#" className="text-slate-400 text-sm transition-colors duration-200 hover:text-yellow-400">Cookies</a>
                        </div>
                    </div>

                </div>
            </footer>
        </>
    );
}