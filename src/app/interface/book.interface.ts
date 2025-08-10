import { Document, Model } from "mongoose";

export interface IBooks {
  title: string;
  author: string;
  genre: "FICTION" | "NON-FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}


export interface BookCheckStaticMethod extends Model<IBooks> {
  isBookExists(bookId: string): Promise<boolean>;
}