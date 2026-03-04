export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-black">
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-sm">
            &copy; {currentYear} TaxiGo. All rights reserved.
          </p>
        </div>
    </footer>
  );
}