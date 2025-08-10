import express, { NextFunction, Request, Response } from "express";
import Book from "../model/book.model";
import { createBookZodSchema, updateBookZodSchema } from "../validator/book.zod.validate";
export const bookRoutes = express.Router();

bookRoutes.post("/create-books", async (req: Request, res: Response) => {
 try {
    const body = await createBookZodSchema.parseAsync(req.body);
    const books = await Book.create(body);
    res.status(200).json({
      success: true,
      message: "Books created successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
     error: error.name === "ValidationError" ? { name: error.name, errors: error.errors } : error,
    });
  }
});

bookRoutes.get("/", async (req: Request, res: Response) => {
//   const body = req.body;
  try{
    const {
    filter,
    sortBy = "createdAt",
    sort = "asc",
    limit = 10,
    skip,
  } = req.query;

  const query: any = {};
  if (filter) {
    query.genre = filter;
  }

//   const books = await Book.find(body);

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'desc' ? -1 : 1 })
      .limit(parseInt(limit as string, 109)); 
      
      res.status(200).json({
    success: true,
    message: "Books fetched successfully",
    data: books,
    meta: {
        total: books.length
    }
  });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

bookRoutes.get("/:bookId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;
    const existingBook = await Book.isBookExists(bookId);
    if (existingBook) {
      const book = await Book.findById(bookId);
      res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    } else {
      res.status(404).json({
        message: "Book Does Not Exists",
        success: false,
        data: {},
      });
    }
  } catch (error: any) {
    next(error);
  }
});

bookRoutes.patch("/:id", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updatedBookParameters = await updateBookZodSchema.parseAsync(req.body);
    const existingBook = await Book.isBookExists(bookId);
    if (existingBook) {
      const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookParameters, { new: true, runValidators: true });
      res.status(200).json({
        success: true,
        message: "Book Updated successfully",
        data: updatedBook,
      });
    } else {
      res.status(404).json({
        message: "Book Does Not Exists",
        success: false,
        data: {},
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error.name === "ValidationError" ? { name: error.name, errors: error.errors } : error,
    });
  }
});
bookRoutes.delete("/:id", async (req: Request, res: Response , next: NextFunction) => {
  try {
    const bookId = req.params.bookId;
    const existingBook = await Book.isBookExists(bookId);
    if (existingBook) {
      await Book.findByIdAndDelete(bookId);
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } else {
      res.status(404).json({
        message: "Book Does Not Exists",
        success: false,
        data: {},
      });
    }
  } catch (error: any) {
    next(error);
  }
});