require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const checkUserPassword = require("./middlewares/checkUserPassword");
const tokenAuth = require("./middlewares/tokenAuth");

const authRoutes = require("./api/authRoutes");
const userRoutes = require("./api/userRoutes");

require("./dbConfig");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", checkUserPassword, authRoutes);
app.use("/api/user", tokenAuth, userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
