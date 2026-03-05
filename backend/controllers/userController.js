import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//login user

const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

            if (!isMatch) {
                return res.json({success:false,message:"Invalid credentials"})
            }

            const token = createToken(user._id);
            res.json({success:true,token})

    } catch (error) {
       console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user

const registerUser = async (req,res) => {
    const {fullName,password,email} = req.body;
    try {

        // checking if user is already exist
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false,message:"User already exist"})
        } 

        // validating email format and password

        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if (password.length<8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }


        // hashing user password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            fullName:fullName,
            email:email,
            password:hashedPassword
        })

         const user = await newUser.save()
         const token = createToken(user._id)
         res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


// get user profile
const getProfile = async (req,res) => {
    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({success:false,message:"User not found"})
        }
        res.json({success:true,userData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// update user profile
const updateProfile = async (req,res) => {
    try {
        const {userId, fullName, address, phone} = req.body;
        
        await userModel.findByIdAndUpdate(userId, {
            fullName,
            address,
            phone
        });
        
        res.json({success:true,message:"Profile Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser,getProfile,updateProfile}
