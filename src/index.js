import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server Running At: ${process.env.PORT}`);
    })
    app.on("error",(error)=>{
        console.log("ERROR FOR AN EVENT",error);
        throw error
    })
})
.catch((err)=>{
    console.log("MongoDB Connection failed!!",err);
})
