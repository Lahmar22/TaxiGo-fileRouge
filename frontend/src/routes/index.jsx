import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
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
                <Route path="/register" element={<Register />} />
                <Route path="/client/dashboard" element={
                    <ProtectedRoute allowedRoles={["client"]}>
                        <DashboardClient />
                    </ProtectedRoute>
                } />
                <Route path="/client/profile" element={
                    <ProtectedRoute allowedRoles={["client"]}>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/client/history" element={
                    <ProtectedRoute allowedRoles={["client"]}>
                        <History />
                    </ProtectedRoute>
                } />
                <Route path="/chauffeur/dashboard" element={
                    <ProtectedRoute allowedRoles={["chauffeur"]}>
                        <DashboardChauffeur />
                    </ProtectedRoute>
                } />
                <Route path="/chauffeur/history" element={
                    <ProtectedRoute allowedRoles={["chauffeur"]}>
                        <HistoryChauffeur />
                    </ProtectedRoute>
                } />
                <Route path="/chauffeur/profile" element={
                    <ProtectedRoute allowedRoles={["chauffeur"]}>
                        <ProfileChauffeur />
                    </ProtectedRoute>
                } />
                <Route path="/chauffeur/revenus" element={
                    <ProtectedRoute allowedRoles={["chauffeur"]}>
                        <Revenus />
                    </ProtectedRoute>
                } />
                <Route path="/chauffeur/attente" element={
                    <ProtectedRoute allowedRoles={["chauffeur"]}>
                        <Attende />
                    </ProtectedRoute>
                } />
                <Route path="/admin/dashboard" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <DashboardAdmin />
                    </ProtectedRoute>
                } />
                <Route path="/admin/utilisateurs" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <Utilisateurs />
                    </ProtectedRoute>
                } />
                <Route path="/admin/reclamations" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <Reclamations />
                    </ProtectedRoute>
                } />
                <Route path="/admin/chauffeurs" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <Chauffeurs />
                    </ProtectedRoute>
                } />
                <Route path="/admin/courses" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <Courses />
                    </ProtectedRoute>
                } />
                <Route path="/admin/profile" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <ProfilAdmin />
                    </ProtectedRoute>
                } />

            </Routes>
        </BrowserRouter>
    );
}