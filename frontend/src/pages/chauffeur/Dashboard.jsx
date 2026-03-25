import { useState } from "react";
import Header from "../chauffeur/components/Header";
import Sidebar from "../chauffeur/components/Sidebar";

// ── Mock reservations with status ─────────────────────────
const MOCK_RESERVATIONS = [
    {
        id: 1,
        client: "Youssef B.",
        pickup: "Médina, Rabat",
        dest: "Agdal, Rabat",
        fare: "55 MAD",
        status: "pending",
    },
    {
        id: 2,
        client: "Sara M.",
        pickup: "Hassan, Rabat",
        dest: "Hay Riad, Rabat",
        fare: "78 MAD",
        status: "pending",
    },
    {
        id: 3,
        client: "Karim A.",
        pickup: "Souissi, Rabat",
        dest: "Centre-Ville, Salé",
        fare: "95 MAD",
        status: "pending",
    },
];

export default function Dashboard() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [reservations, setReservations] = useState(MOCK_RESERVATIONS);

    // ── Handle accept/refuse ─────────────────────────
    const updateStatus = (id, newStatus) => {
        setReservations((prev) =>
            prev.map((res) =>
                res.id === id ? { ...res, status: newStatus } : res
            )
        );
    };

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

            <div className="flex flex-col flex-1">
                <Header setOpenSidebar={setOpenSidebar} />

                <main className="flex-1 p-4 lg:p-6">
                    {/* Greeting */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-slate-900">
                            Bonjour, <span className="text-amber-500">Ahmed</span> 👋
                        </h2>
                    </div>

                    {/* Reservations List */}
                    <div className="grid gap-4">
                        {reservations.length > 0 ? (

                            reservations.map((res) => (
                                <div
                                    key={res.id}
                                    className="bg-white p-4 rounded-2xl shadow flex flex-col md:flex-row md:items-center md:justify-between"
                                >
                                    {/* Info */}
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-800">
                                            {res.client}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {res.pickup} → {res.dest}
                                        </p>
                                        <p className="text-sm font-semibold text-amber-500">
                                            {res.fare}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-3 md:mt-0 flex gap-2 items-center">
                                        {res.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        updateStatus(res.id, "accepted")
                                                    }
                                                    className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm hover:bg-green-600"
                                                >
                                                    Accepter
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(res.id, "refused")
                                                    }
                                                    className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm hover:bg-red-600"
                                                >
                                                    Refuser
                                                </button>
                                            </>
                                        )}

                                        {res.status === "accepted" && (
                                            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                                                Acceptée
                                            </span>
                                        )}

                                        {res.status === "refused" && (
                                            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                                                Refusée
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))

                        ) : (

                            <div className="flex items-center justify-center h-64">
                                <p className="text-slate-500">Aucune réservation</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}