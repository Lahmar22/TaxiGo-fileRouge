import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function History() {
    const filterTrips = (e) => {
        console.log("search:", e.target.value);
    };

    const setFilter = (type) => {
        console.log("filter:", type);
    };
    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex flex-col flex-1 lg:ml-64">

                <Header />
                <main className="px-6 py-8">

                    <div className="mb-8 afu">
                        <h2 className="text-3xl font-black text-slate-900">
                            Mes <span className="gradient-text">courses</span>
                        </h2>

                        <p className="text-slate-500 mt-1">
                            Retrouvez toutes vos réservations passées et à venir
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">

                        {/* Search */}
                        <div className="relative mb-4">
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>

                            <input
                                type="text"
                                placeholder="Rechercher une destination, un chauffeur..."
                                onChange={filterTrips}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2">

                            <button
                                onClick={() => setFilter("all")}
                                className="px-4 py-2 rounded-full text-sm font-semibold transition-all border border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800 active:scale-95"
                            >
                                Toutes (12)
                            </button>

                            <button
                                onClick={() => setFilter("completed")}
                                className="px-4 py-2 rounded-full text-sm font-semibold transition-all border border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800 active:scale-95"
                            >
                                Terminées (9)
                            </button>

                            <button
                                onClick={() => setFilter("upcoming")}
                                className="px-4 py-2 rounded-full text-sm font-semibold transition-all border border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800 active:scale-95"
                            >
                                À venir (2)
                            </button>

                            <button
                                onClick={() => setFilter("pending")}
                                className="px-4 py-2 rounded-full text-sm font-semibold transition-all border border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800 active:scale-95"
                            >
                                En attente (1)
                            </button>

                            <button
                                onClick={() => setFilter("cancelled")}
                                className="px-4 py-2 rounded-full text-sm font-semibold transition-all border border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800 active:scale-95"
                            >
                                Annulées (0)
                            </button>

                        </div>

                    </div>

                </main>
            </div>
        </div>



    );
}