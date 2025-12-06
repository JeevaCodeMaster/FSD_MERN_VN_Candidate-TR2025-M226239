const mongoose = require("mongoose");

const connectDB = () => {
  try {
     mongoose.connect(process.env.MONGO_URI)
     .then(()=>{
        console.log("connected to db");
     })
     .catch((error)=>{
        console.log("connected error :",error.message);
     })
      
  } catch (error) {
    throw Error("connection error");
     process.exit(1);
  }
};


module.exports = connectDB;
