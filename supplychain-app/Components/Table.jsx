export default ()=>{
    const allShipments=[];
    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-4">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Create Trackings
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>
                <div className="mt-3 md:mt-0">
                    <p className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text=sm rounded-lg md:inline-flex">
                        Add Tracking
                    </p>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 py-6">Sender</th>
                            <th className="py-3 px-6">Receiver</th>
                            <th className="py-3 px-6">PickupTime</th>
                            <th className="py-3 px-6">Distance</th>
                            <th className="py-3 px-6">Price</th>
                            <th className="py-3 px-6">Delivery Time</th>
                            <th className="py-3 px-6">Paid</th>
                            <th className="py-3 px-6">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {}
                    </tbody>
                </table>

            </div>
        </div>
    )
}