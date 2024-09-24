import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "..", "src", "config", "config.env"),
});

const app = express();
app.use(cors());
app.listen(3000, () => console.log("listening..."));
