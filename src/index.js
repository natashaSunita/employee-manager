const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "newt",
  database: "employee_db",
});

const query = {
  departments: () => {
    return db.promise().query("SELECT * FROM `departments`");
  },
  roles: () => {
    return db.promise().query("SELECT * FROM `roles`");
  },
  employees: () => {
    return db.promise().query("SELECT * FROM `employees`");
  },
  newDepartment: (departmentName) => {
    db.query(
      `INSERT INTO departments (name) VALUES ("${departmentName}")`,
      function (err, result) {
        if (err) throw err;
        console.log(`Added ${departmentName} to Departments`);
        back();
      }
    );
  },
  newEmployee: (employeeName) => {
    db.query(
      `INSERT INTO employees (name) VALUES ("${employeeName}")`,
      function (err, result) {
        if (err) throw err;
        console.log(`Added ${employeeName} to Employees`);
        back();
      }
    );
  },
};

const home = () => {
  return inquirer.prompt([
    {
      type: "list",
      message: "Welcome to the Employee Manager. What would you like to do?",
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add a Department",
        "Add an Employee",
        "Update an Employee",
        "Quit",
      ],
      name: "home",
    },
  ]);
};

const back = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "Go back?",
        choices: ["Yes"],
        name: "back",
      },
    ])
    .then((choice) => {
      if (choice.back == "Yes") {
        questions();
      }
    });
};

const addDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the Department name:",
        name: "departmentName",
      },
    ])
    .then((answer) => {
      query.newDepartment(answer.departmentName);
    });
};

const addEmployee = () => {
  const deptsArr = [];
  query.departments().then(([results]) => {
    results.map((x) => deptsArr.push(x.name));
  });
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the Employee's first name:",
        name: "fName",
      },
      {
        type: "input",
        message: "Enter the Employee's last name:",
        name: "lName",
      },
      {
        type: "list",
        message: "Which department does the employee belong to?",
        choices: deptsArr,
        name: "managerEmail",
      },
      {
        type: "input",
        message: "Enter the Manager's office number:",
        name: "officeNumber",
      },
    ])
    .then((answer) => {
      const manager = new Manager(
        answer.managerName,
        answer.managerId,
        answer.managerEmail,
        answer.officeNumber
      );
      employeeRoster.push(manager);
      questions();
    });
};

// Step after Home
const nextStep = (choice) => {
  if (choice.home == "View all Departments") {
    query.departments().then(([results]) => {
      console.table(results);
      back();
    });
  }
  if (choice.home == "View all Roles") {
    query.roles().then(([results]) => {
      console.table(results);
      back();
    });
  }
  if (choice.home == "View all Employees") {
    query.employees().then(([results]) => {
      console.table(results);
      back();
    });
  }
  if (choice.home == "Add a Department") {
    addDepartment();
  }
  if (choice.home == "Add an Employee") {
    addEmployee();
  }
  if (choice.home == "Update an Employee") {
    updateEmployee();
  }
  if (choice.home == "Quit") {
    quit();
  }
};

// Questions for user input
const questions = () => {
  home().then((choice) => {
    nextStep(choice);
  });
};

questions();
