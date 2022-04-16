require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const routes = require("./routes");

const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const { handleErrors } = require("./middleware");

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

// routes
const apiRoute = process.env.API_ROUTE || "api";
app.use(`/${apiRoute}`, routes);
app.get("/", (req, res) => res.status(200).send("app is running"));

// error handling
app.use(handleErrors);

app.listen(port, () => console.log(`app is listening on port ${port}`));
