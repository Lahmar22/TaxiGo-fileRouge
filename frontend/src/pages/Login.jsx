import logoImage from "../assets/TaxiGo.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
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
            const response = await axios.post("http://127.0.0.1:8000/api/login", form);
            const role = response.data.user.role.role_name;
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            if (response.data.success) {
                if(role == "client"){
                    navigate("/client/dashboard");
                }else if(role == "admin"){
                    navigate("/admin/dashboard");
                }else if(role == "chauffeur"){
                    if(response.data.user.validate){  
                        navigate("/chauffeur/dashboard");
                    }else{
                        navigate("/chauffeur/attente");
                    }
                    
                }else{
                    navigate("/login");
                }
            }

           
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            }
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white via-slate-50 to-slate-100 p-6">

            <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 border border-slate-100">

                <div className="flex justify-center mb-6">
                    <img src={logoImage} alt="TaxiGo" className="h-16" />
                </div>

                {message && (
                    <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg text-center">
                        {message}
                    </div>
                )}
                <h2 className="text-2xl font-bold text-center text-slate-900 mb-6">
                    Connexion
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-slate-600 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Votre email"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-slate-600 mb-2">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Votre mot de passe"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                        />
                    </div>

                    {/* Button */}
                    <button type="submit" className="w-full bg-linear-to-r from-yellow-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
                        Se connecter
                    </button>

                </form>
                <div className="text-center mt-4 text-sm text-slate-600">
                    Vous n'avez pas de compte ?{" "}
                    <a href="/register" className="text-yellow-500 font-semibold hover:underline">
                        S'inscrire
                    </a>
                </div>
            </div>
        </div>
    );
}