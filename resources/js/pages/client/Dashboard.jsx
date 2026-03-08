import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
    return (
        <>
            <div className="flex min-h-screen bg-gray-100">

                <Sidebar />


                <div className="flex flex-col flex-1 ml-64">

                    <main className="flex-1 p-6">

                        <div className="bg-white p-6 rounded-xl shadow">
                            <h1 className="text-2xl font-bold mb-6">
                                Reserve a Taxi
                            </h1>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Pickup Location</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        placeholder="Enter pickup location"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Drop-off Location</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        placeholder="Enter drop-off location"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Date</label>
                                    <input 
                                        type="date" 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Time</label>
                                    <input 
                                        type="time" 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Number of Passengers</label>
                                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <button 
                                    type="submit" 
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                                >
                                    Reserve Taxi
                                </button>
                            </form>
                        </div>

                    </main>



                </div>

            </div>
           
        </>



    );
}