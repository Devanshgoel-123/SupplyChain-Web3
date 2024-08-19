"use client";
import  GetShipment  from "./GetShipment";
import StartShipmentComp from "./StartShipment";
import CompleteShipmentComp from "./CompleteShipment";
import UserProfile from "./Profile";
import { useState } from "react";
type ServiceItem = {
  name: string;
};

const ServiceCard = () => {
  const [activeComponent,setActiveComponent]=useState<string|null>(null);
  const team: ServiceItem[] = [
    { name: "Comp Shipment" },
    { name: "Get Shipment" },
    { name: "Start Shipment" },
    { name: "User Profile" },
    { name: "Ship Count" },
    { name: "Send" },
  ];
  
  const handleClose=()=>{
    setActiveComponent(null)
  }
  const handleClick=(name:string)=>{
     setActiveComponent(name);
  }
  return (
    <>
    {activeComponent === "Get Shipment" && (
        <GetShipment onClose={handleClose} />
      )}
    {activeComponent === "Start Shipment" && (
        <StartShipmentComp onClose={handleClose} />
      )}
      {activeComponent === "Comp Shipment" && (
        <CompleteShipmentComp onClose={handleClose} />
      )}
      {activeComponent==="User Profile" && (<UserProfile onClose={handleClose}/>)}
      <section className="py-0 pb-14">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="mt-12">
            <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {team.map((item: ServiceItem) => (
                <li key={item.name} onClick={()=>{handleClick(item.name)}} className="bg-slate-950 rounded-xl ">
                  <div className="w-full h-60 flex sm:h-52 md:h-56">
                    <button  className="rounded-xl text-white text- top-3 text-5xl m-auto outline-none p-5 border-none hover:text-gray-300 w-[80%] md:text-4xl">
                      {item.name.toUpperCase()}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceCard;
