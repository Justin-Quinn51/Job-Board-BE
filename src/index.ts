import express, { type Request, type Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express with TS!");
});

app.listen(process.env.port || 3000, () => {
  console.log(`running on port ${process.env.port}`);
});
