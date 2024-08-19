import {ethers, Signer, providers, ContractInterface } from "ethers";
import Web3Modal from "web3modal"
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
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
  index:Number
}


const localProvider = new ethers.providers.JsonRpcProvider(
  "http://localhost:8545"
);

export const getProvider = () => {
  return localProvider;
};

export const getSigner = (index = 0) => {
  const provider = getProvider();
  const signer = provider.getSigner(index);
  return signer;
};

export const getContract = (address:string, abi:any, signerIndex:number) => {
  const signer = getSigner(signerIndex);
  const contract = new ethers.Contract(address, abi, signer);
  return contract;
};


  const createShipment = async (items:Shipment) => {
    let {receiver,pickupTime,price,distance,orderInfo}=items;
    if (isNaN(price) || isNaN(distance)) {
      console.error("Invalid price, distance, or pickupTime:", { price, distance, pickupTime });
      return;
    }
     try{
      const web3Modal=new Web3Modal();
      const connection=await web3Modal.connect();
      const provider= new ethers.providers.Web3Provider(connection);
      const address=provider.getSigner().getAddress();
      const contract=getContract(contractAddress,ABI.abi,0);
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
      );
      const tx=await createItem.wait(); // this line waits for the transaction to be confirmed
      console.log(tx);
      console.log(createItem);
    }catch(err){
      console.log(err);
    }
 };
 const getAllShipments = async () => {
  try {
    const contract=getContract(contractAddress,ABI.abi,0);
    console.log(contract)
    console.log("Fetching shipments...");
    const shipments = await contract.getAllTransactions();
    console.log("Shipments fetched:", shipments);
    
    // Format shipments
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
    const signer=getSigner();
    const address=signer.getAddress();
      const shipmentCount=await contract.getShipmentCount(address);
      return Number(shipmentCount);
  }catch(err){
    console.log(err);
  }
 }
 
 const completeShipment=async (completeShipment:completeShipmentData)=>{
  const {receiver,index}=completeShipment;
  try{ 
    const contract=getContract(contractAddress,ABI.abi,0);
    const signer=getSigner();
    const address=signer.getAddress();
    const transaction=await contract.completeShipment(receiver,address,index,{
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
    const contract=getContract(contractAddress,ABI.abi,0);
    const signer=getSigner();
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
    receiver:string
  }
 const startShipment=async (getProduct:startShipment)=>{
  const {receiver,index}=getProduct;
  try{
    const contract=getContract(contractAddress,ABI.abi,0);
    const signer=getSigner();
    const address=signer.getAddress();
    const shipment=await contract.startShipment(receiver,index,address);
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