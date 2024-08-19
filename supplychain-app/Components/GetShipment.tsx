"use client"
import { useState } from "react";
import { getShipment } from "@/Functions/functions";
import { BigNumber } from "ethers";
enum ShipmentStatus {
    Pending,
    In_Transit,
    Completed
}

interface Shipment {
    sender:string;
    receiver: string;
    pickupTime:string;
    deliveryTime:string;
    distance: number;
    price: number;
    status: ShipmentStatus;
    isPaid: boolean;
    orderInfo:string;
}
interface startShipmentProps{
    onClose:()=>void;
}
export default function startShipment({onClose}:startShipmentProps){
    const [index,setIndex]=useState<string>("0");
    const [singleShipmentData,setSingleShipmentData]=useState<Shipment>();
    const getShipmentData=async()=>{
        const data=await getShipment(Number(index));
        setSingleShipmentData(data);
        console.log(data);
    }
    const formatBigNumber=(bigNumber:any)=>{
        return bigNumber.toString();
    }
    
    const formatDateFromBigNumber = (bigNumber:any) => {
    const timestamp = parseInt(bigNumber.toString(), 10); // Convert to number
    const date = new Date(timestamp * 1000); // Assuming timestamp is in seconds
    return date.toLocaleString(); // You can format the date as needed
};


    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div> {/* Semi-transparent background */}
        <div className="flex items-center justify-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-6 mx-auto bg-white rounded-md shadow-lg"> {/* Pure white background for modal */}
            <div className="flex justify-end">
              <button onClick={onClose} className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                Close
              </button>
            </div>
            <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
              <h4 className="text-lg font-medium text-gray-800">
                Product Tracking Details
              </h4>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="relative mt-3">
                  <input
                    type="number"
                    placeholder="index"
                    className="w-full pl-5 pr-3 py-2 text-gray-500 outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    onChange={(e) => setIndex(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => getShipmentData()}
                  className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
                >
                  Get Details
                </button>
              </form>
              {singleShipmentData === undefined ? (
                ""
              ) : (
                <div className="text-left">
                  <p>Sender: {singleShipmentData.sender.slice(0, 25)}...</p>
                  <p>Receiver: {singleShipmentData.receiver.slice(0, 25)}...</p>
                  <p>Pickup Time: {formatDateFromBigNumber(singleShipmentData.pickupTime)}</p>
                  <p>Delivery Time: {formatDateFromBigNumber(singleShipmentData.deliveryTime)}</p>
                  <p>Distance: {formatBigNumber(singleShipmentData.distance)/10e17}</p>
                  <p>Price: {(singleShipmentData.price)*10e17} ETH</p>
                  <p>Status: {ShipmentStatus[singleShipmentData.status]}</p>
                  <p>
                    Paid: {singleShipmentData.isPaid ? "Complete" : "Not Complete"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }