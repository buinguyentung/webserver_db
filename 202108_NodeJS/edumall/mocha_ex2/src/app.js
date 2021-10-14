/**
 * Src: https://github.com/GodwinEkuma/mocha-chai-unit-test
 */
const express = require("express");
const morgan = require("morgan");
const router = require("./user/user.route");
const sequelize = require("./database").sequelize;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 5001;

app.use("/api/v1", router);
app.get("*", (req, res) => {
  res.status(404).json({ message: "Welcome to the begining of nothingness" });
});

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});