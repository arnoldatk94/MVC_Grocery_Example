const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db/models/index");

const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "https://myApp/api",
  issuerBaseURL: `https://dev-v8d6ndoe6namv4ez.us.auth0.com/`,
});

const { product } = db;

const ProductsRouter = require("./routers/productsRouter");
const ProductsController = require("./controllers/productsController");

const PORT = process.env.PORT || 8000;

const app = express();

const productsController = new ProductsController(product);
const productsRouter = new ProductsRouter(
  express,
  productsController,
  checkJwt
).routes();

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Application listening to port ${PORT}`);
});
