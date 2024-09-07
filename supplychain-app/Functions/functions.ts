import {ethers, Signer, providers, ContractInterface } from "ethers";
const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
import ABI from "../../backend/artifacts/contracts/Tracking.sol/Tracking.json"
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

interface completeShipmentData{
  receiver:string,
  index:Number,
  sender:String
}
import { MetaMaskInpageProvider } from "@metamask/providers";

declare var window:any


// const localProvider = new ethers.providers.JsonRpcProvider(
//   "http://localhost:8545"
// );

// export const getProvider = () => {
//   return localProvider;
// };

// export const getSigner = (index:number) => {
//   const provider = getProvider();
//   const signer = provider.getSigner(index);
//   return signer;
// };

export const getContract = (address:string, abi:any, signerIndex:number) => {
  const signer = getSigner(signerIndex);
  const contract = new ethers.Contract(address, abi, signer);
  return contract;
};

export const fetchProvider=()=>{
  const provider=new ethers.providers.Web3Provider(window.ethereum);
  return provider;
};

export const getSigner=(index:number)=>{
  const provider=fetchProvider();
  const signer=provider.getSigner(index);
  return signer;
}
    const createShipment = async (items: Shipment) => {
      try {
      await window.ethereum.request({method:"eth_requestAccounts"});
      const signer=getSigner(0);
      const contract=getContract(contractAddress,ABI.abi,0);
    
        let { sender, pickupTime, price, distance, orderInfo } = items;
        const nonce = await signer.getTransactionCount('latest');
        const createItem = await contract.createShipment(
          sender,
          pickupTime,
          ethers.utils.parseUnits(String(price), 18),
          distance,
          orderInfo,
          {
            value: ethers.utils.parseUnits(String(price), 18),
            nonce:nonce,
          }
        );
    
        const tx = await createItem.wait();
        console.log(tx);
      } catch (err) {
        console.error("Error creating shipment:", err);
      }
    };
    
 const getAllShipments = async () => {
  try {
    const contract=getContract(contractAddress,ABI.abi,0);
    console.log("Fetching shipments...");
    const shipments = await contract.getAllTransactions();
    console.log("Shipments fetched:", shipments);
    const allShipments = shipments.map((shipment: any) => ({
      sender: shipment.sender,
      receiver: shipment.receiver,
      price: ethers.utils.formatEther(shipment.price.toString()),
      pickUpTime: (shipment.pickupTime),
      deliveryTime: (shipment.deliveryTime),
      distance: (shipment.distance),
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
    const contract=getContract(contractAddress,ABI.abi,0);
    const signer=getSigner(0);
    const address=signer.getAddress();
      const shipmentCount=await contract.getShipmentsCount(address);
      console.log(shipmentCount)
      return Number(shipmentCount);
  }catch(err){
    console.log(err);
  }
 }
 
 const completeShipment=async (completeShipment:completeShipmentData)=>{
  const {receiver,index,sender}=completeShipment;
  try{ 
    const contract=getContract(contractAddress,ABI.abi,0);
    const signer=getSigner(0);
    const transaction=await contract.completeShipment(receiver,sender,index,{
      gasLimit:300000
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
    const contract=getContract(contractAddress,ABI.abi,0);
    const signer=getSigner(0);
    const address=signer.getAddress();
    const shipment=await contract.getShipment(address,int_Index);
    const singleShipment={
      sender:shipment[0],
      receiver:shipment[1],
      pickupTime:shipment[2],
      deliveryTime:(shipment[3]),
      distance:Number(shipment[4]),
      price:Number(ethers.utils.formatEther(shipment[5].toString())),
      status:shipment[6],
      isPaid:shipment[7],
      orderInfo:shipment[8]
    }
    return singleShipment;
  }catch(err){
    console.log(err);
  }
 }

  type startShipment={
    index:number,
    receiver:string,
    sender:string
  }
 const startShipment=async (getProduct:startShipment)=>{
  const {receiver,index,sender}=getProduct;
  console.log(receiver)
  try{
    const contract=getContract(contractAddress,ABI.abi,0);
    const signer=await getSigner(0);
    const address=await signer.getAddress();
    console.log(address);
    const shipment=await contract.startShipment(receiver,index,sender);
    shipment.wait();
    console.log(shipment);
  }catch(err){
     console.log("Sorry no Shipment",err);
  }
 }
 const connectWallet = async () => {
  try {
     const provider=fetchProvider();
     await provider.send('eth_requestAccounts',[]);
     const signer=getSigner(0);
    const sender = await signer.getAddress();
    const senderBalance = await signer.getBalance();
    console.log(senderBalance);
    return { provider, signer, sender, senderBalance };
  } catch (error) {
    console.error("Wallet connection failed:", error);
  }
};



//
  export {
    connectWallet,
    getAllShipments,
    getShipment,
    getShipmentsCount,
    completeShipment,
    startShipment,
    createShipment
 }