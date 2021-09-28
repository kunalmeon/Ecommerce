require("dotenv").config({ path: "../config.env" });
const mongoose = require("mongoose");
const fs = require("fs");
const productModel = require("../models/productModel");

const url = process.env.DATABASE_URI.replace(
  "<password>",
  process.env.PASSWORD
);

mongoose
  .connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const productData = JSON.parse(
  fs.readFileSync("../projectData/productList.json", "utf-8")
);

const fillPoducts = async () => {
  try {
    console.log("about to write data");
    await productModel.create(productData);
    console.log("data successfully written");

    process.exit();
  } catch (error) {
    console.log(`problem while writing is ${error}`);
    process.exit();
  }
};

const deleteData = async () => {
  try {
    await productModel.deleteMany();
    console.log("data deleted");
    process.exit();
  } catch (error) {
    console.log(error.message);
  }
};

if (process.argv[2] === "-import") {
  fillPoducts();
}
if (process.argv[2] === "-delete") {
  deleteData();
}
