import { useState } from "react";
import Header from "../chauffeur/components/Header";
import Sidebar from "../chauffeur/components/Sidebar";

export default function Profile() {
    const [form, setForm] = useState({
        name: "Ahmed Benali",
        email: "ahmed@email.com",
        phone: "+212 600000000",
        city: "Marrakech",
    });

    const [openSidebar, setOpenSidebar] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <>
            <div className="flex min-h-screen bg-slate-100">
                <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

                <div className="flex flex-col flex-1">
                    <Header page="Profile" setOpenSidebar={setOpenSidebar} />

                    <main className="flex-1 p-4 lg:p-6">
                        {/* Greeting */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-black text-slate-900">
                                Bonjour, <span className="text-amber-500">{user.first_name} {user.last_name}</span>
                            </h2>
                        </div>
                       
                        {/* Profile Card */}
                        <div className="relative bg-linear-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden mb-8 afu d1">
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "radial-gradient(ellipse 70% 80% at 20% 50%, rgba(245,158,11,.18), transparent 65%)",
                                }}
                            />
                            <div
                                className="absolute -top-16 -right-16 w-64 h-64 rounded-full"
                                style={{ background: "rgba(245,158,11,.06)" }}
                            />
                            <div
                                className="absolute -bottom-10 right-24 w-40 h-40 rounded-full"
                                style={{ background: "rgba(245,158,11,.04)" }}
                            />

                            <div className="relative z-10 p-8 flex sm:flex-row items-center sm:items-start gap-6">
                                {/* Avatar */}
                                <div className="avatar-ring shrink-0">
                                    <div className="w-24 h-24 bg-linear-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center font-black text-slate-900 text-3xl">
                                        {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1 sm:text-left">
                                    <div className="flex flex-col sm:flex-row gap-3 mb-2">
                                        <h3 className="text-white text-2xl font-black">{user.first_name} {user.last_name}</h3>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-1">
                                        {user.email} · {user.number_phone}
                                    </p>
                                    <p className="text-slate-500 text-xs mb-5">
                                        Membre depuis {new Date(user.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                                    </p>

                                    {/* Quick stats */}
                                    <div className="flex sm:justify-start gap-6">
                                        <div className="text-center">
                                            <p className="text-white text-2xl font-black">12</p>
                                            <p className="text-slate-400 text-xs">Courses</p>
                                        </div>
                                        <div className="w-px bg-white/10 hidden sm:block" />
                                        <div className="text-center">
                                            <p className="text-yellow-400 text-2xl font-black">1 250</p>
                                            <p className="text-slate-400 text-xs">Points</p>
                                        </div>
                                        <div className="w-px bg-white/10 hidden sm:block" />
                                        <div className="text-center">
                                            <p className="text-white text-2xl font-black">148</p>
                                            <p className="text-slate-400 text-xs">km parcourus</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Information Form */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-8 afu d2">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="text-slate-900 font-bold">Informations personnelles</h4>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { label: "Prénom", value: user.first_name },
                                    { label: "Nom", value: user.last_name },
                                    { label: "Email", value: user.email }, 
                                    { label: "Téléphone", value: user.number_phone } 
                                ].map((field, idx) => (
                                    <div key={idx}>
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type || "text"}
                                            value={field.value}
                                            readOnly
                                            className="form-field"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Security Form */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-5 afu d4">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-red-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="text-slate-900 font-bold">Sécurité du compte</h4>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {["Mot de passe actuel", "Nouveau mot de passe", "Confirmer"].map(
                                    (label, idx) => (
                                        <div key={idx} className={idx === 0 ? "sm:col-span-2" : ""}>
                                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                                {label}
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                className="form-field"
                                            />
                                        </div>
                                    )
                                )}
                            </div>

                            <button className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors">
                                Changer le mot de passe
                            </button>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-white rounded-2xl border border-red-100 p-5 afu d5">
                            <div className="flex items-center gap-2 mb-3">
                                <svg
                                    className="w-4 h-4 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                                <h4 className="font-bold text-slate-900 text-sm">Zone de danger</h4>
                            </div>

                            <p className="text-slate-400 text-xs mb-4">
                                La suppression de votre compte est irréversible. Toutes vos données
                                seront effacées.
                            </p>

                            <button className="w-full py-2.5 border border-red-200 text-red-500 font-semibold rounded-xl text-sm hover:bg-red-50 transition-colors">
                                Supprimer mon compte
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}