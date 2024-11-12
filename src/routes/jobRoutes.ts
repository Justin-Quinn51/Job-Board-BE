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

router.get("/", getJobs);
router.post("/", createJob);
router.get("/:id", getJob);
router.put("/:id", updateJobDetails);
router.put("/:id", closeJobById);
router.delete("/:id", deleteJobById);

export default router;
