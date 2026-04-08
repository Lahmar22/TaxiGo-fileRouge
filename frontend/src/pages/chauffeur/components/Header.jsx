import { useState, useEffect } from "react";
import axios from "axios";

export default function Header({page, setOpenSidebar }) {

    const [online, setOnline] = useState(true);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));


    const toggleStatus = async (chauffeurId) => {
        try {
            const response = await axios.patch(
                `http://127.0.0.1:8000/api/chauffeur/${chauffeurId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setOnline(!online);

        } catch (error) {
            console.error(error);
        }
    };
               

    const today = new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 h-16 sticky top-0 z-20 px-4 lg:px-6 flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center">

                {/* Mobile menu */}
                <button
                    onClick={() => setOpenSidebar(true)}
                    className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition mr-3"
                >
                    <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Title */}
                <div>
                    <h1 className="text-slate-900 font-bold text-sm lg:text-lg">{page}</h1>
                    <p className="text-slate-400 text-xs capitalize">{today}</p>
                </div>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2 lg:gap-3">

                {/* Status */}
                <button
                    onClick={() => toggleStatus(user.chauffeur.id)}
                    className={`text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 transition
                    ${online
                        ? "bg-linear-to-br from-emerald-500 to-emerald-600"
                        : "bg-slate-400"
                    }`}
                >
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    {online ? "En ligne" : "Hors ligne"}
                </button>

                {/* Notifications */}
                <button className="relative p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11
                            a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341
                            C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214
                            1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6
                            0v-1m6 0H9" />
                    </svg>

                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

            </div>

        </header>
    );
}