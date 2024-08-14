import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import { stat } from "fs";

type userAddress={
  address:string
};
const initialState={
    address:""
} as userAddress;

const userSlice=createSlice({
        name:"userAddress",
        initialState,
        reducers:{
            // A logout function can also be added
            setActiveUser(state:userAddress,action:PayloadAction<string>){
                state.address=action.payload;
            }
        }
    
})
export const {setActiveUser}=userSlice.actions;
export default userSlice.reducer