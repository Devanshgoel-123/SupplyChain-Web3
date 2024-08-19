import { useState } from "react";
import { startShipment } from "@/Functions/functions";
interface getProuductState{
    receiver:string,
    index:number
}
interface getShippingProps{
    onClose:()=>void
}

export default function StartShipmentComp({onClose}:getShippingProps){
    const [getProduct,setGetProduct]=useState<getProuductState>({
        receiver:"",
        index:0
    })
   const startShipping=()=>{
    startShipment(getProduct);
   };
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
          <h4 className="text-lg font-medium text-gray-800">
           Start the Shipping
          </h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative mt-3">
              <input
                type="text"
                placeholder="Receiver"
                className="w-full pl-5 pr-3 py-2 text-gray-500 outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setGetProduct({
                    ...getProduct,
                    receiver:e.target.value
                })}
              />
            </div>
            <div className="relative mt-3">
              <input
                type="number"
                placeholder="Index"
                className="w-full pl-5 pr-3 py-2 text-gray-500 outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setGetProduct({
                    ...getProduct,
                    index:Number(e.target.value)
                })}
              />
            </div>
            <button
              onClick={() => startShipping()}
              className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
            >
              Start the Shipment
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
   )
}