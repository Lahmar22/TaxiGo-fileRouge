import { useState, useEffect } from "react";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import { FaSearch, FaTrash, FaUserCheck, FaUserTimes } from "react-icons/fa";
import axios from "axios";



export default function Utilisateurs() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filterRole, setFilterRole] = useState("all");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(
                    "http://127.0.0.1:8000/api/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUsers(res.data.users);
            } catch (err) {
                console.error("Erreur lors du chargement des utilisateurs :", err);
            }
        };

        fetchUsers();
    }, []);



    const toggleStatus = (id) => {
        axios.patch(`http://127.0.0.1:8000/api/users/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setUsers(users.map(u =>
                    u.id === id
                        ? { ...u, banned: !u.banned } 
                        : u
                ));
            })
            .catch((err) => {
                console.error("Erreur lors de la validation du chauffeur :", err);
            });
    };


    // ── Filtered users ─────────────────────────
    const filteredUsers = users.filter(u =>
        (u.first_name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())) &&
        (filterRole === "all" || u.role.role_name === filterRole)
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
                            Gestion des utilisateurs 
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
                                        <td className="p-3 font-semibold">{user.first_name} {user.last_name}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3 capitalize">{user.role.role_name}</td>

                                        <td className="p-3">
                                            <span className={`px-3 py-1 text-xs rounded-full font-bold
                                                ${user.banned === false
                                                    ? "bg-green-100 text-green-600"

                                                    : "bg-red-100 text-red-600"}`}>
                                                {user.banned ? "bloqué" : "Actif"}
                                            </span>
                                        </td>

                                        <td className="p-3 flex gap-2">

                                            {user.role.role_name === "admin" || (
                                                <button
                                                    onClick={() => toggleStatus(user.id)}
                                                    className={`p-2 rounded-lg text-white
                                                    ${user.banned === false
                                                            ? "bg-red-500"
                                                            : "bg-green-500"}`}
                                                >
                                                    {user.banned === false
                                                        ? <FaUserTimes />
                                                        : <FaUserCheck />}
                                                </button>
                                            )}


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