import { client, client_post } from "../config/db.js";

const urlCollectionName = "urls";

export const insertURL = async ({ originalURL, shortURL }) => {
  try {
    const database = client.db("shorten-urls");
    const urlsCollection = database.collection(urlCollectionName);
    const { acknowledged } = await urlsCollection.insertOne({
      originalURL,
      shortURL,
    });

    return acknowledged && shortURL;
  } catch (error) {
    console.error("Error saving URL: ", error.message);
    throw error;
  }
};

export const findURL = async ({
  shortURLSearch = "",
  originalURLSearch = "",
}) => {
  try {
    const database = client.db("shorten-urls");
    const urlsCollection = database.collection(urlCollectionName);
    if (shortURLSearch) {
      console.log(
        "shortURLSearch",
        await urlsCollection.findOne(
          { shortURL: shortURLSearch },
          { originalURL: 1, shortURL: 1, _id: 0 }
        )
      );
      return await urlsCollection.findOne(
        { shortURL: shortURLSearch },
        { originalURL: 1, shortURL: 1, _id: 0 }
      );
    }
    if (originalURLSearch) {
      return await urlsCollection.findOne(
        { originalURL: originalURLSearch },
        { originalURL: 1, shortURL: 1, _id: 0 }
      );
    }
  } catch (error) {
    console.error("Error checking DB URL: ", error.message);
    throw error;
  }
};

export const findAllURLs = async () => {
  try {
    const database = client.db("shorten-urls");
    const urlsCollection = database.collection(urlCollectionName);
    const urls = await urlsCollection.find({}).toArray();
    return urls;
  } catch (error) {
    console.error("Error getting URL: ", error.message);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const database = client_post.db("post-react");
    const urlsCollection = database.collection("posts");
    const urls = await urlsCollection.find({}).toArray();
    return urls;
  } catch (error) {
    console.error("Error getting POSTS: ", error.message);
    throw error;
  }
};

export const addPost = async (post) => {
  try {
    const database = client_post.db("post-react");
    const urlsCollection = database.collection("posts");
    const result = await urlsCollection.insertOne(post);
    const { insertedId } = result;
    return { ...post, _id: insertedId };
  } catch (error) {
    console.error("Error saving URL: ", error.message);
    throw error;
  }
};
