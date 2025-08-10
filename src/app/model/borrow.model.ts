import mongoose, { Schema } from "mongoose";
import { BorrowLogicStatic, IBorrow } from "../interface/borrow.interface";
import Book from "./book.model";

export const borrowSchema = new Schema<IBorrow, BorrowLogicStatic>({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "Book is required"],
  },
  quantity: { type: Number, required: [true, "Quantity is required"], min: [1, "Quantity must be a positive integer"], },
  dueDate: { type: Date, required: [true, "Due date is required"] },
});

borrowSchema.pre("save", async function (next) {
    const book = await Book.findById(this.book);
    if (!book) throw new Error("Book Do Not Exist!")

    if (book.copies < this.quantity) throw new Error("Not Enough Book Copies Available!")
    next()
});

borrowSchema.static(
  "deductCopies",
  async function (bookId: string, quantity: number) {
    const book = await Book.findById(bookId);
    if (book) {
      book.copies -= quantity;
      if (book.copies === 0) {
        book.available = false;
        throw new Error("Not enough copies available");
      }
      const updatedBook = await Book.findByIdAndUpdate(bookId, {
        copies: book.copies,
        available: book.available,
      });
      return updatedBook;
    }
  }
);
borrowSchema.post("save", async function () {
  await Borrow.deductCopies(this.book.toString(), this.quantity);
});

const Borrow = mongoose.model<IBorrow, BorrowLogicStatic>("Borrow", borrowSchema);
export default Borrow;
