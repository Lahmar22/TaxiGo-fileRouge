import { useState } from "react";
import Header from "../chauffeur/components/Header";
import Sidebar from "../chauffeur/components/Sidebar";
import { FaMoneyBillWave, FaCalendarDay, FaCalendarWeek } from "react-icons/fa";

// ── Mock revenus / courses ─────────────────────────
const MOCK_COURSES = [
    {
        id: 1,
        client: "Youssef B.",
        trajet: "Médina → Agdal",
        date: "27 Mars 2026",
        montant: 55
    },
    {
        id: 2,
        client: "Sara K.",
        trajet: "Hay Riad → Gare Rabat",
        date: "27 Mars 2026",
        montant: 35
    },
    {
        id: 3,
        client: "Amine T.",
        trajet: "Salé → Centre Ville",
        date: "26 Mars 2026",
        montant: 40
    }
];

export default function Revenus() {
    const [openSidebar, setOpenSidebar] = useState(false);

    // ── Calcul revenus ─────────────────────────
    const revenuJour = MOCK_COURSES
        .filter(c => c.date === "27 Mars 2026")
        .reduce((acc, c) => acc + c.montant, 0);

    const revenuTotal = MOCK_COURSES
        .reduce((acc, c) => acc + c.montant, 0);

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
                                {revenuJour} DH
                            </p>
                        </div>

                        {/* Semaine */}
                        <div className="bg-white rounded-2xl p-5 shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <FaCalendarWeek className="text-blue-500 text-xl" />
                                <h3 className="font-semibold text-slate-700">Cette semaine</h3>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">
                                {revenuTotal} DH
                            </p>
                        </div>

                        {/* Total */}
                        <div className="bg-white rounded-2xl p-5 shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <FaMoneyBillWave className="text-green-500 text-xl" />
                                <h3 className="font-semibold text-slate-700">Total</h3>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">
                                {revenuTotal} DH
                            </p>
                        </div>
                    </div>

                    {/* ── Liste des courses ── */}
                    <div className="bg-white rounded-2xl shadow p-5">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">
                            Historique des courses
                        </h3>

                        <div className="space-y-4">
                            {MOCK_COURSES.map(course => (
                                <div
                                    key={course.id}
                                    className="flex justify-between items-center border-b pb-3"
                                >
                                    <div>
                                        <p className="font-semibold text-slate-800">
                                            {course.trajet}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {course.client} • {course.date}
                                        </p>
                                    </div>

                                    <span className="text-green-600 font-bold">
                                        +{course.montant} DH
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}