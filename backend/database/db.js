const mysql = require("mysql");

const connection = mysql.createConnection({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  host: "103.200.22.212",
  user: "hoatuoi1",
  password: "Angular@123",
  database: "hoatuoi1_angular",
  port: 3306,
});

connection.connect((err) => {
  if (err) console.log(err);
  else console.log("MySQL is connected...");
});

module.exports = connection;
