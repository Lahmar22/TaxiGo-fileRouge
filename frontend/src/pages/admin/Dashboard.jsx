import { useState } from "react";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

// ── Mock data ─────────────────────────
const revenueData = [
    { day: "Lun", revenus: 1200 },
    { day: "Mar", revenus: 2100 },
    { day: "Mer", revenus: 1800 },
    { day: "Jeu", revenus: 2400 },
    { day: "Ven", revenus: 3000 },
    { day: "Sam", revenus: 2800 },
    { day: "Dim", revenus: 3500 }
];

const coursesData = [
    { name: "Lun", courses: 40 },
    { name: "Mar", courses: 60 },
    { name: "Mer", courses: 55 },
    { name: "Jeu", courses: 70 },
    { name: "Ven", courses: 90 },
    { name: "Sam", courses: 85 },
    { name: "Dim", courses: 100 }
];

export default function Dashboard() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

            <div className="flex flex-col flex-1">
                <Header page="Tableau de bord" setOpenSidebar={setOpenSidebar} />

                <main className="flex-1 p-4 lg:p-6">

                    {/* ── Header ── */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-slate-900">
                            Bonjour, <span className="text-amber-500">{user?.last_name}</span>
                        </h2>
                        <p className="text-slate-500">
                            Analyse des performances de TaxiGo
                        </p>
                    </div>

                    {/* ── Cards rapides ── */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-5 rounded-2xl shadow">
                            <p className="text-slate-500 text-sm">Revenus (semaine)</p>
                            <h3 className="text-2xl font-bold">16 800 DH</h3>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow">
                            <p className="text-slate-500 text-sm">Courses</p>
                            <h3 className="text-2xl font-bold">500</h3>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow">
                            <p className="text-slate-500 text-sm">Chauffeurs actifs</p>
                            <h3 className="text-2xl font-bold">42</h3>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow">
                            <p className="text-slate-500 text-sm">Utilisateurs</p>
                            <h3 className="text-2xl font-bold">42</h3>
                        </div>
                    </div>

                    {/* ── Charts ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Revenus */}
                        <div className="bg-white p-5 rounded-2xl shadow">
                            <h3 className="font-bold mb-4 text-slate-800">
                                Revenus par jour
                            </h3>

                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="revenus"
                                        stroke="#f59e0b"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Courses */}
                        <div className="bg-white p-5 rounded-2xl shadow">
                            <h3 className="font-bold mb-4 text-slate-800">
                                Nombre de courses
                            </h3>

                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={coursesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar
                                        dataKey="courses"
                                        fill="#3b82f6"
                                        radius={[8, 8, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}