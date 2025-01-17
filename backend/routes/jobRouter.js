import express from "express";
import {getAllJobs, getmyJobs, postJob, updateJob,deleteJob}from "../controllers/jobControllers.js";
import {isAuthorized}from "../middlewares/auth.js";
const router = express.Router();


router.get("/getall",getAllJobs);
router.post("/post", isAuthorized ,postJob );
router.get("/getmyjobs", isAuthorized ,getmyJobs);
router.put("/update/:id", isAuthorized ,updateJob);
router.delete("/delete/:id", isAuthorized ,deleteJob);

export default router; 