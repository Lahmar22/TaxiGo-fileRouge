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

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/client/dashboard" element={<DashboardClient/>} />
                <Route path="/admin/dashboard" element={<DashboardAdmin/>} />
                <Route path="/chauffeur/dashboard" element={<DashboardChauffeur/>} />
                <Route path="/client/history" element={<History/>} />
                <Route path="/chauffeur/history" element={<HistoryChauffeur/>} />
                <Route path="/chauffeur/Profile" element={<ProfileChauffeur/>} />
                <Route path="/client/profile" element={<Profile/>} />
            </Routes>
        </BrowserRouter>
    );
}