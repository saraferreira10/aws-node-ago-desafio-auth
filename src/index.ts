import express from "express";
import cors from "cors";
import conn from "./database/connection.database"

const app = express();
app.use(cors());

conn.getConnection();
app.listen(3000, () => console.log("listening..."));
