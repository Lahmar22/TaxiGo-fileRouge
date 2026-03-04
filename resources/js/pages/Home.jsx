import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
export default function Home() {

    return (
        <main>
            <Navbar />
            <h1 className="text-center text-red-300 ">
                TaxiGo
            </h1>
            <Footer />
        </main>
        
    );
}