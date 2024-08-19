import {createSlice,PayloadAction} from "@reduxjs/toolkit";

type userAddress={
  address:string,
  balance:string
};
const initialState={
    address:"",
    balance:""
} as userAddress;

const userSlice=createSlice({
        name:"userAddress",
        initialState,
        reducers:{
            // A logout function can also be added
            setActiveUser(state:userAddress,action:PayloadAction<userAddress>){
                state.address=action.payload.address;
                state.balance=action.payload.balance
            }
        }
    
})
export const {setActiveUser}=userSlice.actions;
export default userSlice.reducer