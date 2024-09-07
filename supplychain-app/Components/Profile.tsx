"use client"
import { useEffect, useState } from "react";
import { getShipmentsCount } from "@/Functions/functions";
import { useAppSelector } from "@/redux/hooks";

interface getUserProfileProps{
    onClose:()=>void
}
export default function userProfile({onClose}:getUserProfileProps){
    const userAddress=useAppSelector(state=>state.userSlice.address)
    const userBalance=useAppSelector(state=>state.userSlice.balance)
    const [count,setCount]=useState<number>(0);
    useEffect(()=>{
        const getShipmentsData=getShipmentsCount();
       const getData=async()=>{
        const allData=await getShipmentsData;
        if (typeof allData === 'number') {
            setCount(allData); 
        }
       }
       getData();
    },[]);
    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div> 
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div className="relative w-full max-w-lg p-6 mx-auto bg-white rounded-md shadow-lg">
        <div className="flex justify-end">
          <button onClick={onClose} className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
            Close
          </button>
        </div>
        <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <div className="flex flex-col items-center pb-10">
            <img src="./images/ProfilePic.jpeg" className="w-24 h-24 mb-3 rounded-full shadow-lg"></img>
          <h5 className="font-medium text-gray-800 mb-1 text-xl ">
           Welcome User
          </h5>
          <span className="text-sm text-black dark:text-gray-400">{userAddress}</span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black rounded-lg border-2">Balance : {(Number(userBalance)/10e17).toString().slice(0,6)}  ETH
            </a>
            <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black rounded-lg border-2">
                Total Shipment:{count}
            </a>
       </div> 
            </div>
                 
        </div>
      </div>
    </div>
  </div>
   )
}