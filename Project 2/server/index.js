require("dotenv").config();
const express =require("express");
const connectDB =require("./config/connectDB");
const cors =require("cors");
const cookieParser = require("cookie-parser");
const authRoutes=require("./Routes/authRoute");
const userRoutes=require("./Routes/userRoute");
const docRoutes=require("./Routes/doctrRoutes");


const appRoutes =require("./Routes/appointmentRoute");






//express app
const app =express();

//middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173' 
}));
app.use(cookieParser());


//routing
app.use("/auth",authRoutes);
app.use("/user",userRoutes);
app.use("/doctor",docRoutes);
app.use("/appointment",appRoutes);


//db connect 
connectDB();



//server port
app.listen(process.env.PORT ||8090 ,()=>{
    console.log(`http://localhost:8090`);
})

