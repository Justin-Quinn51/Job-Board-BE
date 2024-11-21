import { type Request, type Response } from "express";
import {
  getAllJobs,
  getJobById,
  createNewJob,
  updateJob,
  closeJob,
  deleteJob,
} from "../models/jobsModel.ts";

async function getJobs(req: Request, res: Response) {
  try {
    const jobs = await getAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to retrieve jobs." });
  }
}

async function getJob(req: Request, res: Response) {
  const jobId = req.params.id;

  if (!jobId) {
    res.status(400).json({ error: "jobId is required" });
    return;
  }

  try {
    const job = await getJobById(jobId);
    if (!job) {
      res.status(404).json({ error: "Job not found." });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Failed to retrieve job." });
  }
}

async function createJob(req: Request, res: Response) {
  const { id, job_title, description, date_added, expires, closed, employer } =
    req.body;
  try {
    const newJob = await createNewJob(
      id,
      job_title,
      description,
      new Date(date_added),
      new Date(expires),
      closed,
      employer,
    );
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error adding a new job:", error);
    res.status(500).json({ error: "Failed to create job." });
  }
}

async function updateJobDetails(req: Request, res: Response) {
  const jobId = req.params.id;
  const updates = req.body;

  if (!jobId) {
    res.status(400).json({ error: "jobId is required" });
    return;
  }

  try {
    const updatedJob = await updateJob(jobId, updates);
    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found." });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    next(error);
  }
}

async function closeJobById(req: Request, res: Response) {
  const jobId = req.params.id;

  if (!jobId) {
    res.status(400).json({ error: "jobId is required" });
    return;
  }

  try {
    const closedJob = await closeJob(jobId, true);
    res.status(200).json(closedJob);
  } catch (error) {
    res.status(500).json({ error: "Failed to close job." });
  }
}

async function deleteJobById(req: Request, res: Response) {
  const jobId = req.params.id;

  if (!jobId) {
    res.status(400).json({ error: "jobId is required" });
    return;
  }

  try {
    await deleteJob(jobId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete job" });
  }
}

export {
  getJobs,
  getJob,
  createJob,
  updateJobDetails,
  closeJobById,
  deleteJobById,
};
