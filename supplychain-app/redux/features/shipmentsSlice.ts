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
        fetchShipments(state:Shipment[],action:PayloadAction<Shipment[]>){
            state=action.payload;
        }
    }
})

export const{
    
}=shipmentSlice.actions;
export default shipmentSlice.reducer;