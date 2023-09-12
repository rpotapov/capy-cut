const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@cluster0.x1iipx0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Підключено до бази даних MongoDB");
  } catch (error) {
    console.error("Помилка підключення до бази даних:", error.message);
    process.exit(1);
  }
}

module.exports = { client, connectDB };
