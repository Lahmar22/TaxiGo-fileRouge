import { useState, useEffect } from "react";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import axios from "axios";
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

export default function Dashboard() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const [statistics, setStatistics] = useState({});
    const [revenueData, setRevenueData] = useState([]);
    const [coursesData, setCoursesData] = useState([]);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const res = await axios.get(
                    "http://127.0.0.1:8000/api/statistiques",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setStatistics(res.data);
                console.log("Statistiques chargées :", res.data);

                // Transform revenue per day data from backend
                if (res.data.revenuParJour && Array.isArray(res.data.revenuParJour)) {
                    const formattedRevenueData = res.data.revenuParJour.map((item) => ({
                        day: new Date(item.jour).toLocaleDateString("fr-FR", {
                            weekday: "short"
                        }),
                        revenus: parseFloat(item.total_revenu),
                        date: item.jour
                    }));

                    setRevenueData(formattedRevenueData);
                    console.log("Revenus par jour chargés :", formattedRevenueData);
                }

                // Transform courses per day data from backend
                if (res.data.coursesParJour && Array.isArray(res.data.coursesParJour)) {
                    const formattedCoursesData = res.data.coursesParJour.map((item) => ({
                        name: new Date(item.jour).toLocaleDateString("fr-FR", {
                            weekday: "short"
                        }),
                        courses: parseInt(item.total_courses),
                        date: item.jour
                    }));

                    setCoursesData(formattedCoursesData);
                    console.log("Courses par jour chargées :", formattedCoursesData);
                }
            } catch (err) {
                console.error("Erreur lors du chargement des statistiques :", err);
            }
        };

        fetchStatistics();
    }, [token]);


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
                            <p className="text-slate-500 text-sm">Revenus</p>
                            <h3 className="text-2xl font-bold">{Number(statistics.revenus).toFixed(2)} DH</h3>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow">
                            <p className="text-slate-500 text-sm">Courses</p>
                            <h3 className="text-2xl font-bold">{statistics.totalCourse}</h3>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow">
                            <p className="text-slate-500 text-sm">Chauffeurs actifs</p>
                            <h3 className="text-2xl font-bold"> {statistics.totalChauffeurs}</h3>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow">
                            <p className="text-slate-500 text-sm">Utilisateurs</p>
                            <h3 className="text-2xl font-bold"> {statistics.totalUsers}</h3>
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