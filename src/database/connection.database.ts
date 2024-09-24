import dotenv from "dotenv";
import path from "path";
import mysql from "mysql2/promise";

dotenv.config({
  path: path.resolve(__dirname, "..", "..", "src", "config", "config.env"),
});

const { DATABASE, PASSWORD, USER } = process.env;

const connection = mysql.createPool({
  user: USER,
  database: DATABASE,
  password: PASSWORD,
});

(async function () {
  try {
    await connection.getConnection();
    const [response] = await connection.query("SELECT * FROM users");
    console.log(response);
  } catch (e) {
    console.log(e);
  }
})();

export default connection;
