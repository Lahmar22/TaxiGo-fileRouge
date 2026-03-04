export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer className="text-white py-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-black">
                        © {currentYear} TaxiGo. Tous droits réservés.
                    </p>
                </div>
            </footer>
        </>
    );
}