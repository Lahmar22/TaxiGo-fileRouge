import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex flex-col flex-1 lg:ml-64">

        <Header />


        <main className="flex-1 p-6 space-y-6">

          


          <div className="bg-white p-6 rounded-xl shadow-sm max-w-3xl">

            <h2 className="text-xl font-bold mb-6 text-slate-800">
              Reserve a Taxi
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">


              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Pickup Location
                </label>
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Drop-off Location
                </label>
                <input
                  type="text"
                  placeholder="Enter drop-off location"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Passengers */}
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Number of Passengers
                </label>
                <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>1 Passenger</option>
                  <option>2 Passengers</option>
                  <option>3 Passengers</option>
                  <option>4 Passengers</option>
                </select>
              </div>

              {/* Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Reserve Taxi
                </button>
              </div>

            </form>

          </div>

        </main>

        

      </div>

    </div>
  );
}