import { useState, useEffect } from "react";
import Header from "../chauffeur/components/Header";
import Sidebar from "../chauffeur/components/Sidebar";
import { FaSpinner } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import axios from "axios";
import echo from "../../echo";


export default function Dashboard() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [isAccepted, setIsAccepted] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const bookingData = JSON.parse(localStorage.getItem("bookingData"));
    const [location, setLocation] = useState([32.2994, -9.2372]);
    const [locationError, setLocationError] = useState(null);
    const [destination, setDestination] = useState([0, 0]);
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [route, setRoute] = useState([]);
    const token = localStorage.getItem("token");
    const [offers, setOffers] = useState([]);

    const userIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Custom icon for destination
    const destIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationError("Géolocalisation non supportée");
            setIsLoadingLocation(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setUserLocation([lat, lng]);
                setLocation([lat, lng]);
                setIsLoadingLocation(false);


            },
            (error) => {
                setLocationError(error.message);
                setIsLoadingLocation(false);
                console.error("Geolocation error:", error);
            }
        );
    }, []);

    useEffect(() => {
        if (bookingData) {
            setTimeout(() => {
                setReservations([bookingData]);
            }, 1000);
        }
    }, [bookingData]);

    const acceptOffer = async (id) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/courses/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const refuser = () => {
        setReservations([]);
        setIsAccepted(false);
        setDestination([0, 0]);
        setRoute([]);
    }

    useEffect(() => {
        const fetchRoute = async () => {

            if (
                !location ||
                location[0] === 0 ||
                !destination ||
                destination[0] === 0
            ) return;

            try {
                const res = await fetch(
                    `https://api.openrouteservice.org/v2/directions/driving-car?api_key=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjJkYjY4YmM3MzE3ZjRkMDA4NDc1ZDBlZWE4OTBhZTg4IiwiaCI6Im11cm11cjY0In0=&start=${location[1]},${location[0]}&end=${destination[1]},${destination[0]}`
                );

                const data = await res.json();

                // Check if the response has the expected structure
                if (data.features && data.features.length > 0 && data.features[0].geometry) {
                    const coords = data.features[0].geometry.coordinates.map(c => [
                        c[1],
                        c[0]
                    ]);


                    setRoute(coords);
                } else {
                    console.warn("No route data found in response", data);
                    setRoute([]);
                }
            } catch (error) {
                console.error("Error fetching route:", error);
                setRoute([]);
            }
        };

        fetchRoute();
    }, [location, destination]);

    useEffect(() => {
        console.log("Listening WebSocket...");

        echo.channel("chauffeurs")
            .listen(".new-booking", (e) => {
                console.log("EVENT:", e);
                setOffers(prev => [...prev, e.course]);
            });

    }, []);
    return (

        <div className="flex min-h-screen bg-slate-100">
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

            <div className="flex flex-col flex-1">
                <Header page="Tableau de bord" setOpenSidebar={setOpenSidebar} />

                <main className="flex-1 p-4 lg:p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-slate-900">
                            Bonjour, <span className="text-amber-500">{user.first_name} {user.last_name}</span>
                        </h2>
                        <p className="text-slate-500">
                            {isAccepted ? "Course acceptée - Suivi en temps réel" : "Courses disponibles pour le chauffeur aujourd'hui :"}
                        </p>
                    </div>

                    {offers.map((offer) => (
                        <div key={offer.id} className="card">
                            <h3>{offer.pickup_location} → {offer.destination}</h3>
                            <p>{offer.price} DH</p>

                            <button onClick={() => acceptOffer(offer.id)}>
                                Accepter
                            </button>
                        </div>
                    ))}


                    {!isAccepted ? (
                        <>
                            {/* 🔄 Driver en attente */}
                            {reservations.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                                    <FaSpinner className="animate-spin text-4xl text-blue-500" />
                                    <p className="text-slate-600">
                                        En attente de nouvelles réservations...
                                    </p>
                                </div>
                            ) : (

                                <div className="grid gap-4">
                                    {reservations.map((res, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                                        >
                                            <div className="mb-4">
                                                <p className="font-semibold text-lg text-slate-900 mb-2">
                                                    📍 Trajet
                                                </p>
                                                <div className="space-y-2 ml-4">
                                                    <p className="text-sm text-slate-700">
                                                        <span className="font-medium">Départ:</span> {res?.pickup_location}
                                                    </p>
                                                    <p className="text-sm text-slate-700">
                                                        <span className="font-medium">Destination:</span> {res?.destination}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-slate-50 rounded-lg">
                                                <div className="text-center">
                                                    <p className="text-xs text-slate-500 uppercase">Distance</p>
                                                    <p className="text-lg font-semibold text-slate-900">
                                                        {res?.distance?.toFixed(2)} km
                                                    </p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-slate-500 uppercase">Durée</p>
                                                    <p className="text-lg font-semibold text-slate-900">
                                                        {Math.round(res?.duration)} min
                                                    </p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-slate-500 uppercase">Prix</p>
                                                    <p className="text-lg font-semibold text-amber-500">
                                                        {res?.price?.toFixed(2)} DH
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition"
                                                    onClick={() => accepter()}>
                                                    ✓ Accepter
                                                </button>
                                                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
                                                    onClick={() => refuser()}>
                                                    ✕ Refuser
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        /* Map display when course is accepted */
                        <div className="space-y-6">
                            <div className="bg-linear-to-br from-slate-200 to-slate-100 rounded-lg h-125 relative">
                                <MapContainer
                                    center={location}
                                    zoom={15}
                                    style={{ height: "600px", width: "100%" }}
                                >
                                    <TileLayer
                                        attribution='&copy; OpenStreetMap contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    {/* User Location Marker */}
                                    {userLocation && (
                                        <Marker position={userLocation} icon={userIcon}>
                                            <Popup>
                                                <div>
                                                    <p className="font-bold">Votre localisation</p>
                                                    <p className="text-xs">Lat: {userLocation[0].toFixed(4)}</p>
                                                    <p className="text-xs">Lng: {userLocation[1].toFixed(4)}</p>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    )}

                                    {/* Destination Marker */}
                                    {destination[0] !== 31.6295 && destination[1] !== -8.0088 && (
                                        <Marker position={destination} icon={destIcon}>
                                            <Popup>
                                                <div>
                                                    <p className="font-bold">Destination</p>
                                                    <p className="text-xs">Lat: {destination[0].toFixed(4)}</p>
                                                    <p className="text-xs">Lng: {destination[1].toFixed(4)}</p>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    )}

                                    {/* Route Polyline */}
                                    {route.length > 0 && <Polyline positions={route} color="blue" weight={3} opacity={0.7} />}
                                </MapContainer>

                                {isLoadingLocation && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                                        <div className="bg-white px-4 py-2 rounded-lg">
                                            <p className="text-sm font-semibold">Localisation en cours...</p>
                                        </div>
                                    </div>
                                )}

                                {locationError && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 rounded-lg">
                                        <div className="bg-red-100 px-4 py-2 rounded-lg">
                                            <p className="text-sm font-semibold text-red-800">{locationError}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition text-lg"
                                onClick={() => refuser()}>
                                ✕ Annuler la course
                            </button>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}