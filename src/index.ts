import express, { type Request, type Response } from "express";
import "dotenv/config";
import jobRoutes from "./routes/jobRoutes.ts";
import { errorHandler } from "./errors/errorHandler.ts";

const app = express();
app.use(express.json());

app.use("/jobs", jobRoutes);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`running on port ${process.env.PORT}`);
});
