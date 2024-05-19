import express from "express";
import { jobSeekerDeleteApplication,
    employergetAllApplication,
    jobSeekerGetAllApplication,
    postApplication} from "../controllers/applicatioControler.js";
import {isAuthorized} from "../middlewares/auth.js"
const router = express.Router();

 router.get("/jobseeker/getall",isAuthorized,jobSeekerGetAllApplication);
 router.get("/employer/getall",isAuthorized,employergetAllApplication);
 router.delete("/delete/:id",isAuthorized ,jobSeekerDeleteApplication);
 router.post("/post",isAuthorized ,postApplication);

export default router; 