import logoImage from "../assets/TaxiGo.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        number_phone: "",
        password: "",
        role: "",
        permis: "",
        carte_grise: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("first_name", form.first_name);
        data.append("last_name", form.last_name);
        data.append("email", form.email);
        data.append("number_phone", form.number_phone);
        data.append("password", form.password);
        data.append("role", form.role);

        // fichiers
        if (form.permis) {
            data.append("permis", form.permis);
        }

        if (form.carte_grise) {
            data.append("carte_grise", form.carte_grise);
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.success) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white via-slate-50 to-slate-100 p-6">

            <div className="w-full max-w-lg bg-white shadow-xl rounded-3xl p-8 border border-slate-100">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src={logoImage} alt="TaxiGo" className="h-16" />
                </div>

                <h2 className="text-2xl font-bold text-center text-slate-900 mb-6">
                    Inscription
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="first_name"
                            placeholder="Prénom"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />

                        <input
                            type="text"
                            name="last_name"
                            placeholder="Nom"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />

                    <input
                        type="tel"
                        name="number_phone"
                        placeholder="Téléphone"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />

                    {/* ROLE */}
                    <select
                        name="role"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    >
                        <option value="">Sélectionnez un rôle</option>
                        <option value="client">Client</option>
                        <option value="chauffeur">Chauffeur</option>
                    </select>

                    {form.role === "chauffeur" && (
                        <><div className="space-y-4">
                            {/* Permis */}
                            <div>
                                <label htmlFor="permis" className="block mb-1 font-medium">
                                    Permis de conduire
                                </label>
                                <input
                                    type="file"
                                    id="permis"
                                    name="permis"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-white hover:file:bg-yellow-500"
                                />
                            </div>

                            {/* Carte grise */}
                            <div>
                                <label htmlFor="carte_grise" className="block mb-1 font-medium">
                                    Carte grise
                                </label>
                                <input
                                    type="file"
                                    id="carte_grise"
                                    name="carte_grise"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-white hover:file:bg-yellow-500"
                                />
                            </div>
                        </div>

                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-linear-to-r from-yellow-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
                    >
                        S'inscrire
                    </button>

                </form>
            </div>
        </div>
    );
}