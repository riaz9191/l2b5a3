import { minLength } from "zod";
import { BookCheckStaticMethod, IBooks } from "../interface/book.interface";
import { model, Schema } from "mongoose";

export const bookSchema = new Schema<IBooks , BookCheckStaticMethod>(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON-FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: [true, "Genre is required"],
      message: "{VALUE} is not a valid genre",
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },
    description: { type: String, default: "No description provided" },
    copies: {
      type: Number,
      required: [true, "Copies are required"],
      min: [0, "Copies must be greater than 0"],
      trim: true,
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.static("isBookExists", async function (bookId: string) {
  const book = await this.findById(bookId);
  return book ? true : false;
});


const Book = model<IBooks,BookCheckStaticMethod>("Book", bookSchema);
export default Book;