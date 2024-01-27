const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const dbConnection = require("./config/database");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const movieRoute = require("./routes/movieRoute");
const listRoute = require("./routes/listRoute");

dotenv.config({ path: "./config.env" });

dbConnection.dbConnection();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});
