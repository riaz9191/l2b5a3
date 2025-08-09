import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
async function main() {
  try {
     await mongoose.connect(
       "mongodb+srv://Mongodb:Mongodb@cluster0.dydio7p.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0",
    );
    console.log("Connected to MongoDB Using Mongoose!!");
    server = app.listen(5000, () => {
      console.log("App is listening on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
}
main();