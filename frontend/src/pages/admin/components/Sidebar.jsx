import { Link, useLocation } from "react-router-dom";
import imagelogo from "../../../assets/TaxiGo.png";
import { logout } from "../../../api/AuthAPI";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { CiReceipt } from "react-icons/ci";
import { FaTaxi } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";


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
                            
                        </div>

                        <div>
                            <p className="text-white font-semibold text-sm">
                                Lahmar Zakariae
                            </p>
                            <p className="text-slate-400 text-xs">
                                Administrateur
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">

                    <Link to="/admin/dashboard" className={linkStyle("/admin/dashboard")}>
                        <MdDashboard className="w-5 h-5"/>
                        Tableau de bord
                    </Link>

                    <Link to="/admin/utilisateurs" className={linkStyle("/admin/utilisateurs")}>
                        <LuUsers className="w-5 h-5" />
                        Utilisateurs
                    </Link>

                    <Link to="/admin/reclamations" className={linkStyle("/admin/reclamations")}>
                        <CiReceipt className="w-5 h-5"/>
                        Réclamations
                    </Link>

                    <Link to="/admin/chauffeurs" className={linkStyle("/admin/chauffeurs")}>
                        <FaTaxi className="w-5 h-5"/>
                        Chauffeurs
                    </Link>

                    <Link to="/admin/courses" className={linkStyle("/admin/courses")}>
                        <FaRoute className="w-5 h-5"/>
                        Courses
                    </Link>

                    <Link to="/admin/profile" className={linkStyle("/admin/profile")}>
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