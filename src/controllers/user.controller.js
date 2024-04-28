import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req,res)=>{
    //get user details from frontend
    //validation - not empty
    //check if user already exist:username/email
    //check for images,check for avatar
    //create user object - > creation call for entry in db
    //remove password and refresh token feild from response
    //check for user creation 
    //return response else error

    const {fullname,email,username,password}=req.body
    console.log("email: ",email)
})


export {registerUser}