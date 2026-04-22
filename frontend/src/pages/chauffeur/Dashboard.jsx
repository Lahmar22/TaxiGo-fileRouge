import { useState, useEffect, use } from "react";
import Header from "../chauffeur/components/Header";
import Sidebar from "../chauffeur/components/Sidebar";
import { FaSpinner } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import axios from "axios";
import echo from "../../echo";
import { data } from "react-router-dom";


export default function Dashboard() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const [location, setLocation] = useState([32.2994, -9.2372]);
    const [locationError, setLocationError] = useState(null);
    const [destination, setDestination] = useState([0, 0]);
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [route, setRoute] = useState([]);
    const token = localStorage.getItem("token");
    const [offers, setOffers] = useState([]);
    const chauffeurOnlineStatus = JSON.parse(localStorage.getItem("chauffeurOnlineStatus")) || true;
    const [courseAccepted, setCourseAccepted] = useState(null);
    const [hasArrived, setHasArrived] = useState(false);

    const userIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

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


    const acceptOffer = async (id) => {
        try {
            const { data } = await axios.patch(`http://127.0.0.1:8000/api/course/${id}/accepte`, {
                "status": "confirmee",
                "chauffeur_id": user.chauffeur.id,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOffers(prev => prev.filter(offer => offer.id !== id));
            setIsAccepted(true);
            destinationName(data.course.adresse_depart);
            setCourseAccepted(data.course);
            console.log(data.course);
        } catch (err) {
            console.log(err);
        }
    };


    async function destinationName(address) {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
            );

            const data = await res.json();

            if (!data || data.length === 0) {
                console.error("Address not found");
                return;
            }

            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);

            setDestination([lat, lng]);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        if (!token || !user?.chauffeur?.id) return;

        const channel = echo.channel('chauffeur.' + user.chauffeur.id);

        channel.listen('.new-booking', (event) => {
            console.log('New booking received:', event);

            const newCourse = event.course;

            if (newCourse && !newCourse.chauffeur_id && newCourse.status !== "annuler" && newCourse.status !== "terminee") {
                setOffers(prev => {
                    const exists = prev.some(o => o.id === newCourse.id);
                    if (exists) return prev;
                    return [...prev, newCourse];
                });
            }
        });

        const coursesChannel = echo.channel('courses');

        coursesChannel.listen('.booking-accepted', (event) => {
            console.log('Booking accepted:', event);
            setOffers(prev => prev.filter(o => o.id !== event.course.id));
        });

        coursesChannel.listen('.booking-cancelled', (event) => {
            console.log('Booking cancelled:', event);
            setOffers(prev => prev.filter(o => o.id !== event.course.id));
        });

        return () => {
            echo.leaveChannel('chauffeur.' + user.chauffeur.id);
            echo.leaveChannel('courses');
        };
    }, [token, user?.chauffeur?.id]);

    const arriveeClient = async (destinationClient) => {
        try {
            destinationName(destinationClient);
            setHasArrived(true);

            await axios.post(`http://127.0.0.1:8000/api/course/${courseAccepted.id}/arrivee-client`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

        } catch (error) {
            console.error("Erreur API arrivée :", error);
        }
    };

    const terminerCourse = async () => {
        try {
            if (!courseAccepted?.id) return;

            await axios.patch(`http://127.0.0.1:8000/api/course/${courseAccepted.id}/terminer`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Reset all states
            setIsAccepted(false);
            setHasArrived(false);
            setCourseAccepted(null);
            setRoute([]);
            setDestination([0, 0]);

            console.log('Course completed successfully');
        } catch (err) {
            console.error('Error completing course:', err);
        }
    };

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
                            {isAccepted ? "Course acceptée" : "Courses disponibles pour le chauffeur aujourd'hui :"}
                        </p>
                    </div>
                    {!chauffeurOnlineStatus && (
                        <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 mb-6" role="alert">
                            <p>maintenant est hors ligne</p>
                        </div>
                    )}

                    {!isAccepted && offers.length > 0 && (
                        <div className="grid gap-4 mb-6">
                            <h3 className="text-lg font-semibold text-slate-900">📦 Offres Disponibles</h3>
                            {offers.map((offer) => (
                                <div key={offer.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                                    <div className="mb-4">
                                        <p className="font-semibold text-lg text-slate-900 mb-2">
                                            📍 Trajet
                                        </p>
                                        <div className="space-y-2 ml-4">
                                            <p className="text-sm text-slate-700">
                                                <span className="font-medium">Départ:</span> {offer.adresse_depart || offer.pickup_location}
                                            </p>
                                            <p className="text-sm text-slate-700">
                                                <span className="font-medium">Destination:</span> {offer.destination}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-slate-50 rounded-lg">
                                        <div className="text-center">
                                            <p className="text-xs text-slate-500 uppercase">Distance</p>
                                            <p className="text-lg font-semibold text-slate-900">
                                                {Number(offer?.distance)?.toFixed(2)} km
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-slate-500 uppercase">Prix</p>
                                            <p className="text-lg font-semibold text-amber-500">
                                                {(Number(offer.prix_course) || Number(offer.price))?.toFixed(2)} DH
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-slate-500 uppercase">Status</p>
                                            <p className="text-lg font-semibold text-blue-500">
                                                {offer.status || "Disponible"}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition"
                                        onClick={() => acceptOffer(offer.id)}
                                    >
                                        ✓ Accepter cette offre
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}


                    {!isAccepted ? (
                        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                            <FaSpinner className="animate-spin text-4xl text-blue-500" />
                            <p className="text-slate-600">
                                En attente de nouvelles réservations...
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="">
                                {!hasArrived ? (
                                    <button
                                        onClick={() => arriveeClient(courseAccepted?.destination)}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold rounded-xl shadow-md shadow-green-200 transition-all duration-200"
                                    >
                                        Arrivée à la clientèle
                                    </button>
                                ) : (
                                    <button
                                        onClick={terminerCourse}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-semibold rounded-xl shadow-md shadow-blue-200 transition-all duration-200"
                                    >
                                        ✓ Terminer la course
                                    </button>
                                )}
                            </div>
                            <div className="relative z-0 bg-linear-to-br from-slate-200 to-slate-100 rounded-lg h-125">
                                <MapContainer
                                    center={location}
                                    zoom={15}
                                    style={{ height: "600px", width: "100%" }}
                                >
                                    <TileLayer
                                        attribution='&copy; OpenStreetMap contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

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
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}