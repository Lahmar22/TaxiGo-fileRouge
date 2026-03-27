import { Link, useLocation } from "react-router-dom";
import imagelogo from "../../../assets/TaxiGo.png";
import { logout } from "../../../api/AuthAPI";
import { GiCash } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";




export default function Sidebar({ open, setOpen }) {

    const location = useLocation();

    const linkStyle = (path) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
    ${location.pathname === path
            ? "bg-amber-500/10 text-amber-400"
            : "text-slate-300 hover:bg-white/5 hover:text-white"
        }`;

    return (
        <>
            {/* Overlay mobile */}
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition lg:hidden
                ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
            />

            <aside
                className={`
                    fixed lg:sticky top-0 left-0 z-40
                    h-screen
                    w-72 lg:w-64
                    bg-linear-to-b from-slate-900 to-[#1a2744]
                    border-r border-white/10 flex flex-col
                    transform transition duration-300

                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
                >

                {/* Logo */}
                <div className="py-6 border-b border-white/10">
                    <Link
                        to="/chauffeur/dashboard"
                        className="flex items-center justify-center"
                    >
                        <img src={imagelogo} alt="TaxiGo" className="w-32 object-contain" />
                    </Link>
                </div>

                {/* Profile */}
                <div className="px-6 py-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-linear-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center font-bold text-slate-900 text-sm">
                                AK
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-slate-900 rounded-full"></span>
                        </div>

                        <div>
                            <p className="text-white font-semibold text-sm">
                                Ahmed Karimi
                            </p>
                            <p className="text-slate-400 text-xs">
                                Chauffeur
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">

                    <Link to="/chauffeur/dashboard" className={linkStyle("/chauffeur/dashboard")}>
                        <MdDashboard className="w-5 h-5"/>
                        Tableau de bord
                    </Link>

                    <Link to="/chauffeur/history" className={linkStyle("/chauffeur/history")}>
                        <FaHistory className="w-5 h-5" />
                        Historique
                    </Link>

                    <Link to="/chauffeur/revenus" className={linkStyle("/chauffeur/revenus")}>
                        <GiCash className="w-5 h-5"/>
                        Revenus
                    </Link>

                    <Link to="/chauffeur/profile" className={linkStyle("/chauffeur/profile")}>
                        <CgProfile className="w-5 h-5"/>
                        Mon profil
                    </Link>

                </nav>

                {/* Logout */}
                <div className="px-4 py-5 border-t border-white/10">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition w-full"
                    >
                        <IoIosLogOut className="w-5 h-5" />
                           
                        Déconnexion
                    </button>
                </div>

            </aside>
        </>
    );
}