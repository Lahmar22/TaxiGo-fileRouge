import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
export default function Home() {

    return (
        <>
            <div>
                <Navbar />
                <section className="pt-24 md:pt-48 pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

                        <div className="space-y-6 md:space-y-8 animate-slide-in">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                                Votre Taxi <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                                    en un clic
                                </span>
                            </h1>

                            <p className="text-lg sm:text-xl text-gray-600">
                                Réservez votre taxi partout au Maroc. Rapide, sûr et fiable.
                            </p>
                        </div>

                        <div className="animate-fade-in">
                            <img
                                src="https://main-taxi-frankfurt.de/wp-content/uploads/2024/12/Taxi-Festpreise-Frankfurt-1-768x512.png"
                                alt="Taxi Morocco"
                                className="rounded-2xl shadow-2xl w-full h-auto"
                            />
                        </div>

                    </div>
                </section>
                <Footer />
            </div>
        </>

    );
}