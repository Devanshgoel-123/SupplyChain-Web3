"use client"
import { useState } from "react";
import React from "react";
import { completeShipment, getShipment } from "@/Functions/functions";
interface completeShipmentInterface{
  receiver:string,
  index:number
}
interface CompShippingProps{
  onClose:()=>void
}


interface OrderFormProps {
  onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onClose }) => {
  const [receiver, setReceiver] = useState<string>("");
  const [index, setIndex] = useState<string>("");
  const [sender,setSender]=useState<string>("");
  const [completeshipment,setCompleteShipment]=useState<boolean>(false);


  const handleReceiver = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiver(e.target.value);
  };
  const handleIndex=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setIndex(e.target.value);
  }
  const handleSender=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setSender(e.target.value);
  }
  const handleCompleteOrder =async () => {

        const completeShipmentObject={
          receiver:receiver,
          index:Number(index),
          sender:sender
        }
        const completeShipping=await completeShipment(completeShipmentObject);
        console.log(completeShipping)
        setCompleteShipment(true);
      }
  

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full mx-4">
          <div className="flex flex-row justify-around items-center ">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Match Order
          </h2>
          <button onClick={()=>{
            onClose();
            console.log("i got clicked")
          }} className="text-gray-600">
            Close Button
          </button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">  
     
          
          <input
            type="text"
            name="Receiver"
            placeholder="Receiver's Address"
            value={receiver}
            onChange={handleReceiver}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-full mt-5"
          />
          <input
            type="text"
            name="Index"
            placeholder="Index of the Shipment"
            value={index}
            onChange={handleIndex}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-full mt-5"
          />
           <input
            type="text"
            name="Sender's Address"
            placeholder="Sender's Address"
            value={sender}
            onChange={handleSender}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-full mt-5"
          />
           <button
            onClick={handleCompleteOrder}
            className="w-full mt-6 p-2 rounded-lg text-white font-semibold bg-black "
          >
            Complete Shipment
          </button>
          {completeshipment&& (
            <p className="text-green-600 font-semibold mt-4 text-center">
              Shipment has been Completed Successfully!!
            </p>
          )}
       </div>
      </div>
    </div>
    </div>
  );
};

export default OrderForm;
