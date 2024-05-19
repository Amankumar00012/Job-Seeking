import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
title:{
    type:String,
    required:[true,"please provide job title"],
    minLength:[3,"job must contain at least 3 charestesr"],
    maxLength:[50,"job title must contain 40 charecter"]
},
desceription:{
    type:String,
    required:[true,"Please provide job desceription"],
    minLength:[3,"job must contain at least 3 charestesr"],
    maxLength:[50,"job title must contain 40 charecter"]   
},
category: {
    type: String,
    required: [true, "Please provide a category."],
  },
country:{
    type:String,
    required:[true,"Please provide country name"]
},
city:{
    type:String,
    required:[true,"Please provide city name"]
},
loaction:{
    type:String,
    required:[true,"Please provide loaction "]
},
fixedSalary:{
    type:String,
    maxLength:[6,"fixed salary maximum 6 digit"],
    minLength:[4,"fixed salary must contain 4 digits"]
},
salaryFrom:{
    type:String,
    maxLength:[6,"salaryfrom maximum 6 digit"],
    minLength:[4,"salaryfrom must contain 4 digits"]
},
salaryTo:{
    type:String,
    maxLength:[6,"salaryto maximum 6 digit"],
    minLength:[4,"salaryto must contain 4 digits"]
},
expried:{
    type:Boolean,
    default:false,
},
jobPostedOn:{
    type:Date,
   default:Date.now(),
},
postedBy:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
},

});
export const Job = mongoose.model("job",jobSchema);