import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
import { bookRoutes } from "./app/controller/book.controller";

const app: Application = express();
app.use(express.json());

app.use("/api/books", bookRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("welcome to library management system!");
});

export default app;
