import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "pls provide name"],
        minLength: [3, "name must contain atleast 3 charester"],
        maxLength: [32, "name must contain maximum atleast 32 charester"],
    },
    email: {
        type: String,
        required: [true, "pls Provide email"],
        validate: [validator.isEmail, "pls provide valide Email"]
    },
    phone: {
        type: Number,
        required: [true, "pls Provide phone number"],
    },
    password: {
        type: String,
        required: [true, "please Provide Password"],
        minLength: [8, "Password must contain atleast 8 charester"],
        maxLength: [20, "Password must contain maximum atleast 32 charester"],
        select : false,
    },
    role: {
        type: String,
        required: [true, "please Provide your role"],
        enum: ["job Seeker", "Employer"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//hashing password


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
   
});

//comparing password

userSchema.methods.comparePassword = async function (EnteredPassword) {
    return await bcrypt.compare(EnteredPassword, this.password);
}

//generating a jwt token for authorization
userSchema.methods.getJWTToken = function () {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}
export const User = mongoose.model("User", userSchema);