import { useState } from "react";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import { FaSearch } from "react-icons/fa";

// ── Mock courses ─────────────────────────
const MOCK_COURSES = [
    {
        id: 1,
        client: "Youssef B.",
        chauffeur: "Ahmed",
        depart: "Médina",
        destination: "Agdal",
        date: "27 Mars 2026",
        prix: 55,
        statut: "terminée"
    },
    {
        id: 2,
        client: "Sara K.",
        chauffeur: "Khalid",
        depart: "Hay Riad",
        destination: "Gare Rabat",
        date: "27 Mars 2026",
        prix: 35,
        statut: "en cours"
    },
    {
        id: 3,
        client: "Amine T.",
        chauffeur: "Omar",
        depart: "Salé",
        destination: "Centre Ville",
        date: "26 Mars 2026",
        prix: 40,
        statut: "annulée"
    }
];

export default function Courses() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [courses, setCourses] = useState(MOCK_COURSES);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    // ── Filter logic ─────────────────────────
    const filteredCourses = courses.filter(c =>
        (c.client.toLowerCase().includes(search.toLowerCase()) ||
         c.chauffeur.toLowerCase().includes(search.toLowerCase())) &&
        (filter === "all" || c.statut === filter)
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
                            <option value="terminée">Terminées</option>
                            <option value="en cours">En cours</option>
                            <option value="annulée">Annulées</option>
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
                                        <td className="p-3 font-semibold">{course.client}</td>
                                        <td className="p-3">{course.chauffeur}</td>

                                        <td className="p-3">
                                            {course.depart} → {course.destination}
                                        </td>

                                        <td className="p-3">{course.date}</td>

                                        <td className="p-3 font-bold text-green-600">
                                            {course.prix} DH
                                        </td>

                                        <td className="p-3">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full
                                                ${course.statut === "terminée"
                                                    ? "bg-green-100 text-green-600"
                                                    : course.statut === "en cours"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-red-100 text-red-600"}`}>
                                                {course.statut}
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