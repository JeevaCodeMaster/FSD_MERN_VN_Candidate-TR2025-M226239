import {configureStore} from "@reduxjs/toolkit"

import authReducer from "../redux/authSlice"
const Store=configureStore({
    reducer:{
        auth:authReducer
    }
})

export default Store;