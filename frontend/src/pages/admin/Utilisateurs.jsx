import { useState } from "react";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import { FaSearch, FaTrash, FaUserCheck, FaUserTimes } from "react-icons/fa";

// ── Mock Users ─────────────────────────
const MOCK_USERS = [
    { id: 1, name: "Ahmed Ali", email: "ahmed@mail.com", role: "chauffeur", status: "actif" },
    { id: 2, name: "Sara Khan", email: "sara@mail.com", role: "client", status: "actif" },
    { id: 3, name: "Youssef Ben", email: "youssef@mail.com", role: "chauffeur", status: "bloqué" },
    { id: 4, name: "Amine Taha", email: "amine@mail.com", role: "client", status: "actif" }
];

export default function Utilisateurs() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [users, setUsers] = useState(MOCK_USERS);
    const [search, setSearch] = useState("");
    const [filterRole, setFilterRole] = useState("all");

    // ── Actions ─────────────────────────
    const toggleStatus = (id) => {
        setUsers(users.map(u =>
            u.id === id
                ? { ...u, status: u.status === "actif" ? "bloqué" : "actif" }
                : u
        ));
    };

    const deleteUser = (id) => {
        setUsers(users.filter(u => u.id !== id));
    };

    // ── Filtered users ─────────────────────────
    const filteredUsers = users.filter(u =>
        (u.name.toLowerCase().includes(search.toLowerCase()) ||
         u.email.toLowerCase().includes(search.toLowerCase())) &&
        (filterRole === "all" || u.role === filterRole)
    );

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

            <div className="flex flex-col flex-1">
                <Header page="Utilisateurs" setOpenSidebar={setOpenSidebar} />

                <main className="flex-1 p-4 lg:p-6">

                    {/* ── Header ── */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-slate-900">
                            Gestion des utilisateurs 👥
                        </h2>
                        <p className="text-slate-500">
                            Administrez les clients et chauffeurs
                        </p>
                    </div>

                    {/* ── Filters ── */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">

                        {/* Search */}
                        <div className="flex items-center bg-white rounded-xl px-3 py-2 shadow w-full md:w-1/2">
                            <FaSearch className="text-slate-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="outline-none w-full"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Role Filter */}
                        <select
                            className="bg-white rounded-xl px-3 py-2 shadow"
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                        >
                            <option value="all">Tous</option>
                            <option value="client">Clients</option>
                            <option value="chauffeur">Chauffeurs</option>
                        </select>
                    </div>

                    {/* ── Table ── */}
                    <div className="bg-white rounded-2xl shadow overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-100 text-slate-600 text-sm">
                                <tr>
                                    <th className="p-3">Nom</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Rôle</th>
                                    <th className="p-3">Statut</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.id} className="border-t">
                                        <td className="p-3 font-semibold">{user.name}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3 capitalize">{user.role}</td>

                                        <td className="p-3">
                                            <span className={`px-3 py-1 text-xs rounded-full font-bold
                                                ${user.status === "actif"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"}`}>
                                                {user.status}
                                            </span>
                                        </td>

                                        <td className="p-3 flex gap-2">

                                            {/* Toggle */}
                                            <button
                                                onClick={() => toggleStatus(user.id)}
                                                className={`p-2 rounded-lg text-white
                                                    ${user.status === "actif"
                                                        ? "bg-red-500"
                                                        : "bg-green-500"}`}
                                            >
                                                {user.status === "actif"
                                                    ? <FaUserTimes />
                                                    : <FaUserCheck />}
                                            </button>

                                            {/* Delete */}
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="p-2 bg-slate-800 text-white rounded-lg"
                                            >
                                                <FaTrash />
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredUsers.length === 0 && (
                            <p className="p-4 text-center text-slate-500">
                                Aucun utilisateur trouvé
                            </p>
                        )}
                    </div>

                </main>
            </div>
        </div>
    );
}