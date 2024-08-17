"use client"
import React, { useEffect, useState } from "react";
import OrderForm from "./shipmentOrder";
import { getAllShipments } from "@/Functions/functions";
interface Shipment {
    sender:string;
    receiver: string;
    pickupTime:number;
    deliveryTime:number;
    distance: number;
    price: number;
    status: ShipmentStatus;
    isPaid: boolean;
    orderInfo:string;
}
enum ShipmentStatus {
    Pending,
    In_Transit,
    Completed
}
const TableComponent: React.FC = () => {
    const [clicked, setClicked] = useState<boolean>(false);
    const [allShipments,setAllShipments]=useState<Shipment[]>([]);
    const handleClose = async () => {
        setClicked(false);
        console.log("I got clicked");
        const shipments=await getAllShipments();
    console.log(shipments);
        
    };
    
    return (
        <>
            {clicked && <OrderForm onClose={handleClose}/>}
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
                    <div className="mt-3 md:mt-0" onClick={() => setClicked(!clicked)}>
                        <p className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text=sm rounded-lg md:inline-flex">
                            Add Tracking
                        </p>
                    </div>
                </div>
                <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">Sender</th>
                                <th className="py-3 px-6">Receiver</th>
                                <th className="py-3 px-6">PickupTime</th>
                                <th className="py-3 px-6">Distance</th>
                                <th className="py-3 px-6">Price</th>
                                <th className="py-3 px-6">Delivery Time</th>
                                <th className="py-3 px-6">Paid</th>
                                <th className="py-3 px-6">Status</th>
                            </tr>
                        </thead>
                        {(allShipments)? <tbody className="text-gray-600 divide-y">
                            
                            {allShipments.map((shipment:Shipment,index:number)=>{
                                return <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {shipment.sender.slice(0,15)}...
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {shipment.receiver.slice(0,15)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {String(shipment.pickupTime)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {String(shipment.distance)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {String(shipment.price)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {String(shipment.deliveryTime)}...
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {shipment.isPaid ? "Completed":"Not Completed"}...
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {shipment.status==0
                                         ? "Pending"
                                         :shipment.status==1
                                         ? "IN_TRANSIT"
                                         :"Delivered"
                                        }...
                                    </td>
                                </tr>
                            })}
                        </tbody> : null}
                    </table>
                </div>
            </div>
        </>
    );
};

export default TableComponent;
