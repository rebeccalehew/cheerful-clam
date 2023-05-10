// Import & require express
const express = require('express');

// Import and require Inquirer
const inquirer = require('inquirer');

// Import and require the console.table package
const { printTable} = require("console-table-printer");

// Require DB connection from config/connection
const bookstore = require('./config/connection');

// Prepare Express to run server
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.json());

// Connect to database
bookstore.connect(err => {
    if (err) throw err;
    console.log('Connected to bookstore database!')
});

// Variable used to initialize the employeeTracker function
const startQuestion = [
    {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Exit"]
    }
];

// MySQL function to start the inquirer prompts
const employeeTracker = () => {
    inquirer.prompt(startQuestion).then((answers) => {
        // Based on user answers, switch to different actions
        switch (answers.options) {
            case "View All Departments":
                viewDepartments();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "View All Employees":
                viewEmployees();
                break;
            case "Add A Department":
                addDepartment();
                break;
            case "Add A Role":
                addRole();
                break;
            case "Add An Employee":
                addEmployee();
                break;
            case "Exit":
                break;
            // If nothing is selected or there is an error, show the repsonse
                default:
                console.log("No response provided!");
        }
    })
};

// MySQL function to view all bookstore departments
const viewDepartments = () => {
    // Selects all departsments then returns it as a table printed to the console
    bookstore.promise().query("SELECT * FROM department;")
    .then(([rows, fields]) => {
        console.table(rows)
    })
    .catch(console.log)
    .then(() => employeeTracker())
};

// MySQL function to view all bookstore roles for employees
const viewRoles = () => {
    bookstore.promise().query("SELECT * FROM role")
    .then(([rows, fields]) => {
        console.table(rows)
    })
    .catch(console.log)
    .then(() => employeeTracker())
};

// MySQL function to view all bookstore employees
const viewEmployees = () => {
    bookstore.promise().query("SELECT * FROM employee;")
    .then(([rows, fields]) => {
        console.table(rows)
    })
    .catch(console.log)
    .then(() => employeeTracker())
};

// MySQL function to add a new department to the database
const addDepartment = () => {
    // Uses Inquirer to gather necessary information to add a new department
    inquirer.prompt(
        {
            type: "input",
            message: "What department would you like to add?",
            name: "deptName"
        }
    ).then((answers) => {
        bookstore.promise().query(`INSERT INTO department (name) \n VALUES (?);`, [answers.deptName])
        .then(console.log(`Added new ${answers.deptName} to database.`))
        .then(() => employeeTracker())
    })
};

// MySQL function to add a new role to the database 
const addRole = () => {
    bookstore.promise().query("SELECT * FROM department")
    .then(([rows, fields]) => {
        const department = rows.map((element) => {
            return element.name
        }) 
        // Uses Inquirer to gather necessary information to add a new role
        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the role you'd like to add?",
                name: "roleName"
            },
            {
                type: "list",
                message: "Which department does the new role belong to?",
                name: "roleDept",
                choices: department
            },
            {
                type: "number",
                message: "What is the salary of the new role?",
                name: "roleSalary"
            }
        ]).then((answers) => {
            // Find the deppartment_id
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].name == answers.roleDept) {
                    let id = rows[i].id
                }
            }
            bookstore.promise().query("INSERT INTO role (title, salary, department_id) \n VALUES(?,?,?);", [answers.roleName, answers.roleSalary, id]) 
            .then(console.log(`Added ${answers.roleName} to ${answers.roleDept}`))
            .then(() => employeeTracker());
        })
    })
};

// MySQL function to add a new employee to the database 
const addEmployee = () => {
    bookstore.promise().query("SELECT * FROM role;")
    .then(([rows, fields]) => {
        let roles = rows.map((element) => {
            return element.title
        })
        let rolesIds = rows
        bookstore.promise().query("SELECT * FROM employee")
        .then(([rows, fields]) => {
            let employees = rows.map((element) => {
                return element.first_name + " " + element.last_name
            })
            employees.push("None")
            // Uses Inquirer to gather necessary information to add a new employee
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the employee's first name?",
                    name: "employeeFirstName"
                },
                {
                    type: "input",
                    message: "What is the employee's last name?",
                    name: "employeeLastName"
                },
                {
                    type: "list",
                    message: "What is the new employee's role?",
                    name: "employeeRole",
                    choices: roles
                },
                {
                    type: "list",
                    message: "Who will be the new employee's manager?",
                    name: "employeeManager",
                    choices: employees
                }
            ]).then((answers) => {
                // Locates the role ID
                for (let i = 0; i < rolesIds.length; i++) {
                    if (answers.employeeRole == rolesIds[i].title) {
                        let role = rolesIds[i].id
                    }
                }
                if (answers.employeeManager == "None") {
                    let manager = null
                } else {
                    let firstName = answers.employeeManager.split(" ")
                    for (let i = 0; i < rows.length; i++) {
                        if (firstName[0] == rows[i].first_name) {
                            let manager = rows[i].id
                        }
                    }
                }
                bookstore.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) \n VALUES (?,?,?,?);`, [answers.employeeFirstName, answers.employeeLastName, roles, manager])
                .then(() => console.log(`Added ${answers.employeeFirstName} ${answers.employeeLastName} to the database`))
                .then(() => employeeTracker())
            })
        })
    })
};

// Function call to start the backend of the Employee Tracker app
employeeTracker();
app.listen(PORT, () => { });