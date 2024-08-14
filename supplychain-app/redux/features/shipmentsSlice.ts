import {createSlice,PayloadAction} from "@reduxjs/toolkit";


interface Shipment {
        sender: string;
        receiver: string;
        pickupTime:Number;
        deliveryTime:Number;
        distance: Number;
        price: Number;
        status: ShipmentStatus;
        isPaid: boolean;
}
enum ShipmentStatus {
    Pending,
    In_Transit,
    Completed
}

const initialState:Shipment[]=[];

const shipmentSlice=createSlice({
    name:"UserShipments",
    initialState,
    reducers:{
        addShipment(state:Shipment[],action:PayloadAction<Shipment>){
            state.push(action.payload);
        },
        upDateShipmentStatus(state:Shipment[],action:PayloadAction<{status:Shipment["status"],index:number}>){
            const {index,status}=action.payload;
            if(index>=0 && index<state.length){
                state[index].status=status;
            }
        }
    }
})

export const{
    addShipment,
    upDateShipmentStatus
}=shipmentSlice.actions;
export default shipmentSlice.reducer;