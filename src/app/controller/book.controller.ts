import express, { Request, Response } from "express";
import Book from "../model/book.model";
export const bookRoutes = express.Router();

bookRoutes.post("/create-books", async (req: Request, res: Response) => {
  const body = req.body;
  const books = await Book.create(body);
  res.status(200).json({
    success: true,
    message: "Books created successfully",
    data: books,
  });
});

bookRoutes.get("/", async (req: Request, res: Response) => {
  const body = req.body;
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
      .limit(parseInt(limit as string, 10)); 
      
      res.status(200).json({
    success: true,
    message: "Books fetched successfully",
    data: books,
    meta: {
        total: books.length
    }
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

bookRoutes.patch("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const book = await Book.findByIdAndUpdate(id, body, { new: true });
  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
});

bookRoutes.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const book = await Book.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: book,
  });
});
