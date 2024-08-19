"use client"
import { FC, useEffect,useState } from "react";
import { BigNumber } from "ethers";
import {connectWallet} from "../Functions/functions"
import { setActiveUser } from "@/redux/features/activeUserSlice";
import { useAppDispatch } from "@/redux/hooks";
type linkelement={
    title:string,
    path:string
}

type userAddress={
    address:string,
    balance:string
  };
export default function Navbar(){
     const [currentUser,setCurrentUser]=useState<string>("");
     const [balance,setBalance]=useState<string>("");
     const dispatch=useAppDispatch();
     const navigationTypes=[
        {title:"Home",path:"#"},
        {title:"Services",path:"#"},
        {title:"Contact Us",path:"#"},
        {title:"ERC-20",path:"#"}
     ];
    const handleConnect=async ()=>{
        const user=await connectWallet();
        if(typeof user!=="undefined"){
            const userAddress = user.sender;
            const userBalance = user.senderBalance.toString();
            setCurrentUser(userAddress);
            setBalance(userBalance);
            const activeUserObject = {
              address: userAddress,
              balance: userBalance,
            };
            dispatch(setActiveUser(activeUserObject));
        }
        
        
    }
    
    return (
<nav className="bg-white pb-5 md:text-sm">
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-5 md:block">
                    <a>
                       <img src="../images/images.png" width={120} height={50} alt="Logo Image" /> 
                    </a>
                    <div className="md:hidden">
                        <button className="menu-btn text-gray-500 hover:text-gray-800">
                            navButton
                        </button>
                    </div>
                </div>
                <div className="flex-1 items-center mt-8 md:mt-0 md:flex block">
                    <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigationTypes.map((item:linkelement,index:number)=>{
                                return(
                                    <li key={index} className="text-gray-700 hover:text-gray-900"><a href={item.path} className="block">{item.title}</a></li>
                                )
                            })}
                    </ul>
                    <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                        {currentUser ?(
                            <p className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                                {currentUser.slice(0,25)}...
                            </p>
                        ): 
                        (
                            <button  onClick={handleConnect} className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-900 rounded-full d:inline-flex ">
                                Connect Wallet
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )}
        

