import express, { Request, Response } from "express";
import Borrow from "../model/borrow.model";
import Book from "../model/book.model";
export const borrowRoutes = express.Router();

borrowRoutes.post("/create-borrows", async (req: Request, res: Response) => {
  const bookId = req.query.bookId;
  const book = await Book.findById(bookId);
  
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
  const body = req.body;
  const borrows = await Borrow.find(body);
  res.status(200).json({
    success: true,
    message: "Borrows fetched successfully",
    data: borrows,
  });
});
