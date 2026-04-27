import Sidebar from "../client/components/Sidebar";
import Header from "../client/components/Header";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { GiRadarSweep } from "react-icons/gi";
import axios from "axios";
import echo from "../../echo";
import { BsTelephone } from "react-icons/bs";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Paiement from "./components/Paiement";
import { stripePromise } from "../../stripe";
import Reclamation from "./components/Reclamation";






export default function Dashboard() {
  const [location, setLocation] = useState([32.2994, -9.2372]);
  const [locationError, setLocationError] = useState(null);
  const [destination, setDestination] = useState([0, 0]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [placeName, setPlaceName] = useState(null);
  const [destinationAdresse, setDestinationAdresse] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [price, setPrice] = useState(null);
  const [bookingData, setBookingData] = useState(JSON.parse(localStorage.getItem("bookingData")) || null);
  const [isPaid, setIsPaid] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);


  // Custom icon for user location
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
        getAddress(lat, lng).then((name) => setPlaceName(name));


      },
      (error) => {
        setLocationError(error.message);
        setIsLoadingLocation(false);
        console.error("Geolocation error:", error);
      }
    );
  }, []);

  async function getAddress(lat, lng) {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );

    const data = await res.json();
    return data.display_name;
  }

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

          const summary = data.features[0].properties.summary;

          const distanceKm = summary.distance / 1000;
          const durationMin = summary.duration / 60;

          const pricePerKm = 3;
          const calculatedPrice = distanceKm * pricePerKm;

          setPrice(calculatedPrice);

          setDistance(distanceKm);
          setDuration(durationMin);
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



  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const submitBooking = async () => {
    if (!placeName || !destinationAdresse) {
      alert("Veuillez entrer une adresse de départ et une destination valides.");
      return;
    }

    if (distance === null || duration === null || price === null) {
      alert("Veuillez attendre le calcul de la distance et du tarif.");
      return;
    }

    const newBookingData = {
      client_id: user.client.id,
      pickup_location: placeName,
      destination: destinationAdresse,
      distance: distance,
      duration: duration,
      price: price,
      latitude_lang_pickup: location,
      latitude_lang_destination: destination,
      status: "en attente"
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/courses",
        newBookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookingData(res.data.course);
      localStorage.setItem("bookingData", JSON.stringify(res.data.course));

    } catch (error) {
      console.error(error);
    }

  };



  const resetBooking = async (id) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/course/${id}/annuler`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

    } catch (err) {
      console.log(err);
    }

    setBookingData(null);
    localStorage.removeItem("bookingData");
  };

  useEffect(() => {
    const channel = echo.channel('courses');

    channel.listen('.booking-accepted', (event) => {
      console.log('[Client] booking-accepted reçu:', event);
      setBookingData(prev => {
        if (prev && prev.id === event.course.id) {
          const updated = {
            ...prev, status: 'confirmee',
            chauffeur: event.course.chauffeur,
            chauffeur_id: event.course.chauffeur_id
          };
          localStorage.setItem('bookingData', JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    });


    channel.listen('.booking-terminated', (event) => {
      console.log('[Client] booking-terminated reçu:', event);
      setBookingData(prev => {
        if (prev && prev.id === event.course.id) {
          const updated = {
            ...prev, status: 'terminee'
          };
          localStorage.setItem('bookingData', JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    });

    channel.listen('.booking-arrive', (event) => {
      console.log('[Client] booking-arrive reçu:', event);
      setBookingData(prev => {
        if (prev && prev.id === event.course.id) {
          const updated = {
            ...prev, status: 'arrive'
          };
          localStorage.setItem('bookingData', JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    });

    return () => {
      echo.leaveChannel('courses');
    };
  }, []);

  const submitEvaluation = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/evaluations",
        {
          note: rating,
          commentaire: comment,
          course_id: bookingData?.id,
          client_id: user.client.id,
          chauffeur_id: bookingData?.chauffeur_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Evaluation submitted:", res.data.message);

    } catch (error) {
      console.error(error);
    }
  }





  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

      <div className="flex flex-col flex-1">

        <Header page="Tableau de bord" setOpenSidebar={setOpenSidebar} />

        <main className="flex-1 p-6 space-y-6">
          <div className="mb-8 animate-fade-up">
            <div className="flex items-center justify-between flex-wrap gap-4">

              {/* Left: Greeting */}
              <div>
                <h2 className="text-3xl font-black text-slate-900">
                  Bonjour,{" "}
                  <span className="gradient-text">
                    {user.first_name} {user.last_name}
                  </span>
                </h2>
                <p className="text-slate-500 mt-1">
                  Prêt pour votre prochaine course ?
                </p>
              </div>

              {/* Right: Button */}
              <button
                onClick={() => setOpen(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg shadow transition"
              >
                Faire une réclamation
              </button>
            </div>

            {/* Modal */}
            {open && (
              <div
                className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                onClick={() => setOpen(false)} // 👈 click outside closes
              >
                <div
                  className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative animate-scale-in"
                  onClick={(e) => e.stopPropagation()} // 👈 prevent close when clicking inside
                >
                  {/* Close button */}
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-red-500 text-lg"
                  >
                    ✕
                  </button>

                  {/* Reclamation component */}
                  <Reclamation onClose={() => setOpen(false)} />
                </div>
              </div>
            )}
          </div>

          <div className="grid xl:grid-cols-5 gap-6">

            {bookingData?.status === "en attente" ? (
              <div className="xl:col-span-2 bg-white rounded-lg p-6 space-y-4 shadow">
                <GiRadarSweep className="animate-spin text-4xl text-blue-500 mx-auto" />

                <h3 className="text-xl text-center font-semibold text-slate-900">
                  Offre envoyée aux chauffeurs disponibles...
                </h3>


                {!isPaid && (
                  <div className="mt-4">
                    <Elements stripe={stripePromise}>
                      <Paiement
                        bookingData={{
                          ...bookingData,
                          amount: Number(bookingData.prix_course),
                          course_id: bookingData?.id,
                        }}
                        onSuccess={() => {
                          setIsPaid(true);
                        }}
                      />
                    </Elements>
                  </div>
                )}

                {isPaid && (
                  <div className="mt-4 text-center text-green-600 font-semibold">
                    ✅ Paiement effectué avec succès
                  </div>
                )}


                {/* Bouton annuler */}
                <button
                  onClick={() => resetBooking(bookingData.id)}
                  className="w-full py-2 px-4 rounded-lg font-semibold text-sm bg-red-500 hover:bg-red-600 text-white transition-all duration-300"
                >
                  Annuler
                </button>
              </div>
            ) : bookingData?.status === "confirmee" ? (
              <div className="xl:col-span-2 bg-white rounded-lg p-6 space-y-4 shadow">
                <div className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-xl px-5 py-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-green-700 font-semibold text-sm">Course confirmée</p>
                    <p className="text-green-600 text-xs mt-0.5">Votre chauffeur a accepté la course</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Arrivée estimée</p>
                    <p className="text-2xl font-semibold text-green-600 animate-pulse">4 min</p>
                  </div>


                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-4 shadow-sm">
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Votre chauffeur</p>

                  {/* Header chauffeur */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold text-lg shrink-0">
                      LZ
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{bookingData.chauffeur.user.first_name} {bookingData.chauffeur.user.last_name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-amber-400 text-sm">{"★".repeat(Math.round(4))}</span>
                        <span className="text-xs text-gray-500">{4} </span>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex">
                      <a href={`tel:${bookingData.chauffeur.user.number_phone}`}
                        className="w-10 h-10 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
                        title="Appeler le chauffeur">
                        <BsTelephone />
                      </a>

                    </div>
                  </div>

                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-4 shadow-sm">
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Itinéraire</p>

                  {/* Points départ / arrivée */}
                  <div className="flex gap-4 items-stretch">
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white ring-1 ring-green-400" />
                      <div className="w-0.5 flex-1 bg-linear-to-b from-green-400 to-blue-500 rounded-full min-h-8" />
                      <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white ring-1 ring-blue-400" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="bg-gray-50 rounded-lg px-4 py-2.5">
                        <p className="text-xs text-gray-400">Départ</p>
                        <p className="text-sm text-gray-800 font-medium mt-0.5">{bookingData.adresse_depart}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg px-4 py-2.5">
                        <p className="text-xs text-gray-400">Arrivée</p>
                        <p className="text-sm text-gray-800 font-medium mt-0.5">{bookingData.destination}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats course */}
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Distance</p>
                      <p className="text-sm font-semibold text-gray-700 mt-0.5">{bookingData.distance.toFixed(2)} km</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Durée</p>
                      <p className="text-sm font-semibold text-gray-700 mt-0.5">{Number(duration).toFixed(2)} min</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Prix estimé</p>
                      <p className="text-base font-bold text-gray-900 mt-0.5">{bookingData.prix_course.toFixed(2)} MAD</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : bookingData?.status === "arrive" ? (
              <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-md border border-slate-100">
                <div className="flex items-center gap-4">

                  <div className="bg-green-100 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Chauffeur arrivé 🚖
                    </h3>
                    <p className="text-sm text-slate-500">
                      Le chauffeur est arrivé au point de prise en charge du client.
                    </p>
                  </div>
                </div>

                <div className="mt-4 bg-slate-50 p-4 rounded-xl text-sm text-slate-600">
                  Merci de rejoindre votre chauffeur. Le trajet commencera bientôt.
                </div>


              </div>

            ) : bookingData?.status === "terminee" ? (
              <div className="xl:col-span-2 bg-linear-to-br from-slate-50 to-slate-100 rounded-2xl shadow-lg border border-slate-200 p-8 max-w-lg mx-auto">

                {/* Completion Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 border-4 border-green-500 flex items-center justify-center animate-bounce">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                    Course complétée !
                  </h2>
                  <p className="text-slate-600 text-sm font-medium">
                    {bookingData.chauffeur.user.first_name} {bookingData.chauffeur.user.last_name}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">Partagez votre avis sur cette course</p>
                </div>

                {/* Driver Card */}
                <div className="bg-white rounded-xl p-4 mb-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0">
                      {bookingData.chauffeur.user.first_name.charAt(0)}{bookingData.chauffeur.user.last_name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{bookingData.chauffeur.user.first_name} {bookingData.chauffeur.user.last_name}</p>
                      <p className="text-sm text-slate-500 mt-1">✓ Course complétée avec succès</p>
                    </div>
                  </div>
                </div>

                {/* Trip Stats */}
                <div className="grid grid-cols-3 gap-2 mb-8">
                  <div className="text-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                    <p className="text-xs text-slate-500 font-medium mb-1">Distance</p>
                    <p className="text-lg font-bold text-slate-900">{bookingData.distance?.toFixed(2)}</p>
                    <p className="text-xs text-slate-500">km</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                    <p className="text-xs text-slate-500 font-medium mb-1">Durée</p>
                    <p className="text-lg font-bold text-slate-900">{Number(duration).toFixed(2) || 0}</p>
                    <p className="text-xs text-slate-500">min</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                    <p className="text-xs text-slate-500 font-medium mb-1">Prix</p>
                    <p className="text-lg font-bold text-amber-600">{bookingData.prix_course?.toFixed(2)}</p>
                    <p className="text-xs text-slate-500">MAD</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm mb-6">
                  <label className="block text-sm font-semibold text-slate-900 mb-4">
                    Évaluation
                  </label>

                  <div className="relative mb-4">
                    <select
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                      className="w-full appearance-none px-4 py-3 pr-10 rounded-lg border-2 border-slate-300 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all cursor-pointer hover:border-slate-400"
                    >
                      <option value="0">Sélectionnez une note</option>
                      <option value="1">1 - Très mauvais</option>
                      <option value="2">2 - Mauvais</option>
                      <option value="3">3 - Moyen</option>
                      <option value="4">4 - Bon</option>
                      <option value="5">5 - Excellent</option>
                    </select>

                    {/* Custom arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>

                  {/* Commentaire optionnel */}
                  <div>
                    <label
                      htmlFor="commentaire"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Commentaire <span className="text-slate-400">(optionnel)</span>
                    </label>

                    <textarea
                      id="commentaire"
                      name="commentaire"
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Ajouter un commentaire (facultatif)..."
                      rows={2}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 border-fuchsia-500 p-3 rounded-lg">
                  <button
                    onClick={() => {
                      setIsTerminated(false);
                      setRating(0);
                      setComment("");
                      setBookingData(null);
                      setDestination([0, 0]);
                      setRoute([]);
                      localStorage.removeItem("bookingData");
                    }}
                    className="flex-1 py-3 rounded-lg font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
                  >
                    Passer
                  </button>
                  <button
                    onClick={() => {
                      submitEvaluation();
                      setIsTerminated(false);
                      setRating(0);
                      setComment("");
                      setBookingData(null);
                      setDestination([0, 0]);
                      setRoute([]);
                      localStorage.removeItem("bookingData");
                    }}
                    disabled={rating === 0}
                    className="flex-1 py-3 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
                  >
                    Envoyer l'évaluation
                  </button>
                </div>

              </div>
            ) : (

              <div className="xl:col-span-2">
                <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl relative overflow-hidden p-7 delay-1">

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

                  <div className="space-y-3 mb-5">

                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input id="pickupInput"
                        type="text"
                        value={placeName || ""}
                        onChange={(e) => setPlaceName(e.target.value)}
                        className="bg-white/7 border border-white/13 text-white rounded-xl pl-11 pr-4 py-3 w-full text-sm transition-all duration-300 outline-none"
                        placeholder="Point de départ" autoComplete="off" />
                    </div>

                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input id="destInput" type="text"
                        value={destinationAdresse || ""}
                        onChange={(e) => setDestinationAdresse(e.target.value)}
                        onBlur={(e) => destinationName(e.target.value)}
                        className="bg-white/7 border border-white/13 text-white rounded-xl pl-11 pr-4 py-3 w-full text-sm transition-all duration-300 outline-none"
                        placeholder="Destination" autoComplete="off" />
                    </div>
                  </div>

                  <button onClick={() => submitBooking()}

                    className="w-full py-4 rounded-xl font-bold text-slate-900 text-base bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 hover:shadow-2xl hover:shadow-yellow-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                    chercher des offers
                  </button>
                </div>


              </div>
            )}

            <div className="xl:col-span-3 space-y-6">

              <div className="relative z-0 bg-linear-to-br from-slate-200 to-slate-100 rounded-lg h-125">

                <MapContainer
                  center={location}
                  zoom={15}
                  style={{ height: "500px", width: "100%" }}
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



            </div>
          </div>

        </main>



      </div>


    </div>
  );
}