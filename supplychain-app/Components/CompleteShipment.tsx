"use client"
import { useState } from "react";
import React from "react";
import SHA256 from "crypto-js/sha256";
import { completeShipment, getShipment } from "@/Functions/functions";
interface completeShipmentInterface{
  receiver:string,
  index:number
}
interface CompShippingProps{
  onClose:()=>void
}
type Item = {
  name: string;
  quantity: number;
  price: number;
  batchNumber: string;
};

type Order = {
  id: string;
  hash: string;
  totalPrice: number;
};

enum ShipmentStatus {
  Pending,
  In_Transit,
  Completed,
}

interface OrderFormProps {
  onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onClose }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<Item>({
    name: "",
    quantity: 1,
    price: 0,
    batchNumber: "",
  });
  const [orderSaved, setOrderSaved] = useState(false);
  const [receiver, setReceiver] = useState<string>("");
  const [index, setIndex] = useState<string>("");

  const calculateTotalPrice = (): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]: name === "quantity" || name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleAddItem = () => {
    setItems([...items, currentItem]);
    setCurrentItem({ name: "", quantity: 1, price: 0, batchNumber: "" });
  };

  const handleReceiver = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiver(e.target.value);
  };
  const handleIndex=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setIndex(e.target.value);
  }
  const handleSaveReceivedItems = () => {
    const orderString = JSON.stringify(items);
    const hash = SHA256(orderString).toString();
    const getOrderInfo=async()=>{
      const shipment=await getShipment(Number(index));
      const receivedHash=shipment?.orderInfo;
      if(hash===receivedHash){
        const completeShipmentObject={
          receiver:receiver,
          index:Number(index)
        }
        const completeShipping=await completeShipment(completeShipmentObject);
      }
    }
    getOrderInfo();
  };

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
              name="name"
              placeholder="Item Name"
              value={currentItem.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Enter the Quantity of the Item"
              value={currentItem.quantity}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="price"
              placeholder="Enter the Price of the Item"
              value={currentItem.price}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="batchNumber"
              placeholder="Batch Number"
              value={currentItem.batchNumber}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddItem}
              className="bg-blue-500 text-white font-semibold rounded-lg p-2 mt-4 hover:bg-blue-600"
            >
              Add Item
            </button>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mt-5">Items in Order</h3>
          <ul className="list-disc list-inside mt-2 space-y-2">
            {items.map((item, index) => (
              <li key={index} className="text-gray-600">
                <span className="font-bold">{item.name}</span> - Quantity:{" "}
                {item.quantity}, Price: $
                {(item.price * item.quantity).toFixed(2)}, Batch:{" "}
                {item.batchNumber}
              </li>
            ))}
          </ul>
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
          <h4 className="text-lg font-bold text-gray-700 mt-4">
            Total Price: ${calculateTotalPrice().toFixed(2)}
          </h4>
          <button
            onClick={handleSaveReceivedItems}
            disabled={items.length === 0}
            className={`w-full mt-6 p-2 rounded-lg text-white font-semibold ${
              items.length === 0 ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Save Receivables and Hash
          </button>
          {orderSaved && (
            <p className="text-green-600 font-semibold mt-4 text-center">
              Shipment has been completed Successfully
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
