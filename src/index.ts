import express, { type Request, type Response } from "express";
import "dotenv/config";

const app = express();
app.use(express.json());

app.listen(process.env.PORT || 3000, () => {
  console.log(`running on port ${process.env.PORT}`);
});
