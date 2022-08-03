const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "newt",
  database: "employee_db",
});

// Query the database
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
      `INSERT INTO employees (first_name, last_name, department_id, role_id, manager_id) 
      VALUES ("${employeeName}")`,
      function (err, result) {
        if (err) throw err;
        console.log(`Added ${employeeName} to Employees`);
        back();
      }
    );
  },
};

// Home Screen
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

// Go back
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

// Add a Department
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

// Add an Employee
const addEmployee = () => {
  const deptsArr = [];
  const rolesArr = [];
  const managersArr = [];
  // const getFullName = (results) => {
  //   const employees = [arr.first_name, item.last_name].join(" ");
  // };
  query.departments().then(([results]) => {
    results.map((x) => deptsArr.push(x.name));
  });
  query.roles().then(([results]) => {
    results.map((x) => rolesArr.push(x.title));
    // console.log(rolesArr);
  });
  query.employees().then(([results]) => {
    // Add first name and last name as values in array
    const getFullName = (results) => {
      managersArr.push([results.first_name, results.last_name].join(" "));
    };
    results.map(getFullName);
  });
  return (
    inquirer
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
          name: "department",
        },
        {
          type: "list",
          message: "What is the employee's role?",
          choices: rolesArr,
          name: "role",
        },
        {
          type: "list",
          message: "Who is the employee's manager?",
          choices: managersArr,
          name: "manager",
        },
      ])
      // Prepare answers for insert and add to object
      .then((answers) => {
        const insObj = {
          fName: answers.fName,
          lName: answers.lName,
        };
        // Extract the manager's first and last name into an array
        const managerObj = answers.manager.split(" ");
        // Get department ID
        db.query(
          `SELECT id FROM departments WHERE name = "${answers.department}"`,
          (err, result) => {
            if (err) throw err;
            insObj.deptId = result;
          }
        );
        // Get role ID
        db.query(
          `SELECT id FROM roles WHERE title = "${answers.role}"`,
          (err, result) => {
            if (err) throw err;
            insObj.roleId = result;
          }
        );
        // Get manager ID
        db.query(
          `SELECT id FROM employees WHERE first_name = "${managerObj[0]}" AND last_name = "${managerObj[1]}"`,
          (err, result) => {
            if (err) throw err;
            insObj.managerId = result;
          }
        ).then((insObj) => {
          console.log(insObj);
          // Insert Employee into db with values
          // db.query(
          //   `INSERT INTO employees (first_name, last_name, department_id, role_id, manager_id) VALUES (${insObj.fName}, ${insObj.lName},
          //                 ${insObj.deptId}, ${insObj.roleId}, ${insObj.managerId}"`,
          //   (err, result) => {
          //     if (err) throw err;
          //     console.log(
          //       `Added ${answers.fName}, ${answers.lName} to employee list`
          //     );
          //   }
          // );
        });
      })
  );
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
