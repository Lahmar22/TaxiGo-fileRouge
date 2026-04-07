import { useState, useEffect } from "react";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

// ── Mock courses ─────────────────────────

export default function Courses() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [courses, setCourses] = useState([]); 
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get(
                    "http://127.0.0.1:8000/api/courses",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCourses(res.data.courses);
            } catch (err) {
                console.error("Erreur lors du chargement des courses :", err);
            }
        };

        fetchCourses();
    }, []);

    // ── Filter logic ─────────────────────────
    const filteredCourses = courses.filter(c =>
        (c.client.user.last_name.toLowerCase().includes(search.toLowerCase()) ||
         c.chauffeur.user.last_name.toLowerCase().includes(search.toLowerCase())) &&
        (filter === "all" || c.status === filter)
    );

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

            <div className="flex flex-col flex-1">
                <Header page="Courses" setOpenSidebar={setOpenSidebar} />

                <main className="flex-1 p-4 lg:p-6">

                    {/* ── Header ── */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-slate-900">
                            Gestion des courses
                        </h2>
                        <p className="text-slate-500">
                            Consultez toutes les courses de la plateforme
                        </p>
                    </div>

                    {/* ── Filters ── */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">

                        {/* Search */}
                        <div className="flex items-center bg-white rounded-xl px-3 py-2 shadow w-full md:w-1/2">
                            <FaSearch className="text-slate-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Rechercher client ou chauffeur..."
                                className="outline-none w-full"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            className="bg-white rounded-xl px-3 py-2 shadow"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">Tous</option>
                            <option value="terminee">Terminées</option>
                            <option value="en attente">En attente</option>
                            <option value="annulee">Annulées</option>
                        </select>
                    </div>

                    {/* ── Table ── */}
                    <div className="bg-white rounded-2xl shadow overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-100 text-slate-600 text-sm">
                                <tr>
                                    <th className="p-3">Client</th>
                                    <th className="p-3">Chauffeur</th>
                                    <th className="p-3">Trajet</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Prix</th>
                                    <th className="p-3">Statut</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredCourses.map(course => (
                                    <tr key={course.id} className="border-t">
                                        <td className="p-3 font-semibold">{course.client.user.last_name}</td>
                                        <td className="p-3">{course.chauffeur.user.last_name}</td>

                                        <td className="p-3">
                                            {course.adresse_depart} → {course.destination}
                                        </td>

                                        <td className="p-3">{course.date_course}</td>

                                        <td className="p-3 font-bold text-green-600">
                                            {course.prix_course} DH
                                        </td>

                                        <td className="p-3">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full
                                                ${course.status === "terminée"
                                                    ? "bg-green-100 text-green-600"
                                                    : course.status === "en cours"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-red-100 text-red-600"}`}>
                                                {course.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredCourses.length === 0 && (
                            <p className="p-4 text-center text-slate-500">
                                Aucune course trouvée
                            </p>
                        )}
                    </div>

                </main>
            </div>
        </div>
    );
}