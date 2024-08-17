"use client"
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import SHA256 from "crypto-js/sha256";
import { addOrderHash } from "../redux/features/OrderSlice" // Import the action from the slice

type Item = {
  name: string;
  quantity: number;
  price: number;
  batchNumber: string;
};

type Order = {
  id: string;
  hash: string;
};

const OrderForm: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<Item>({ name: "", quantity: 1, price: 0, batchNumber: "" });
  const [orderSaved, setOrderSaved] = useState(false);

  const dispatch = useDispatch();

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

  const handleSaveOrder = () => {
    const orderString = JSON.stringify(items);
    const hash = SHA256(orderString).toString();
    const orderId = `order-${Date.now()}`;
    const order: Order = {
      id: orderId,
      hash: hash,
    };
    dispatch(addOrderHash(order));
    setOrderSaved(true);
    console.log("Order saved:", order);
  };

  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full mx-4">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Create Order</h2>

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

          <h3 className="text-lg font-medium text-gray-700 mt-8">Items in Order</h3>
          <ul className="list-disc list-inside mt-4 space-y-2">
            {items.map((item, index) => (
              <li key={index} className="text-gray-600">
                <span className="font-bold">{item.name}</span> - Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}, Batch: {item.batchNumber}
              </li>
            ))}
          </ul>

          <button
            onClick={handleSaveOrder}
            disabled={items.length === 0}
            className={`w-full mt-6 p-2 rounded-lg text-white font-semibold ${items.length === 0 ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
          >
            Save Order and Hash
          </button>

          {orderSaved && <p className="text-green-600 font-semibold mt-4 text-center">Order has been saved successfully!</p>}
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
