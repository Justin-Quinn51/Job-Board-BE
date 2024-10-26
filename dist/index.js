import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello from Express with TS!");
});
app.listen(process.env.port || 3e3, () => {
  console.log(`running on port ${process.env.port}`);
});
