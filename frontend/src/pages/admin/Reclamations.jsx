import { useState, useEffect } from "react";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import {
    FaCheck,
    FaTrash,
    FaClock
} from "react-icons/fa";
import axios from "axios";



export default function Reclamations() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [reclamations, setReclamations] = useState([]);
    const [filter, setFilter] = useState("all");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchReclamations = async () => {
            try {
                const res = await axios.get(
                    "http://127.0.0.1:8000/api/reclamations",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setReclamations(res.data.reclamations);
                console.log("Réclamations chargées :", res.data.reclamations);
            } catch (err) {
                console.error("Erreur lors du chargement des réclamations :", err);
            }
        };

        fetchReclamations();
    }, []);

    // ── Actions ─────────────────────────
    const markAsResolved = (id) => {
        axios.patch(`http://127.0.0.1:8000/api/reclamations/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setReclamations(reclamations.map(r =>
                    r.id === id ? { ...r, status: "résolu" } : r
                ));
            })
            .catch((err) => {
                console.error("Erreur lors de la validation du chauffeur :", err);
            });
    };

    const deleteReclamation = (id) => {
        setReclamations(reclamations.filter(r => r.id !== id));
    };

    // ── Filter ─────────────────────────
    const filteredReclamations = reclamations.filter(r =>
        filter === "all" ? true : r.status === filter
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
                            className={`px-4 py-2 rounded-xl ${filter === "all"
                                    ? "bg-slate-800 text-white"
                                    : "bg-white shadow"
                                }`}
                        >
                            Toutes
                        </button>

                        <button
                            onClick={() => setFilter("en attente")}
                            className={`px-4 py-2 rounded-xl ${filter === "en attente"
                                    ? "bg-yellow-500 text-white"
                                    : "bg-white shadow"
                                }`}
                        >
                            En attente
                        </button>

                        <button
                            onClick={() => setFilter("résolu")}
                            className={`px-4 py-2 rounded-xl ${filter === "résolu"
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
                                        {r.client.user.first_name} {r.client.user.last_name}
                                    </p>
                                    <p className="text-slate-600 text-sm mb-2">
                                        {r.description}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {r.date_reclamation} <FaClock className="inline ml-1" />
                                    </p>

                                    {/* Status */}
                                    <span className={`inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full
                                        ${r.status === "résolue"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-yellow-100 text-yellow-600"}`}>
                                        {r.status}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">

                                    {r.status !== "résolue" && (
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