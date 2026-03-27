import Sidebar from "../client/components/Sidebar";
import Header from "../client/components/Header";
import { useState } from "react";
export default function History() {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [openSidebar, setOpenSidebar] = useState(false);

    const trips = [
        {
            id: 1,
            from: "Casablanca Centre",
            to: "Aéroport Mohammed V",
            date: "10 Mars 2026 – 06:30",
            duration: "~35 min",
            price: 120,
            status: "upcoming",
            driver: "Mohammed K.",
            initials: "MK",
        },
        {
            id: 2,
            from: "Médina, Rabat",
            to: "Agdal, Rabat",
            date: "14 Mars 2026 – 09:00",
            price: 55,
            status: "pending",
            driver: null,
        },
        {
            id: 3,
            from: "Mosquée Hassan II",
            to: "Gare Casa Voyageurs",
            date: "3 Mars 2026 – 14:20",
            duration: "18 min",
            price: 45,
            status: "completed",
            driver: "Youssef B.",
            initials: "YB",
        },
        {
            id: 4,
            from: "Jardin Majorelle",
            to: "Palais Bahia, Marrakech",
            date: "28 Fév. 2026 – 11:00",
            price: 35,
            status: "completed",
            driver: "Hassan A.",
            initials: "HA",
        },
    ];
    const filteredTrips = trips.filter((t) => {
        const matchFilter = filter === "all" || t.status === filter;
        const matchSearch =
            (t.from + t.to).toLowerCase().includes(search.toLowerCase());

        return matchFilter && matchSearch;
    });

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

            <div className="flex flex-col flex-1">

                <Header page="Historique" setOpenSidebar={setOpenSidebar} />

                <main className="flex-1 p-6 space-y-6">

                    {/* PAGE HEADER */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-black text-slate-900">
                            Mes <span className="text-yellow-500">courses</span>
                        </h2>
                        <p className="text-slate-500 mt-1">
                            Retrouvez toutes vos réservations passées et à venir
                        </p>
                    </div>

                    {/* SEARCH + FILTER CARD */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6">

                        <div className="relative mb-4">
                            <input
                                placeholder="Rechercher une destination ou un chauffeur..."
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">

                            {["all", "completed", "upcoming", "pending", "cancelled"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition
                                        ${filter === f
                                            ? "bg-yellow-400 text-black shadow"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"}
                                    `}
                                    >
                                    {f}
                                </button>
                            ))}

                        </div>

                    </div>

                    {/* TRIPS GRID */}
                    {filteredTrips.length === 0 ? (
                        <div className="bg-white rounded-2xl p-16 text-center border">
                            <p className="font-semibold text-slate-500">
                                Aucune course trouvée
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                            {filteredTrips.map((trip) => (

                                <div
                                    key={trip.id}
                                    className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition"
                                >

                                    {/* TOP */}
                                    <div className="flex justify-between mb-3">
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm">
                                                {trip.from}
                                            </p>
                                            <p className="text-slate-400 text-xs">
                                                → {trip.to}
                                            </p>
                                        </div>

                                        <span className={`text-xs px-3 py-1 rounded-full font-semibold
                                                ${trip.status === "completed" && "bg-emerald-100 text-emerald-600"}
                                                ${trip.status === "upcoming" && "bg-blue-100 text-blue-600"}
                                                ${trip.status === "pending" && "bg-amber-100 text-amber-600"}
                                                ${trip.status === "cancelled" && "bg-red-100 text-red-600"}
                                            `}>
                                            {trip.status}
                                        </span>

                                    </div>

                                    {/* INFO */}
                                    <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3">
                                        <span>{trip.date}</span>
                                        {trip.duration && <span>{trip.duration}</span>}
                                    </div>

                                    {/* PRICE */}
                                    <div className="text-lg font-black text-yellow-500 mb-3">
                                        {trip.price} MAD
                                    </div>

                                    {/* DRIVER */}
                                    <div className="pt-3 border-t text-xs text-slate-500">
                                        {trip.driver
                                            ? <>Chauffeur <span className="font-semibold text-slate-700">{trip.driver}</span></>
                                            : "Chauffeur non assigné"}
                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

                </main>

            </div>

        </div>
    );
}