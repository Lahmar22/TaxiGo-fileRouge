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
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register", form);


            if (response.data.success) {
                navigate("/login");
            }

        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            }
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-slate-50 to-slate-100 p-6">

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
                            placeholder="Nom"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />

                        <input
                            type="text"
                            name="last_name"
                            placeholder="Prénom"
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

                    <button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
                        S'inscrire
                    </button>

                </form>
            </div>
        </div>
    );
}