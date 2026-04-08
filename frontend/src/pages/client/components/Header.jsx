import { IoNotificationsOutline } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Header({ page, setOpenSidebar }) {

    const today = new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const token = localStorage.getItem("token");
    const [notifications, setNotifications] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.client.id;

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get(
                    `http://127.0.0.1:8000/api/notifications/client/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setNotifications(res.data.notifications);
            } catch (err) {
                console.error("Erreur lors du chargement des notifications :", err);
            }
        };

        fetchNotifications();
    }, []);


    const [openNotif, setOpenNotif] = useState(false);
    const notifRef = useRef(null);

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