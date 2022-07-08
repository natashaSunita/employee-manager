// Initialise and include db creds
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "newt",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  /*Create a database named "mydb":*/
  db.query("CREATE DATABASE employee_db", (err, result) => {
    if (err) throw err;
    console.log("Database created");
  });
});
