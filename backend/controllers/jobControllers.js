import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../model/jobSchema.js";
import { isAuthorized } from "../middlewares/auth.js"

export const getAllJobs = catchAsyncError(async (req, res, next) => {
    const jobs = await Job.find({ expired: false });
    res.status(200).json({
        success: true,
        jobs,
    });

});
export const postJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "job Seeker") {
        return next(
            new ErrorHandler(
                "job seeker is not allowed to access this resourse", 400
            )
        );
    }
    const {
        title,
        desceription,
        category,
        country,
        city,
        loaction,
        fixedSalary,
        salaryFrom,
        salaryTo,
    } = req.body;
    if (!title || !desceription || !category || !country || !city || !loaction) {
        return next(new ErrorHandler("plese provide full job details", 400));

    }
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(new ErrorHandler("Please eathir provide fixed salary or ranged salary", 400)
        );
    }
    if (salaryFrom && salaryTo && fixedSalary) {
        return next(new ErrorHandler("Amount enter fixed salary togather", 400))
    }
    const postedBy = req.user._id;
    const job = await Job.create({
        title,
        desceription,
        category,
        country,
        city,
        loaction,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy

    })
    res.status(200).json({
        success: true,
        message: "job posted Successfully",
        job
    });
});
export const getmyJobs = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "job Seeker") {
        return next(
            new ErrorHandler(
                "job seeker is not allowed to access this resourse", 500
            )
        );

    }
    const myjobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json({
        success: true,
        myjobs,
    });

    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("job not found", 400));
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        job, message: "job update Successfully",
    });
});
export const updateJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "job Seeker") {
        return next(
            new ErrorHandler(
                "job seeker is not allowed to access this resourse", 500
            )
        );

    }
    const{ id} = req.params;
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler, "Job not found  ", 400
    )
    }
    job = await Job.findByIdAndUpdate(id,req.body,{
     new:true,
     runValidators:true,
     useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        job,
        message:"job update Successfullly"
    });

});

export const deleteJob = catchAsyncError(async(req ,res,next)=>{
    const { role } = req.user;
    if (role === "job Seeker") {
        return next(
            new ErrorHandler(
                "job seeker is not allowed to access this resourse", 500
            )
        );

    }
    const{id} = req.params;
    let job = await findById(id);
    if(!job){
        return next (new ErrorHandler("Opps job not fund",400));
    }
    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:"job successfully deleted"
    });
});

