import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode"





const getInitialState =()=>{
    const token=localStorage.getItem("token") ||null;
    let role=null;
   let  BASE_URL="http://localhost:8090"
    let userId=null
  

    if(token){
        try {
           const decode =jwtDecode(token);
            role=decode.role;
            userId=decode.id;

            
        } catch (error) {
            console.log("Invalid token ",error)
            
        }
    }
    return {
        token:token ||null,
        role:role,
        userId:userId

    }

}


const authSlice =createSlice({
    name:"auth",
    initialState:getInitialState(),
    reducers: {
    login: (state, action) => {
      const token = action.payload;
  
      state.token = token;

      try {
        const decoded = jwtDecode(token);
        state.role = decoded.role;
        state.userId=decoded.id;
        state.BASE_URL="http://localhost:8090"
      } catch (err) {
        console.error("Token decode failed:", err);
      }

      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.clear();
    },
  },
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;