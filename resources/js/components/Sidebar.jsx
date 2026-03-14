import { Link, useLocation } from "react-router-dom";
import imagelogo from "../assets/TaxiGo.png";
import { logout } from "../api/AuthAPI"; 

export default function Sidebar() {

  const location = useLocation();

  const linkStyle = (path) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition
    ${
      location.pathname === path
        ? "bg-amber-500/10 text-amber-400"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <aside className="bg-gradient-to-b from-slate-900 to-[#1a2744] border-r border-white/10 min-h-screen w-64 flex flex-col fixed top-0 left-0 z-40">

      {/* Logo */}
      <div className="py-6 border-b border-white/10">
        <Link to="/" className="flex items-center justify-center">
          <img src={imagelogo} alt="TaxiGo" className="w-32 object-contain" />
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
      <nav className="flex-1 px-4 py-6 space-y-2">

        {/* Dashboard */}
        <Link to="/client/dashboard" className={linkStyle("/dashboard")}>

          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M3 13h8V3H3v10zM13 21h8v-6h-8v6zM13 3v8h8V3h-8zM3 21h8v-6H3v6z" />
          </svg>

          Tableau de bord
        </Link>

        {/* History */}
        <Link to="/client/history" className={linkStyle("/history")}>

          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 8v4l3 3M12 4a8 8 0 108 8" />
          </svg>

          Historique
        </Link>

        {/* Section */}
        <div className="pt-6">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest px-2 mb-3">
            Compte
          </p>
        </div>

        {/* Profile */}
        <Link to="/client/profile" className={linkStyle("/profile")}>

          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M5.121 17.804A7.5 7.5 0 0112 15a7.5 7.5 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>

          Mon profil
        </Link>

      </nav>

      {/* Logout */}
      <div className="px-4 py-5 border-t border-white/10">

        <button onClick={logout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition w-full">

          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V3" />
          </svg>

          Déconnexion
        </button>

      </div>

    </aside>
  );
}