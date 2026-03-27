import { useState } from "react";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import {
    FaCheck,
    FaTrash,
    FaClock
} from "react-icons/fa";

// ── Mock Réclamations ─────────────────────────
const MOCK_RECLAMATIONS = [
    {
        id: 1,
        client: "Youssef B.",
        message: "Le chauffeur est arrivé en retard.",
        date: "27 Mars 2026",
        statut: "en attente"
    },
    {
        id: 2,
        client: "Sara K.",
        message: "Problème de paiement.",
        date: "26 Mars 2026",
        statut: "résolu"
    },
    {
        id: 3,
        client: "Amine T.",
        message: "Course annulée sans raison.",
        date: "25 Mars 2026",
        statut: "en attente"
    }
];

export default function Reclamations() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [reclamations, setReclamations] = useState(MOCK_RECLAMATIONS);
    const [filter, setFilter] = useState("all");

    // ── Actions ─────────────────────────
    const markAsResolved = (id) => {
        setReclamations(reclamations.map(r =>
            r.id === id ? { ...r, statut: "résolu" } : r
        ));
    };

    const deleteReclamation = (id) => {
        setReclamations(reclamations.filter(r => r.id !== id));
    };

    // ── Filter ─────────────────────────
    const filteredReclamations = reclamations.filter(r =>
        filter === "all" ? true : r.statut === filter
    );

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

            <div className="flex flex-col flex-1">
                <Header page="Réclamations" setOpenSidebar={setOpenSidebar} />

                <main className="flex-1 p-4 lg:p-6">

                    {/* ── Header ── */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-slate-900">
                            Gestion des Réclamations 
                        </h2>
                        <p className="text-slate-500">
                            Suivez et traitez les réclamations des clients
                        </p>
                    </div>

                    {/* ── Filters ── */}
                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 rounded-xl ${
                                filter === "all"
                                    ? "bg-slate-800 text-white"
                                    : "bg-white shadow"
                            }`}
                        >
                            Toutes
                        </button>

                        <button
                            onClick={() => setFilter("en attente")}
                            className={`px-4 py-2 rounded-xl ${
                                filter === "en attente"
                                    ? "bg-yellow-500 text-white"
                                    : "bg-white shadow"
                            }`}
                        >
                            En attente
                        </button>

                        <button
                            onClick={() => setFilter("résolu")}
                            className={`px-4 py-2 rounded-xl ${
                                filter === "résolu"
                                    ? "bg-green-500 text-white"
                                    : "bg-white shadow"
                            }`}
                        >
                            Résolues
                        </button>
                    </div>

                    {/* ── Liste ── */}
                    <div className="space-y-4">
                        {filteredReclamations.map(r => (
                            <div
                                key={r.id}
                                className="bg-white rounded-2xl shadow p-5 flex justify-between items-start"
                            >
                                <div>
                                    <p className="font-semibold text-slate-800">
                                        {r.client}
                                    </p>
                                    <p className="text-slate-600 text-sm mb-2">
                                        {r.message}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {r.date}
                                    </p>

                                    {/* Status */}
                                    <span className={`inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full
                                        ${r.statut === "résolu"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-yellow-100 text-yellow-600"}`}>
                                        {r.statut}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">

                                    {r.statut !== "résolu" && (
                                        <button
                                            onClick={() => markAsResolved(r.id)}
                                            className="p-2 bg-green-500 text-white rounded-lg"
                                            title="Marquer comme résolu"
                                        >
                                            <FaCheck />
                                        </button>
                                    )}

                                    <button
                                        onClick={() => deleteReclamation(r.id)}
                                        className="p-2 bg-slate-800 text-white rounded-lg"
                                        title="Supprimer"
                                    >
                                        <FaTrash />
                                    </button>

                                </div>
                            </div>
                        ))}

                        {filteredReclamations.length === 0 && (
                            <p className="text-center text-slate-500">
                                Aucune réclamation trouvée
                            </p>
                        )}
                    </div>

                </main>
            </div>
        </div>
    );
}