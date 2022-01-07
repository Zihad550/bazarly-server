const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const app = express();
const ObjectId = require("mongodb").ObjectId;

const port = process.env.PORT || 8000;

// middle ware
app.use(cors());
app.use(express.json());

// mongo client
const client = new MongoClient(process.env.URI);

async function run() {
  try {
    await client.connect();

    const database = client.db("bazarly");
    const catagoriesCollection = database.collection("catagories");
    const productsCollection = database.collection("products");
    const brandsCollection = database.collection("brands");

    // get catagories
    app.get("/catagories", async (req, res) => {
      const result = await catagoriesCollection.find({}).toArray();
      res.json(result);
    });

    // get shoes
    app.get("/products", async (req, res) => {
      const category = req.query.category;
      const result = await productsCollection.find({ category }).toArray();
      res.json(result);
    });

    // get brands
    app.get("/brands", async (req, res) => {
      const result = await brandsCollection.find({}).toArray();
      res.json(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to green bazarly server");
});

app.listen(port, () => {
  console.log("port running at localhost:", port);
});
