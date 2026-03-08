import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="bg-gradient-to-b from-slate-900 to-[#1a2744] border-r border-amber-500/10 min-h-screen w-64 flex flex-col fixed top-0 left-0 z-40 transition-transform">

            {/* Logo */}
            <div className="px-6 py-6 border-b border-white/10">
                <Link to="/" className="flex items-center gap-3">

                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">

                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5S16.67 13 17.5 13s1.5.67 1.5 1.5S18.33 16 17.5 16zM5 11l1.5-4.5h11L19 11H5z" />
                        </svg>

                    </div>

                    <span className="text-xl font-bold text-white tracking-tight">
                        Taxi<span className="text-yellow-400">Go</span>
                    </span>

                </Link>
            </div>

            {/* Profile */}
            <div className="px-6 py-5 border-b border-white/10">

                <div className="flex items-center gap-3">

                    <div className="relative">

                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center font-bold text-slate-900 text-sm">
                            AK
                        </div>

                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-slate-900 rounded-full"></span>

                    </div>

                    <div>
                        <p className="text-white font-semibold text-sm">
                            Ahmed Karimi
                        </p>
                        <p className="text-slate-400 text-xs">
                            Client Premium
                        </p>
                    </div>

                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-5 space-y-1">

                <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
                    Principal
                </p>

                <Link to="/dashboard" className="sidebar-link">

                    Tableau de bord
                </Link>

                <Link to="/history" className="sidebar-link">

                    Historique
                    <span className="sidebar-badge">12</span>
                </Link>

                <div className="pt-4">
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
                        Compte
                    </p>
                </div>

                <Link to="/profile" className="sidebar-link">

                    Mon profil
                </Link>

                <Link to="/settings" className="sidebar-link">

                    Paramètres
                </Link>

            </nav>

            {/* Logout */}
            <div className="px-4 py-5 border-t border-white/10">

                <button className="sidebar-link text-red-400 hover:!text-red-300 hover:!bg-red-400/10 w-full">

                    Déconnexion
                </button>

            </div>

        </aside>
    );
}
