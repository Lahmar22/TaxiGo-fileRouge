import { useState, useRef, useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Header({ page, setOpenSidebar }) {

    const today = new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const [openNotif, setOpenNotif] = useState(false);
    const notifRef = useRef(null);

    const [notifications] = useState([
        { id: 1, message: "Nouvelle commande reçue" },
        { id: 2, message: "Votre profil a été mis à jour" },
    ]);

    // close when click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setOpenNotif(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 h-16 sticky top-0 z-20 px-4 lg:px-6 flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center">

                <button
                    onClick={() => setOpenSidebar(true)}
                    className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition mr-3"
                >
                    <IoIosMenu className="w-8 h-8" />
                </button>

                <div>
                    <h1 className="text-slate-900 font-bold text-sm lg:text-lg">{page}</h1>
                    <p className="text-slate-400 text-xs capitalize">{today}</p>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3 relative">

                {/* NOTIFICATIONS */}
                <div ref={notifRef} className="relative">

                    <button
                        onClick={() => setOpenNotif(!openNotif)}
                        className="relative p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                    >
                        <IoNotificationsOutline className="w-5 h-5 text-slate-700" />

                        {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 flex items-center justify-center 
                            text-[10px] font-bold text-white bg-red-500 rounded-full shadow">
                                {notifications.length}
                            </span>
                        )}
                    </button>

                    {/* DROPDOWN */}
                    {openNotif && (
                        <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden z-50">

                            <div className="p-3 border-b font-semibold text-slate-700">
                                Notifications
                            </div>

                            <div className="max-h-64 overflow-y-auto">

                                {notifications.length === 0 ? (
                                    <p className="p-4 text-sm text-gray-500 text-center">
                                        Aucune notification
                                    </p>
                                ) : (
                                    notifications.map((n) => (
                                        <div
                                            key={n.id}
                                            className="p-3 hover:bg-slate-50 text-sm text-slate-700 border-b last:border-none"
                                        >
                                            {n.message}
                                        </div>
                                    ))
                                )}

                            </div>

                        </div>
                    )}

                </div>

            </div>
        </header>
    );
}