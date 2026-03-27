import { useState } from "react";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import {
    FaCheck,
    FaTimes,
    FaIdCard,
    FaCar
} from "react-icons/fa";

// ── Mock demandes chauffeurs ─────────────────────────
const MOCK_DRIVERS = [
    {
        id: 1,
        name: "Ahmed Ali",
        email: "ahmed@mail.com",
        voiture: "Dacia Logan",
        matricule: "12345-A-6",
        statut: "en attente"
    },
    {
        id: 2,
        name: "Khalid Omar",
        email: "khalid@mail.com",
        voiture: "Toyota Yaris",
        matricule: "67890-B-2",
        statut: "en attente"
    },
    {
        id: 3,
        name: "Youssef Ben",
        email: "youssef@mail.com",
        voiture: "Hyundai i10",
        matricule: "11223-C-1",
        statut: "validé"
    }
];

export default function ValidationChauffeurs() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [drivers, setDrivers] = useState(MOCK_DRIVERS);

    // ── Actions ─────────────────────────
    const validateDriver = (id) => {
        setDrivers(drivers.map(d =>
            d.id === id ? { ...d, statut: "validé" } : d
        ));
    };

    const rejectDriver = (id) => {
        setDrivers(drivers.map(d =>
            d.id === id ? { ...d, statut: "refusé" } : d
        ));
    };

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

            <div className="flex flex-col flex-1">
                <Header page="Validation Chauffeurs" setOpenSidebar={setOpenSidebar} />

                <main className="flex-1 p-4 lg:p-6">

                    {/* ── Header ── */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-slate-900">
                            Validation des chauffeurs 🚗
                        </h2>
                        <p className="text-slate-500">
                            Acceptez ou refusez les demandes d'inscription
                        </p>
                    </div>

                    {/* ── Liste ── */}
                    <div className="space-y-4">
                        {drivers.map(driver => (
                            <div
                                key={driver.id}
                                className="bg-white rounded-2xl shadow p-5 flex justify-between items-center"
                            >
                                {/* Infos */}
                                <div>
                                    <p className="font-semibold text-slate-800">
                                        {driver.name}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        {driver.email}
                                    </p>

                                    <div className="flex gap-4 mt-2 text-sm text-slate-600">
                                        <span className="flex items-center gap-1">
                                            <FaCar /> {driver.voiture}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FaIdCard /> {driver.matricule}
                                        </span>
                                    </div>

                                    {/* Statut */}
                                    <span className={`inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full
                                        ${driver.statut === "validé"
                                            ? "bg-green-100 text-green-600"
                                            : driver.statut === "refusé"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-yellow-100 text-yellow-600"}`}>
                                        {driver.statut}
                                    </span>
                                </div>

                                {/* Actions */}
                                {driver.statut === "en attente" && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => validateDriver(driver.id)}
                                            className="p-2 bg-green-500 text-white rounded-lg"
                                            title="Valider"
                                        >
                                            <FaCheck />
                                        </button>

                                        <button
                                            onClick={() => rejectDriver(driver.id)}
                                            className="p-2 bg-red-500 text-white rounded-lg"
                                            title="Refuser"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </main>
            </div>
        </div>
    );
}