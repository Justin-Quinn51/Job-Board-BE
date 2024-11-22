import asyncHandler from "express-async-handler";
import { Router } from "express";
import {
  getJobs,
  getJob,
  createJob,
  updateJobDetails,
  closeJobById,
  deleteJobById,
} from "../controllers/jobsController.ts";

const router = Router();

router.get("/", asyncHandler(getJobs));
router.post("/", asyncHandler(createJob));
router.get("/:id", asyncHandler(getJob));
router.put("/:id/update", asyncHandler(updateJobDetails));
router.put("/:id/close", asyncHandler(closeJobById));
router.delete("/:id", asyncHandler(deleteJobById));

export default router;
