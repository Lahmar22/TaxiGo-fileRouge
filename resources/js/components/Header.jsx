export default function Header() {
    const today = new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <header className="px-6 flex items-center justify-between bg-white/95 backdrop-blur-xl border-b border-slate-100 h-16 sticky top-0 z-20">

            <div>
                <h1 className="text-slate-900 font-bold text-lg leading-tight">
                    Tableau de bord
                </h1>
                <p className="text-slate-400 text-xs capitalize">
                    {today}
                </p>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">

                {/* Notifications */}
                <button className="relative p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">

                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 
                            14.158V11a6.002 6.002 0 00-4-5.659V5a2 
                            2 0 10-4 0v.341C7.67 6.165 6 8.388 
                            6 11v3.159c0 .538-.214 1.055-.595 
                            1.436L4 17h5m6 0v1a3 3 0 
                            11-6 0v-1m6 0H9"
                        />
                    </svg>

                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>

                </button>

            </div>

        </header>
    );
}