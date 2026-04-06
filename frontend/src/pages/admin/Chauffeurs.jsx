import { useState, useEffect } from "react";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import {
    FaCheck,
    FaTimes,
    FaIdCard,
    FaCar
} from "react-icons/fa";
import axios from "axios";


export default function ValidationChauffeurs() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const token = localStorage.getItem("token");
    const BASE_URL = "http://127.0.0.1:8000/storage/";


    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const res = await axios.get(
                    "http://127.0.0.1:8000/api/chauffeurs",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setDrivers(res.data.chauffeurs);
            } catch (err) {
                console.error("Erreur lors du chargement des chauffeurs :", err);
            }
        };

        fetchDrivers();
    }, []);


    const validateDriver = (id) => {
        axios.patch(`http://127.0.0.1:8000/api/chauffeurs/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setDrivers(drivers.map(d =>
                    d.id === id ? { ...d, validate: true } : d
                ));
            })
            .catch((err) => {
                console.error("Erreur lors de la validation du chauffeur :", err);
            });
    };

    const rejectDriver = (id) => {
        axios.patch(`http://127.0.0.1:8000/api/chauffeurs/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setDrivers(drivers.map(d =>
                    d.id === id ? { ...d, validate: false } : d
                ));
            })
            .catch((err) => {
                console.error("Erreur lors du refus de la validation du chauffeur :", err);
            });
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
                            Validation des chauffeurs 
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
                                        {driver.user.first_name} {driver.user.last_name}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        {driver.user.email}
                                    </p>

                                    <div className="flex gap-4 mt-2 text-sm text-slate-600">
                                        <a
                                            href={`${BASE_URL}${driver.vehicule.carte_grise}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-blue-500"
                                        >
                                            <FaCar /> Carte grise
                                        </a>

                                        <a
                                            href={`${BASE_URL}${driver.vehicule.permis}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-blue-500"
                                        >
                                            <FaIdCard /> Permis
                                        </a>
                                    </div>

                                    {/* Statut */}
                                    <span className={`inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full
                                        ${driver.validate === true
                                            ? "bg-green-100 text-green-600"
                                            : driver.validate === false
                                                ? "bg-red-100 text-yellow-600"
                                                : "bg-yellow-100 text-red-600"}`}>
                                        {driver.validate === true ? "Validé" : driver.validate === false ? "En attente" : "Refusé"}
                                    </span>
                                </div>

                                {/* Actions */}
                                {driver.validate === false && (
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