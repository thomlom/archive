require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const request = require("./request");

const app = express();

app.use(morgan("tiny"));
app.use(cors()); // Enable All CORS Requests

app.get("/stock/search/:keywords", request.requestSearch);
app.get("/stock/:symbol", request.requestSymbol);
app.get("/stock/:symbol/detail", request.requestDetailSymbol);

module.exports = app;
