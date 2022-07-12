const mysql = require("mysql2");
const cTable = require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "newt",
  database: "employee_db",
});

module.exports = {
  departments: () => {
    return db.query(
      "SELECT * FROM `departments`",
      function (err, results, fields) {
        console.table(results); // results contains rows returned by server
      }
    );
  },
};
