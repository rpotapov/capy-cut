require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { connectDB } = require("./config/db");
const { insertURL, findAllURLs, findURL } = require("./models/urlModel");
const { generateShortURL } = require("./utils");
const port = process.env.PORT || 5000;

app.use(cors());
connectDB();
app.use(express.json());

app.post("/api/shorten", async (req, res) => {
  try {
    const { originalURL, shortURL } = req.body;
    const generatedShortURL = shortURL || generateShortURL();
    const newURL = await insertURL({
      originalURL,
      shortURL: generatedShortURL,
    });

    res.json(newURL);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

app.post("/api/checkUrl", async (req, res) => {
  try {
    const { originalURL } = req.body;
    console.log("==>", req.body);
    let existingURL = await findURL({ originalURLSearch: originalURL });

    if (existingURL) {
      return res.status(200).json({
        message: "Такий Short URL вже існує",
        url: existingURL,
      });
    } else {
      return res.status(200).json({
        message: "Такий Short URL не існує",
        url: null,
      });
    }
  } catch (error) {
    console.error("Помилка при перевірці URL:", error.message);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

app.get("/api/urls", async (req, res) => {
  try {
    const urls = await findAllURLs();
    res.json(urls);
  } catch (error) {
    console.error("Помилка при отриманні URL:", error.message);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

app.get("/:shortURL", async (req, res) => {
  try {
    const { shortURL } = req.params;
    const response = await findURL({ shortURLSearch: shortURL });
    console.log("originalURL ===>>>", response.originalURL);
    if (response?.originalURL) {
      res.redirect(response.originalURL);
    } else {
      res.status(404).json({ message: "Short URL not found" });
    }
  } catch (e) {}
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});
