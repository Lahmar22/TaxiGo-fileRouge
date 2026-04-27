import { useState } from "react";
import axios from "axios";

function Reclamation({ onClose }) {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description.trim()) {
            setMessage("Description obligatoire");
            return;
        }

        setLoading(true);

        try {
            await axios.post(
                "http://127.0.0.1:8000/api/reclamations",
                {
                    description,
                    client_id: user.client.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage("Réclamation envoyée ✅");
            setDescription("");

            setTimeout(() => {
                onClose();
            }, 1500);

        } catch (err) {
            console.error(err);
            setMessage("Erreur ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-lg font-semibold">Nouvelle réclamation</h2>

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez votre problème..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />

            {message && (
                <p className="text-sm text-center text-slate-700">{message}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
                {loading ? "Envoi..." : "Envoyer"}
            </button>
        </form>
    );
}

export default Reclamation;