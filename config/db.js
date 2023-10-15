import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@cluster0.x1iipx0.mongodb.net/?retryWrites=true&w=majority`;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@posts.k0l6ijc.mongodb.net/?retryWrites=true&w=majority`;
export const client = new MongoClient(uri);
export const client_post = new MongoClient(url);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB database ");
  } catch (error) {
    console.error("Database connection error: ", error.message);
    process.exit(1);
  }
};

export const connectDB_POST = async () => {
  try {
    await client_post.connect();
    console.log("Connected to MongoDB database ");
  } catch (error) {
    console.error("Database connection error: ", error.message);
    process.exit(1);
  }
};
