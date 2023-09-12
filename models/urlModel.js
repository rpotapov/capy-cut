const { client } = require("../config/db");

const urlCollectionName = "urls";

async function insertURL({ originalURL, shortURL }) {
  try {
    const database = client.db("shorten-urls");
    const urlsCollection = database.collection(urlCollectionName);
    const { acknowledged } = await urlsCollection.insertOne({
      originalURL,
      shortURL,
    });

    return acknowledged && shortURL;
  } catch (error) {
    console.error("Помилка при збереженні URL:", error.message);
    throw error;
  }
}

async function findURL({ shortURLSearch = "", originalURLSearch = "" }) {
  try {
    const database = client.db("shorten-urls");
    const urlsCollection = database.collection(urlCollectionName);
    if (shortURLSearch) {
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
    console.error("Помилка при перевірці URL DB:", error.message);
    throw error;
  }
}

async function findAllURLs() {
  try {
    const database = client.db("shorten-urls");
    const urlsCollection = database.collection(urlCollectionName);
    const urls = await urlsCollection.find({}).toArray();
    return urls;
  } catch (error) {
    console.error("Помилка при отриманні URL:", error.message);
    throw error;
  }
}

module.exports = { insertURL, findURL, findAllURLs };
