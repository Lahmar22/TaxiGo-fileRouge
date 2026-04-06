import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardClient from "../pages/client/Dashboard";
import DashboardAdmin from "../pages/admin/Dashboard";
import DashboardChauffeur from "../pages/chauffeur/Dashboard";
import History from "../pages/client/History";
import Profile from "../pages/client/Profile";
import HistoryChauffeur from "../pages/chauffeur/History";
import ProfileChauffeur from "../pages/chauffeur/Profile";
import Revenus from "../pages/chauffeur/Revenus";
import Utilisateurs from "../pages/admin/Utilisateurs";
import Reclamations from "../pages/admin/Reclamations";
import Chauffeurs from "../pages/admin/Chauffeurs";
import Courses from "../pages/admin/Courses";
import ProfilAdmin from "../pages/admin/Profile";
import Attende from "../pages/chauffeur/Attende";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />

                <Route path="/client/dashboard" element={<DashboardClient/>} />
                <Route path="/client/profile" element={<Profile/>} />
                <Route path="/client/history" element={<History/>} />
                
                <Route path="/chauffeur/history" element={<HistoryChauffeur/>} />
                <Route path="/chauffeur/Profile" element={<ProfileChauffeur/>} />
                <Route path="/chauffeur/revenus" element={<Revenus/>} />
                <Route path="/chauffeur/dashboard" element={<DashboardChauffeur/>} />
                <Route path="/chauffeur/attente" element={<Attende/>} />

                <Route path="/admin/dashboard" element={<DashboardAdmin/>} />
                <Route path="/admin/utilisateurs" element={<Utilisateurs/>} />
                <Route path="/admin/reclamations" element={<Reclamations/>} />
                <Route path="/admin/chauffeurs" element={<Chauffeurs/>} />
                <Route path="/admin/courses" element={<Courses/>} />
                <Route path="/admin/profile" element={<ProfilAdmin/>} />
                
            </Routes>
        </BrowserRouter>
    );
}