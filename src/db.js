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
    return db.promise().query("SELECT * FROM `departments`");
  },
  roles: () => {
    return db.promise().query("SELECT * FROM `roles`");
  },
  employees: () => {
    return db.promise().query("SELECT * FROM `employees`");
  },
  addDepartment: (departmentName) => {
    db.query(
      `INSERT INTO departments (name) VALUES ("${departmentName}")`,
      function (err, result) {
        if (err) throw err;
        console.log(`Added ${departmentName} to Departments.`);
      }
    );
  },
};
