import express, { Application, NextFunction, Request, Response } from "express";
import { model, Schema } from "mongoose";
import { bookRoutes } from "./app/controller/book.controller";
import { borrowRoutes } from "./app/controller/borrow.controller";

const app: Application = express();
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/borrows", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to library management system!");
});
// not found route error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found !",
    error: {}
  });
});
// all other error handler except validation error and route error

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log("Error:", error);
    res.status(400).json({
      success: false,
      message: "Something went Wrong!",
      error,
    });
  }
});
export default app;
