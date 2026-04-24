import { useState, useEffect } from "react";
import Header from "../chauffeur/components/Header";
import Sidebar from "../chauffeur/components/Sidebar";
import { FaMoneyBillWave, FaCalendarDay, FaCalendarWeek } from "react-icons/fa";
import axios from "axios";



export default function Revenus() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [statistiques, setStatistiques] = useState({
        revenuTotal: 0,
    });
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const [revenus, setRevenus] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 0,
        perPage: 10
    });
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchstats = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/statistiques/chauffeur/${user.chauffeur.id}/revenu  `, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    }
                });
                setStatistiques({
                    revenuTotal: response.data.revenu || 0,
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des statistiques :", error);
            }
        };


        fetchstats();
        fetchRevenus(1);
    }, [user.chauffeur.id, token]);

    useEffect(() => {
        fetchRevenus(currentPage);
    }, [currentPage]);

    const fetchRevenus = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/courses/chauffeur/${user.chauffeur.id}/revenu?page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    }
                }
            );

            setRevenus(response.data.revenu.data || []);
            setPagination({
                currentPage: response.data.revenu.current_page || page,
                lastPage: response.data.revenu.last_page || 1,
                total: response.data.revenu.total || 0,
                perPage: response.data.revenu.per_page || 10
            });

        } catch (error) {
            console.error("Erreur lors de la récupération des courses :", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

            <div className="flex flex-col flex-1">
                <Header page="Revenus" setOpenSidebar={setOpenSidebar} />

                <main className="flex-1 p-4 lg:p-6">
                    
                    {/* ── Header ── */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-slate-900">
                            Bonjour, <span className="text-amber-500">Ahmed</span>
                        </h2>
                        <p className="text-slate-500">
                            Voici un résumé de vos revenus aujourd’hui :
                        </p>
                    </div>

                    {/* ── Cards revenus ── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        
                        {/* Jour */}
                        <div className="bg-white rounded-2xl p-5 shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <FaCalendarDay className="text-amber-500 text-xl" />
                                <h3 className="font-semibold text-slate-700">Aujourd’hui</h3>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">
                                {Number(statistiques.revenuTotal).toFixed(2)} DH
                            </p>
                        </div>

                        {/* Semaine */}
                        <div className="bg-white rounded-2xl p-5 shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <FaCalendarWeek className="text-blue-500 text-xl" />
                                <h3 className="font-semibold text-slate-700">Cette semaine</h3>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">
                                {Number(statistiques.revenuTotal).toFixed(2)} DH
                            </p>
                        </div>

                        {/* Total */}
                        <div className="bg-white rounded-2xl p-5 shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <FaMoneyBillWave className="text-green-500 text-xl" />
                                <h3 className="font-semibold text-slate-700">Total</h3>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">
                                {Number(statistiques.revenuTotal).toFixed(2)} DH
                            </p>
                        </div>
                    </div>

                    {/* ── Liste des courses ── */}
                    <div className="bg-white rounded-2xl shadow p-5">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">
                            Historique des revenus
                        </h3>

                        <div className="grid gap-4">
                            {/* TRIPS GRID */}
                            {revenus.length === 0 ? (
                                <div className="bg-white rounded-2xl p-16 text-center border">
                                    <p className="font-semibold text-slate-500">
                                        Aucune revenus 
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-3">

                                        {revenus.map((trip) => (

                                            <div
                                                key={trip.id}
                                                className="flex justify-between items-center border-b pb-3 hover:bg-slate-50 p-3 rounded transition"
                                            >

                                                <div>
                                                    <p className="font-semibold text-slate-800">
                                                        {trip.adresse_depart.split(',').slice(0, 2).join(', ')} → {trip.destination}
                                                    </p>
                                                    <p className="text-sm text-slate-500">
                                                        {trip.client ? `${trip.client.user.first_name} ${trip.client.user.last_name}` : "Client non assigné"} • {trip.date_course}
                                                    </p>
                                                </div>

                                                <span className="text-green-600 font-bold text-lg">
                                                    +{Number(trip?.prix_course || 0).toFixed(2)} DH
                                                </span>

                                            </div>

                                        ))}

                                    </div>

                                    {/* PAGINATION */}
                                    <div className="flex items-center justify-center gap-2 mt-8">
                                        <button
                                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1 || loading}
                                            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                        >
                                            ← Précédent
                                        </button>

                                        <div className="flex gap-1">
                                            {Array.from({ length: pagination.lastPage }, (_, i) => i + 1).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    disabled={loading}
                                                    className={`px-3 py-2 rounded-lg font-semibold transition ${currentPage === page
                                                        ? "bg-yellow-400 text-black shadow"
                                                        : "border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50"
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => setCurrentPage(Math.min(pagination.lastPage, currentPage + 1))}
                                            disabled={currentPage === pagination.lastPage || loading}
                                            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                        >
                                            Suivant →
                                        </button>
                                    </div>

                                    <div className="text-center text-sm text-slate-500 mt-4">
                                        Page {pagination.currentPage} sur {pagination.lastPage} ({pagination.total} revenus au total)
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}