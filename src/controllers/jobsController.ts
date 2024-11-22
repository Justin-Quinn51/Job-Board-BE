import { type Request, type Response, type NextFunction } from "express";
import {
  getAllJobs,
  getJobById,
  createNewJob,
  updateJob,
  closeJob,
  deleteJob,
  type JobDataUpdates,
} from "../models/jobsModel.ts";

interface RequestParams {
  id: string;
}

async function getJobs(req: Request, res: Response): Promise<void> {
  const { closed } = req.params;
  console.log(closed);
  const jobs = await getAllJobs();

  if (!jobs) {
    res.status(500).json({ error: "Failed to retrieve jobs." });
    return;
  }
  res.status(200).json(jobs);
}

async function getJob(req: Request, res: Response): Promise<void> {
  const jobId = req.params.id;

  if (!jobId) {
    res.status(400).json({ error: "jobId is required" });
    return;
  }

  const job = await getJobById(jobId);

  if (!job) {
    res.status(404).json({ error: "Job not found." });
    return;
  }
  res.status(200).json(job);
}

async function createJob(req: Request, res: Response): Promise<void> {
  const { id, job_title, description, date_added, expires, closed, employer } =
    req.body;
  const newJob = await createNewJob(
    id,
    job_title,
    description,
    new Date(date_added),
    new Date(expires),
    closed,
    employer,
  );

  if (!newJob) {
    res.status(400).json({ error: "job not created" });
  }
  res.status(201).json(newJob);
}

async function updateJobDetails(
  // RequestParams represents the interface for route parameters (params)
  // '{}': represents the type for the response body (empty object)
  // 'JobDataUpdates' represents the imported custom type for the request body
  req: Request<RequestParams, {}, JobDataUpdates>,
  res: Response,
): Promise<void> {
  const jobId = req.params.id;
  const updates = req.body;

  if (!jobId) {
    res.status(400).json({ error: "jobId is required" });
    return;
  }

  const updatedJob = await updateJob(jobId, updates);
  if (!updatedJob) {
    res.status(404).json({ error: "Job not updated." });
    return;
  }
  res.status(200).json(updatedJob);
}

async function closeJobById(req: Request, res: Response): Promise<void> {
  const jobId = req.params.id;

  if (!jobId) {
    res.status(400).json({ error: "jobId is required" });
    return;
  }

  const closedJob = await closeJob(jobId, true);

  if (!closedJob) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.status(200).json(closedJob);
}

async function deleteJobById(req: Request, res: Response): Promise<void> {
  const jobId = req.params.id;

  if (!jobId) {
    res.status(400).json({ error: "jobId is required" });
    return;
  }

  await deleteJob(jobId);
  res.status(204).send();
}

export {
  getJobs,
  getJob,
  createJob,
  updateJobDetails,
  closeJobById,
  deleteJobById,
};
