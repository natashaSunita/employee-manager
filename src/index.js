const db = require("./db.js");
const inquirer = require("inquirer");
// formats tables in console output
// const cTable = require("console.table");

// View departments in db
// const viewDepartments = () => {
//   db.departments();
// };

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

// Step after Home
const nextStep = (choice) => {
  if (choice.home == "View all Departments") {
    db.departments();
  }
  if (choice.home == "View all Roles") {
    viewRoles();
  }
  if (choice.home == "View all Employees") {
    viewEmployees();
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
