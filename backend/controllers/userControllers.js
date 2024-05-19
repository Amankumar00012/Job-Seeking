import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js";
import { User } from "../model/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";


export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body;
    if (!name || !email || !phone || !role || !password) {
        return next(new ErrorHandler("ples fill regstration form"));

    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler(" Email already exists!"));
    }
    const user = await User.create({
        name,
        email,
        phone,
        role,
        password
    });
   
    sendToken(user, 201, res, "User Registered Successfully");
});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return next(new ErrorHandler("please provide email ,password and role", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("invalide email ,password and role", 400));
    }
    const isPasswordMatched =  await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalide Email or Password", 400));
    }
    if (user.role !== role) {
       new ErrorHandler("user with this role not found", 400);
    }
    sendToken(user, 201, res, "user logged in successfully");
});
export const logout = catchAsyncError(async(req,res,next)=>{
    res.status(201).cookie("token","", {
        httpOnly:true,
        expires:new Date(Date.now()),
    })
    .json({
        success :true,
        message : "Logged Out Successfully",
    });

})