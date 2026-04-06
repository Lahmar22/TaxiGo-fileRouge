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

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/courses", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setCourses(res.data.courses)
            })
            .catch(err => console.log(err));
    }, []);

    const filteredCourses =
        filter === "all"
            ? courses
            : courses.filter((r) => r.status === filter);

    // ── Stats ─────────────────────────
    const stats = {
        total: courses.length,
        pending: courses.filter((r) => r.status === "pending").length,
        accepted: courses.filter((r) => r.status === "accepted").length,
        refused: courses.filter((r) => r.status === "refused").length,
    };

    const styles = {
        pending: "bg-yellow-100 text-yellow-600 px-3 py-1 rounded-xl",
        accepted: "bg-green-100 text-green-600 px-3 py-1 rounded-xl",
        refused: "bg-red-100 text-red-600 px-3 py-1 rounded-xl",
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
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <Card title="Total" value={stats.total} />
                            <Card title="En attente" value={stats.pending} />
                            <Card title="Acceptées" value={stats.accepted} />
                            <Card title="Refusées" value={stats.refused} />
                        </div>
                        <div className="flex gap-2 mb-6 flex-wrap">
                            {["all", "pending", "accepted", "refused"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold ${filter === f
                                        ? "bg-amber-500 text-white"
                                        : "bg-white text-slate-600"
                                        }`}
                                >
                                    {f === "all"
                                        ? "Tous"
                                        : f === "pending"
                                            ? "En attente"
                                            : f === "accepted"
                                                ? "Acceptées"
                                                : "Refusées"}
                                </button>
                            ))}
                        </div>
                        <div className="grid gap-4">
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="bg-white p-4 rounded-2xl shadow flex flex-col md:flex-row md:items-center md:justify-between"
                                    >
                                        {/* Info */}
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-800">
                                                {course.client}
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                {course.pickup} → {course.dest}
                                            </p>
                                            <p className="text-sm font-semibold text-amber-500">
                                                {course.fare}
                                            </p>
                                        </div>

                                        <div className="mt-3 md:mt-0 flex gap-2 items-center">
                                            <span className={styles[course.status] }>
                                                {course.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-center justify-center h-64">
                                    <p className="text-slate-500">
                                        Aucune course trouvée.
                                    </p>
                                </div>
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