import { useState } from "react";
import Header from "../chauffeur/components/Header";
import Sidebar from "../chauffeur/components/Sidebar";

export default function Dashboard() {
    const [openSidebar, setOpenSidebar] = useState(false);
    return (
        <div className="flex min-h-screen bg-slate-100">
         <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

            <div className="flex flex-col flex-1">
                <Header setOpenSidebar={setOpenSidebar} />

                <main className="flex-1 p-6">
                            <h1>yfjygjhgvj</h1>
                </main>
            </div>
        </div>
    )
}
