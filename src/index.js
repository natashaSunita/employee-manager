const db = require("./db.js");
const inquirer = require("inquirer");

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

const back = () => {};

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
      // Run query building function and insert departmentname
      db.addDepartment(answer.departmentName);
    });
};

// Step after Home
const nextStep = (choice) => {
  if (choice.home == "View all Departments") {
    db.departments();
    back();
  }
  if (choice.home == "View all Roles") {
    db.roles();
  }
  if (choice.home == "View all Employees") {
    db.employees();
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
