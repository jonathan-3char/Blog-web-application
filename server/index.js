import express from "express";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));

app.get("/login", (req, res) => {
  res.send("This is the login page");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
