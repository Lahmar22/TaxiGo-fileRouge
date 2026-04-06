import { FaSpinner } from "react-icons/fa";
import { logout } from "../../api/AuthAPI";

export default function Attende() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
            <p className="text-slate-600">
                Votre compte est en attente de validation par l'administrateur. Veuillez patienter...
            </p>
            <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"  
            >
                Se déconnecter
            </button>
        </div>
    );
}
        