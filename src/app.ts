import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.send("welcome to the advanced note app!");
});

export default app;
