import express from "express";
import cors from "cors";
import { connectDB, connectDB_POST } from "./config/db.js";
import {
  insertURL,
  findAllURLs,
  findURL,
  getPosts,
  addPost,
  getComments,
  addComment,
} from "./models/urlModel.js";
import { generateShortURL, combinePostsAndComments } from "./utils/index.js";

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
connectDB();
connectDB_POST();
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
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

app.post("/api/checkUrl", async (req, res) => {
  try {
    const { originalURL } = req.body;
    const existingURL = await findURL({ originalURLSearch: originalURL });

    if (existingURL) {
      return res.status(200).json({
        message: "This URL already exists",
        url: existingURL,
      });
    } else {
      return res.status(200).json({
        message: "SNo such URL exists",
        url: null,
      });
    }
  } catch (error) {
    console.error("Error validating URL: ", error.message);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

app.get("/api/urls", async (req, res) => {
  try {
    const urls = await findAllURLs();
    res.json(urls);
  } catch (error) {
    console.error("Error getting URL: ", error.message);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

app.get("/api/redirect/:shortUrl", async (req, res) => {
  try {
    const response = await findURL({ shortURLSearch: req.params.shortUrl });
    if (response?.originalURL) {
      res.json({ url: response.originalURL });
    } else {
      res.json(response || { message: "Not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get_posts", async (req, res) => {
  try {
    const posts = await getPosts();
    const comments = await getComments();

    const postsWithComments = combinePostsAndComments(posts, comments);
    res.json(postsWithComments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

app.post("/add_post", async (req, res) => {
  try {
    const post = await addPost(req.body);
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

app.get("/get_comments", async (req, res) => {
  try {
    const comments = await getComments();

    res.json(comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

app.post("/add_comment", async (req, res) => {
  try {
    const comment = await addComment(req.body);
    res.json(comment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`The server is started on the port ${port}`);
});
