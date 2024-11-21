import pool from "../config/db.ts";

type JobDataUpdates = {
  job_title?: string;
  description?: string;
  expires?: Date;
  closed?: boolean;
  employer?: string;
};

async function getAllJobs() {
  const fetchJobsQuery = "SELECT * FROM jobs";
  const result = await pool.query(fetchJobsQuery);
  return result.rows;
}

async function getJobById(id: string) {
  const fetchJobQuery = "SELECT * FROM jobs WHERE id = $1";
  const result = await pool.query(fetchJobQuery, [id]);
  return result.rows[0];
}

async function createNewJob(
  id: string,
  job_title: string,
  description: string,
  date_added: Date,
  expires: Date,
  closed: boolean,
  employer: string,
) {
  const createJobQuery =
    "INSERT INTO jobs (id, job_title, description, date_added, expires, closed, employer) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
  const jobValues = [
    id,
    job_title,
    description,
    date_added,
    expires,
    closed,
    employer,
  ];
  const result = await pool.query(createJobQuery, jobValues);
  return result.rows[0];
}

async function updateJob(id: string, updates: JobDataUpdates) {
  // Stores each column of the jobs table that can be edited in an array
  const fields = Object.keys(updates);
  if (fields.length === 0) {
    throw new Error("No fields to update.");
  }
  // Each field is mapped to its placeholder (e.g. job_title = $2)
  // The field value is inserted directly into the string
  // The ('=') indicates we want to set the field to a new value via the SET clause
  // index represents the current position in the fields array
  // We add 2 to calculate the position for the placeholder b/c $1 will always be reserved for the id (e.g. index = $1, description = $2)
  const setClauses = fields.map((field, index) => `${field} = $${index + 2}`);
  // setClauses is an array containing individual assignment clauses (e.g. "job_title = $2")
  // the join method combines all elements in the array into a single, comma and space separated string
  // the result is a complete SET clause for updating columns (e.g. SET job_title = $2, closed = $3)
  const updateJobQuery = `
    UPDATE jobs
    SET ${setClauses.join(",  ")}
    WHERE id = $1
    RETURNING *
`;
  // The spread operator (...) expands the array, so that each mapped value is added to values
  // fields is an array of the field names that should be updated (e.g. "closed")
  // map transforms each field into the corresponding value from the updates object
  // updates[field] retrieves the value of the field from the updates object
  // as keyof allows Typescript to recognize field as a valid key of JobDataUpdates
  const updateJobValues = [
    id,
    ...fields.map((field) => {
      const value = updates[field as keyof JobDataUpdates];
      if (value === undefined) {
        throw new Error(`Invalid field: ${field}`);
      }
      return value;
    }),
  ];

  const result = await pool.query(updateJobQuery, updateJobValues);

  return result.rows[0];
}

async function closeJob(id: string, closed: boolean) {
  if (closed) {
    throw new Error("Job is already closed.");
  }

  const closeJobQuery = "UPDATE jobs SET closed = $2 WHERE id = $1 RETURNING *";
  const closeJobValues = [id, closed];
  const result = await pool.query(closeJobQuery, closeJobValues);
  return result.rows[0];
}

async function deleteJob(id: string) {
  const deleteJobQuery = "DELETE FROM jobs WHERE id = $1";
  await pool.query(deleteJobQuery, [id]);
}

export { getAllJobs, getJobById, createNewJob, updateJob, closeJob, deleteJob };
