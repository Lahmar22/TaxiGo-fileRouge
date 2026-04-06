import { useState, useEffect } from "react";
import Header from "../chauffeur/components/Header";
import Sidebar from "../chauffeur/components/Sidebar";
import { FaSpinner } from "react-icons/fa";

const MOCK_RESERVATIONS = [
    
    {
        id: 2,
        client: "Sara M.",
        pickup: "Hassan, Rabat",
        dest: "Hay Riad, Rabat",
        fare: "78 MAD",
        status: "accepted",
    },
    {
        id: 3,
        client: "Karim A.",
        pickup: "Souissi, Rabat",
        dest: "Centre-Ville, Salé",
        fare: "95 MAD",
        status: "refused",
    },
];

export default function Dashboard() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [reservations, setReservations] = useState(MOCK_RESERVATIONS);
    const user = JSON.parse(localStorage.getItem("user"));


    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

            <div className="flex flex-col flex-1">
                <Header page="Tableau de bord" setOpenSidebar={setOpenSidebar} />

                <main className="flex-1 p-4 lg:p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-slate-900">
                            Bonjour, <span className="text-amber-500">{user.first_name} {user.last_name}</span>
                        </h2>
                        <p className="text-slate-500">
                            Courses disponibles pour le chauffeur aujourd’hui :
                        </p>
                    </div>

                

                    {/* 🔄 Driver en attente */}
                    {reservations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                            <FaSpinner className="animate-spin text-4xl text-blue-500" />
                            <p className="text-slate-600">
                                En attente de nouvelles réservations...
                            </p>
                        </div>
                    ) : (
                        /* 📦 Réservations disponibles */
                        <div className="grid gap-4">
                            {reservations.map((res) => (
                                <div
                                    key={res.id}
                                    className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-semibold">
                                            📍 {res.pickup} → {res.dest}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            Client : {res.client}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="bg-green-500 text-white px-3 py-1 rounded">
                                            Accepter
                                        </button>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded">
                                            Refuser
                                        </button>
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