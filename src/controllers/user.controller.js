import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from "..utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

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
    console.log("email: ",email);

    if(
        [fullname,email,password,username].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All Fields Are Required")
    }

    User.findOne({
        $or:[{ username },{ email }]
    })

    if(existedUser){
        throw new ApiError(409,"User With Email or Username Already Exists")
    }


    const avatarLocalPath = req.files?.avatar[0]?.path;

    const coverImageLocalPath= req.files?.coverImage[0]?.path;


    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar File Is Required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar File Is Required")
    }

    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage: coverImage?.url||"",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something Went Wrong While Registering The User")
    }


    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Successfully")
    )

})


export {registerUser}