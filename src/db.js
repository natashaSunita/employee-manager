// Initialise and include db creds
const mysql = require("mysql");

const newdb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "newt",
});

newdb.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  /*Create a database named "mydb":*/
  con.query("CREATE DATABASE employee_db", (err, result) => {
    if (err) throw err;
    console.log("Database created");
  });
});
