const inquirer = require("inquirer");

// Application home
// const home = () => {
//   return inquirer.prompt([
//     {
//       type: "list",
//       message: "Welcome to the Employee Manager. What would you like to do?",
//       choices: [
//         "View all Departments",
//         "View all Roles",
//         "View all Employees",
//         "Add a Department",
//         "Add an Employee",
//         "Update an Employee",
//         "Quit",
//       ],
//       name: "home",
//     },
//   ]);
// };

// Questions for user input
const questions = () => {
  home().then((choice) => {
    nextStep(choice);
  });
};

module.exports = {
  home: () => {
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
  },
  questions: () => {
    home().then((choice) => {
      nextStep(choice);
    });
  };
};
