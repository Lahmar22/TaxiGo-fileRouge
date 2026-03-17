import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import imageTaxi from "../assets/image.png";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />

        <section className="bg-linear-to-b from-white via-slate-50 to-slate-100 min-h-screen flex items-center pt-20">
          <div className="max-w-7xl mx-auto px-6 py-24 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* LEFT SIDE */}
              <div className="space-y-8 z-10 relative">

                <div className="animate-fade-up inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                  <span className="text-yellow-400 text-sm font-semibold">
                    Disponible 24h/24 · 7j/7
                  </span>
                </div>

                <h1 className="animate-fade-up delay-1 text-5xl md:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                  Votre Taxi <br />
                  <span className="gradient-text">en un clic</span>
                </h1>

                <p className="animate-fade-up delay-2 text-lg text-slate-400 leading-relaxed max-w-lg">
                  Réservez votre taxi partout au Maroc en quelques secondes.
                  Chauffeurs certifiés, tarifs transparents, trajet sécurisé.
                </p>

                <div className="animate-fade-up delay-4 flex flex-wrap items-center gap-6">

                  {/* Item */}
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      />
                    </svg>
                    <span className="text-slate-400 text-sm">
                      Chauffeurs vérifiés
                    </span>
                  </div>

                  {/* Item */}
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      />
                    </svg>
                    <span className="text-slate-400 text-sm">
                      Sans frais cachés
                    </span>
                  </div>

                  {/* Item */}
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      />
                    </svg>
                    <span className="text-slate-400 text-sm">
                      Annulation gratuite
                    </span>
                  </div>

                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="lg:flex justify-center items-center relative animate-fade-in delay-3">

                <div className="absolute w-72 h-72 rounded-full bg-yellow-400/20 blur-3xl"></div>

                <div className="relative z-10 bg-white border rounded-3xl animate-float">
                  <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-2 shadow-2xl">
                    <img
                      src={imageTaxi}
                      alt="Taxi Morocco"
                      className="rounded-2xl w-full max-w-md object-cover shadow-xl"
                    />
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}