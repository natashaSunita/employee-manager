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
    return db.query("SELECT * FROM `departments`", function (err, results) {
      console.table(results); // results contains rows returned by db
    });
  },
  roles: () => {
    return db.query("SELECT * FROM `roles`", function (err, results) {
      console.table(results); // results contains rows returned by db
    });
  },
  employees: () => {
    return db.query("SELECT * FROM `employees`", function (err, results) {
      console.table(results); // results contains rows returned by db
    });
  },
  addDepartment: (departmentName) => {
    db.query(
      `INSERT INTO departments (name) VALUES ("${departmentName}")`,
      function (err, result) {
        if (err) throw err;
        console.log("1 Department added");
      }
    );
  },
};
