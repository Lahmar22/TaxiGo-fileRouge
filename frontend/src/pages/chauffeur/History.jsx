import { useState, useEffect } from "react";
import Header from "../chauffeur/components/Header";
import Sidebar from "../chauffeur/components/Sidebar";
import axios from "axios";



export default function History() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [courses, setCourses] = useState([]);
    const [filter, setFilter] = useState("all");
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const [currentPage, setCurrentPage] = useState(1);
    const [statistiques, setStatistiques] = useState({
        total: 0,
        confirmed: 0,
        terminer: 0,
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 0,
        perPage: 10
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCourses(currentPage);
    }, [currentPage]);


    const fetchCourses = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/courses/chauffeur/${user.chauffeur.id}?page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    }
                }
            );

            setCourses(response.data.courses.data || []);
            console.log("Courses récupérées :", response.data.courses.data || []);
            setPagination({
                currentPage: response.data.courses.current_page || page,
                lastPage: response.data.courses.last_page || 1,
                total: response.data.courses.total || 0,
                perPage: response.data.courses.per_page || 10
            });

        } catch (error) {
            console.error("Erreur lors de la récupération des courses :", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchstats = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/statistiques/chauffeur/${user.chauffeur.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    }
                });
                setStatistiques({
                    total: response.data.totalCourse || 0,
                    confirmed: response.data.totalCourseConfirmer || 0,
                    terminer: response.data.totalCourseTerminer || 0,
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des statistiques :", error);
            }
        };

        

        fetchstats();
    }, [user.chauffeur.id, token]);
    const filteredTrips =
        filter === "all"
            ? courses
            : courses.filter((r) => r.status === filter);

    const stats = {
        total: statistiques.total,
        confirmed: statistiques.confirmed,
        terminer: statistiques.terminer
    };

    return (
        <>
            <div className="flex min-h-screen bg-slate-100">
                <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

                <div className="flex flex-col flex-1">
                    <Header page="Historique" setOpenSidebar={setOpenSidebar} />

                    <main className="flex-1 p-4 lg:p-6">
                        {/* Greeting */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-black text-slate-900">
                                Bonjour, <span className="text-amber-500">{user.first_name} {user.last_name}</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            <Card title="Total" value={stats.total} />
                            <Card title="Confirmées" value={stats.confirmed} />
                            <Card title="Terminées" value={stats.terminer} />
                        </div>
                        <div className="flex gap-2 mb-6 flex-wrap">
                            {[
                                "toutes",
                                "terminee",
                                "confirmee",
                                "en attente",
                                "annuler"
                            ].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition
                                    ${filter === f
                                            ? "bg-yellow-400 text-black shadow"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"}
                                `}
                                >
                                    {f === "toutes"
                                        ? "Toutes"
                                        : f === "terminee"
                                            ? "Terminées"
                                            : f === "confirmee"
                                                ? "Confirmées"
                                                : f === "en attente"
                                                    ? "En attente"
                                                    : "annuler"}
                                </button>
                            ))}
                        </div>
                        <div className="grid gap-4">
                            {/* TRIPS GRID */}
                            {filteredTrips.length === 0 ? (
                                <div className="bg-white rounded-2xl p-16 text-center border">
                                    <p className="font-semibold text-slate-500">
                                        Aucune course trouvée
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                                        {filteredTrips.map((trip) => (

                                            <div
                                                key={trip.id}
                                                className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition"
                                            >

                                                {/* TOP */}
                                                <div className="flex justify-between mb-3">
                                                    <div>
                                                        <p className="font-semibold text-slate-800 text-sm">
                                                            {trip.adresse_depart.split(',').slice(0, 2).join(', ')}
                                                        </p>
                                                        <p className="text-slate-400 text-xs">
                                                            → {trip.destination}
                                                        </p>
                                                    </div>

                                                    <span className={`text-xs px-3 py-1 rounded-full font-semibold
                                                    ${trip.status === "terminee" && "bg-emerald-100 text-emerald-600"}
                                                    ${trip.status === "confirmee" && "bg-blue-100 text-blue-600"}
                                                    ${trip.status === "en attente" && "bg-amber-100 text-amber-600"}
                                                    ${trip.status === "annuler" && "bg-red-100 text-red-600"}
                                                `}>
                                                        {trip.status}
                                                    </span>

                                                </div>

                                                {/* INFO */}
                                                <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3">
                                                    <span>{trip.date_course}</span>
                                                    {/* {trip.duration && <span>{trip.duration}</span>} */}
                                                </div>

                                                {/* PRICE */}
                                                <div className="text-lg font-black text-yellow-500 mb-3">
                                                    {Number(trip?.prix_course || 0).toFixed(2)} MAD
                                                </div>

                                                {/* DRIVER */}
                                                <div className="pt-3 border-t text-xs text-slate-500">
                                                    {trip.client
                                                        ? <>Client <span className="font-semibold text-slate-700">{trip.client.user.first_name} {trip.client.user.last_name}</span></>
                                                        : "Client non assigné"}
                                                </div>

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
                                        Page {pagination.currentPage} sur {pagination.lastPage} ({pagination.total} courses)
                                    </div>
                                </>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

function Card({ title, value }) {
    return (
        <div className="bg-white p-4 rounded-2xl shadow text-center">
            <p className="text-sm text-slate-500">{title}</p>
            <h3 className="text-xl font-bold text-slate-800">{value}</h3>
        </div>
    );
}