import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import cloudnary from "cloudinary";
import { Application } from "../model/applicationSchema.js";


export const employergetAllApplication = catchAsyncError(async(req,res,next)=>{
    const { role } = req.user;
    if (role === "job Seeker") {
        return next(
            new ErrorHandler(
                "job seeker is not allowed to access this resourse", 500
            )
        );

    }
    const {_id} = req.user;
    const application = await Application.find({' emloyerID':_id});
    res.status(200).json({
        success:true,
        applications
    });
})

export const jobSeekerGetAllApplication = catchAsyncError(async(req,res,next)=>{
    const { role } = req.user;
    if (role === "Employer") {
        return next(
            new ErrorHandler(
                "job seeker is not allowed to access this resourse", 500
            )
        );

    }
    const {id} = req.user;
    const application = await Application.find({'applicantID.user':_id});
    res.status(200).json({
        success:true,
        applications
    });
});
export const  jobSeekerDeleteApplication = catchAsyncError(async(req,res,next)=>{
    const { role } = req.user;
    if (role === "Employer") {
        return next(
            new ErrorHandler(
                "job seeker is not allowed to access this resourse", 500
            )
        );

    }
    const {id} = req.params;
    const applications = await Application.findById(id);
    if(!applications){
        return next( new ErrorHandler("Oops application not found",400))
    }
    await applications.deleteOne();
    res.status(200).json({
        success:true,
        message:"Application delete Successfully"
    });
});
export const postApplication = catchAsyncError(async(req,res,next)=>{
    if (role === "Employer") {
        return next(
            new ErrorHandler(
                "job seeker is not allowed to access this resourse", 400
            )
        );

    }
    if(!req.files||Object.keys(req.files).length===0){
        return next (new ErrorHandler("resume file required",400))
    }
    const {resume}= req.files;
    const allowedFormate = ["image/png","image/jpg","image/webp"];
    if(!allowedFormate.includes(resume.mimetype)){
        return next(ErrorHandler("Invalide file type.Please uploade a jpg ,png or webp",400))
    }
    const cloudnaryResponse=await cloudnary.uploader.upload(
        resume.TempFilePath
    );
    if(!cloudnaryResponse|| cloudnaryResponse.error){
        console.error("cloudnary Error",cloudnaryResponse.error||"unknown cloudinary Error")
        return next (new ErrorHandler("Failed to upload resume",500))
    }
    const{
        name,
        email,
        coverLetter,
        phone,
        address,
        jobId
    }=req.body;
    const applicantID = {
        user:req.user._id,
        role:"Job Seeker"
    };
    if(!jobId){
        return next(new ErrorHandler("Job not found",400))
    }
    const  jobDetails = await jobId.findById(jobId);
    if (!jobDetails){
        return next(new ErrorHandler("job not found,400"))
    }
    const employerID={
        user:jobDetails.postedBy,
        role:"Employer"
    };
    if(!name|| !email || !coverLetter || !phone || !address || !applicantID || !resume){
        return next(ErrorHandler("Please fill all field" ,400))
    }
    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume:{
            public_id:cloudnaryResponse.public_id,
            url:cloudnaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success:true,
        message:"Application Submited !",
        Application,
    });


    
})
