import express, { Request, Response } from "express";
import Book from "../model/book.model";
export const bookRoutes = express.Router();

bookRoutes.get("/", async (req: Request, res: Response) => {
    const body = req.body;

    const books = await Book.find(body);
    res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        data: books,
    });
});

bookRoutes.post("/create-books", async (req: Request, res: Response) => {
    const body = req.body;
    const books = await Book.create(body);
    res.status(200).json({
        success: true,
        message: "Books created successfully",
        data: books,
    });
});

bookRoutes.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const book = await Book.findById(id);
    res.status(200).json({
        success: true,
        message: "Book fetched successfully",
        data: book,
    });
});