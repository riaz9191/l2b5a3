import { Model, Types } from "mongoose";
import { IBooks } from "./book.interface";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface BorrowLogicStatic extends Model<IBorrow> {
  deductCopies(bookId: string, quantity: number): Promise<void>;
}
