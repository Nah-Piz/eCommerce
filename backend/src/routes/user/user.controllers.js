import { comparePasswords, hashPassword } from "../../utils/hashPasswords.js";
import { Users } from "../../database/users.schemas.js";
import { generateWebToken } from "../../utils/generateWebTokens.js";

export const createUser = async (req,res) => {
    const { body } = req;

    body.password = hashPassword(body.password)

    try {
        const newUser = new Users(body);
        const savedUser = await newUser.save();
        generateWebToken(res,savedUser._id)
        res.status(201).json({success:true,msg:"User successfully added..."})
    } catch (error) {
        res.status(500).json({success:false,msg:error.message})
    }
}

export const loginUser = async (req,res) => {
    const { body } = req;
    try {
        const foundUser = await Users.findOne({ email: body.email });
        if (!foundUser) return res.status(400).json({ success: false, msg: "Invalid email..." });
        if (!comparePasswords(body.password, foundUser.password)) return res.status(400).json({ success: false, msg: "Invalid password..." }); 
        generateWebToken(res, foundUser._id);
        res.status(200).json({ success: true, msg: "User logged in successfully" });
    } catch (error) {
        res.status(500).json({success:false,msg:error.msg})
    }
}

export const userStatus = async (req,res) => {
    res.sendStatus(200)
}

export const logoutUser = async (req,res) => {
    res.clearCookie("token");
    res.sendStatus(200)
}