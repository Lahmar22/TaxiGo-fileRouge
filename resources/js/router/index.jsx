import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardClient from "../pages/client/dashboard";
import DashboardAdmin from "../pages/admin/Dashboard";
import DashboardChauffeur from "../pages/chauffeur/Dashboard";

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
            </Routes>
        </BrowserRouter>
    );
}