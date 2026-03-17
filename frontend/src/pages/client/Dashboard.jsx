import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";


export default function Dashboard() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [locationError, setLocationError] = useState(null);
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Géolocalisation non supportée");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => setLocationError(error.message)
    );
  }, []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", 
  });
  
  const { latitude, longitude, error } = location;
  if (!isLoaded) return <p></p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex flex-col flex-1 lg:ml-64">

        <Header page="Tableau de bord" />


        <main className="flex-1 p-6 space-y-6">
          <div className="mb-8 animate-fade-up">
            <h2 className="text-3xl font-black text-slate-900">
              Bonjour, <span className="gradient-text">Ahmed</span> 👋
            </h2>
            <p className="text-slate-500 mt-1">Prêt pour votre prochaine course ?</p>
          </div>


          <div className="grid xl:grid-cols-5 gap-6">

            <div className="xl:col-span-2">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl relative overflow-hidden p-7 p-7 delay-1">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white text-xl font-bold">Nouvelle réservation</h3>
                    <p className="text-slate-400 text-sm mt-0.5">
                      Réservez votre taxi en quelques secondes
                    </p>
                  </div>
                  <div className="w-11 h-11 bg-yellow-400/15 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5S16.67 13 17.5 13s1.5.67 1.5 1.5S18.33 16 17.5 16zM5 11l1.5-4.5h11L19 11H5z" />
                    </svg>
                  </div>
                </div>

                {/* Route inputs */}
                <div className="space-y-3 mb-5">
                  {/* Departure */}
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="10" r="3" strokeWidth="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    </svg>
                    <input id="pickupInput"
                      type="text"
                      className="bg-white/7 border border-white/13 text-white rounded-xl pl-11 pr-4 py-3 w-full text-sm transition-all duration-300 outline-none"
                      placeholder="Point de départ" autoComplete="off" />
                  </div>



                  {/* Destination */}
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" fill="none"
                      stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input id="destInput" type="text"
                      className="bg-white/7 border border-white/13 text-white rounded-xl pl-11 pr-4 py-3 w-full text-sm transition-all duration-300 outline-none"
                      placeholder="Destination" autoComplete="off" />
                  </div>
                </div>

                {/* CTA button */}
                <button onClick={() => submitBooking()}
                  className="w-full py-4 rounded-xl font-bold text-slate-900 text-base bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 hover:shadow-2xl hover:shadow-yellow-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                  chercher des offers
                </button>
              </div>

              <div className="py-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-900 font-bold text-base">Courses à venir</h3>
                  <a href="/client/history"
                    className="text-yellow-600 text-xs font-semibold hover:text-yellow-700 transition-colors">Tout voir →</a>
                </div>

                <div className="space-y-3" id="upcomingList">
                  <div className="bg-white rounded-[18px] border border-slate-100 p-5 flex items-center gap-4 transition-all duration-300">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="route-dot bg-yellow-400"></div>
                      <div className="route-line"></div>
                      <div className="route-dot bg-red-400"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-slate-900 font-semibold text-sm truncate">Médina, Rabat</p>
                          <p className="text-slate-400 text-xs">→ Agdal, Rabat</p>
                        </div>
                        <span className="ride-status status-upcoming flex-shrink-0">À venir</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          14 Mars, 09:00
                        </span>
                        <span className="text-xs font-semibold text-amber-600">55 MAD</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="xl:col-span-3 space-y-6">

              <div className="bg-gradient-to-br from-slate-200 to-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden h-[500px]">

                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={location}
                  zoom={15}
                >
                  <Marker position={location} />
                </GoogleMap>
              </div>


            </div>
          </div>

        </main>



      </div>

    </div>
  );
}