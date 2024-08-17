import {ethers, Signer, providers } from "ethers";

import {abi}  from "./Tracking.json";
import Web3Modal from 'web3modal';
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

type signerOrProvider = Signer | providers.Provider;

enum ShipmentStatus {
    Pending,
    In_Transit,
    Completed
}

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

interface completeShipmentData{
  sender:string,
  receiver:string,
  index:Number
}
const fetchContract = (provider: ethers.Signer | ethers.providers.Provider) => {
  return new ethers.Contract(contractAddress, abi, provider);
};



  const createShipment = async (items:Shipment) => {
    console.log(items);
    let {receiver,pickupTime,price,distance,orderInfo}=items;
    if (isNaN(price) || isNaN(distance) || isNaN(pickupTime)) {
      console.error("Invalid price, distance, or pickupTime:", { price, distance, pickupTime });
      return;
    }
     try{
      const web3Modal=new Web3Modal();
      const connection=await web3Modal.connect();
      const provider= new ethers.providers.Web3Provider(connection);
      const signer=provider.getSigner();
      const contract=fetchContract(signer);
      console.log(contract)
      const createItem = await contract.createShipment(
        receiver,
        pickupTime,
        ethers.utils.parseUnits(String(price),18),
        distance,
        orderInfo,
        {
          value:ethers.utils.parseUnits(String(price),18)
        }
      )
      await createItem.wait(); // this line waits for the transaction to be confirmed
      console.log(createItem);
    }catch(err){
      console.log(err);
    }
 };
 const getAllShipments = async () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const contract = fetchContract(provider);

    console.log("Fetching shipments...");
    const shipments = await contract.getAllTransactions();
    console.log("Shipments fetched:", shipments);
    
    // Format shipments
    const allShipments = shipments.map((shipment: any) => ({
      sender: shipment.sender,
      receiver: shipment.receiver,
      price: ethers.utils.formatEther(shipment.price.toString()),
      pickUpTime: Number(shipment.pickupTime),
      deliveryTime: Number(shipment.deliveryTime),
      distance: Number(shipment.distance),
      isPaid: shipment.isPaid,
      status: shipment.status,
      orderInfo: shipment.orderInfo
    }));

    return allShipments;
  } catch (err) {
    console.error("Error fetching all shipments:", err);
  }
};


 const getShipmentsCount=async ()=>{
  try{
      const web3Modal=new Web3Modal();
      const connection=await web3Modal.connect();
      const provider= new ethers.providers.Web3Provider(connection);
      const signer=provider.getSigner();
      const address=signer.getAddress();
      const rpcProvider=new ethers.providers.JsonRpcProvider();
      const contract=fetchContract(rpcProvider);
      const shipmentCount=await contract.getShipmentCount(address);
      return Number(shipmentCount);
  }catch(err){
    console.log(err);
  }
 }
 
 const completeShipment=async (completeShipment:completeShipmentData)=>{
  const {receiver,sender,index}=completeShipment;
  try{
    const web3Modal=new Web3Modal();
    const connection=await web3Modal.connect();
    const provider= new ethers.providers.Web3Provider(connection);
    const signer=provider.getSigner();
    const senderAddress=signer.getAddress();
    const contract=fetchContract(signer);
    const transaction=await contract.completeShipment(receiver,senderAddress,index,{
      gasLimit:30000
    });
    transaction.wait();
    console.log(transaction);
  }catch(err){
    console.log(err);
  };
 }

 const getShipment=async(index:number)=>{
  const int_Index=index;
  try{
    const web3Modal=new Web3Modal();
    const connection=await web3Modal.connect();
    const provider= new ethers.providers.Web3Provider(connection);
    const contract=fetchContract(provider);
    const address=provider.getSigner().getAddress();
    const shipment=await contract.getShipment(address,int_Index);
    const singleShipment={
      sender:shipment[0],
      receiver:shipment[1],
      pickupTime:Number(shipment[2]),
      deliveryTime:Number(shipment[3]),
      distance:Number(shipment[4]),
      price:ethers.utils.formatEther(shipment[5].toString()),
      status:shipment[6],
      isPaid:shipment[7],
    }
    return singleShipment;
  }catch(err){
    console.log(err);
  }
 }

  type startShipment={
    index:number,
    receiver:string
  }
 const startShipment=async (getProduct:startShipment)=>{
  const {receiver,index}=getProduct;
  try{
    const web3Modal=new Web3Modal();
    const connection=await web3Modal.connect();
    const provider= new ethers.providers.Web3Provider(connection);
    const contract=fetchContract(provider);
    const sender=provider.getSigner().getAddress();
    const shipment=await contract.startShipment(receiver,index,sender);
    shipment.wait();
    console.log(shipment);
  }catch(err){
     console.log("Sorry no Shipment",err);
  }
 }

 const connectWallet=async()=>{
  try{
    const web3Modal=new Web3Modal();
    const connection=await web3Modal.connect();
    const provider= new ethers.providers.Web3Provider(connection);
    const sender=await provider.getSigner().getAddress();
    console.log(sender)
  }catch(error){
    console.log(error);
  }

 }




 export {
    fetchContract,
    connectWallet,
    getAllShipments,
    getShipment,
    getShipmentsCount,
    completeShipment,
    startShipment,
    createShipment
 }