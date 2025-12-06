const usermodel =require("../models/Users");

const getusers =async(req,res)=>{
    try {
        allUser =await usermodel.find();
        if(!allUser){
           return res.status(400).json({msg:"no user found"});
            
        }
       return res.status(200).json({msg:"list of users",allUser});
    } catch (error) {
       return res.status(500).json({msg:error.message})
        
    }
}

const getuser =async(req,res)=>{
    const id =req.params.id;
    try {
        User =await usermodel.findOne({_id:id});
        if(!User){
           return res.status(400).json({msg:"no user found"});
            
        }
       return res.status(200).json({msg:"user",User});
    } catch (error) {
       return res.status(500).json({msg:error.message})
        
    }
}



const deleteUser =async(req,res)=>{
    const id =req.params.id;
   
    try {
        const findUser =await usermodel.findOne({_id:id});
        
        if(findUser) {
            const result= await usermodel.deleteOne({_id:id})
           return res.status(200).json({msg:"successfully deleted!"});
            
        }
       return res.status(400).json({msg:"try again"});
    } catch (error) {
       return res.status(500).json({Error:error.message})
    }
}

const userController ={getuser,getusers,deleteUser};
module.exports=userController