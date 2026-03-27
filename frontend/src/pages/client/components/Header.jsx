import { IoNotificationsOutline } from "react-icons/io5";

export default function Header({page, setOpenSidebar }) {

    const today = new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 h-16 sticky top-0 z-20 px-4 lg:px-6 flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center">

                {/* Mobile menu */}
                <button
                    onClick={() => setOpenSidebar(true)}
                    className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition mr-3"
                >
                    <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Title */}
                <div>
                    <h1 className="text-slate-900 font-bold text-sm lg:text-lg">{page}</h1>
                    <p className="text-slate-400 text-xs capitalize">{today}</p>
                </div>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2 lg:gap-3">

              
                {/* Notifications */}
                <button className="relative p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
                    <IoNotificationsOutline className="w-5 h-5 text-slate-700" />

                    {/* Badge */}
                    <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 flex items-center justify-center 
                     text-[10px] font-bold text-white bg-red-500 rounded-full shadow">
                        2
                    </span>
                </button>

            </div>

        </header>
    );
}